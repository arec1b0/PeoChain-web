import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { z } from "zod";
import { validatePasswordStrength } from "../config/security";

export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
}

export function validateWithZod(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        });
      }
      next(error);
    }
  };
}

// Enhanced password validation middleware
export function validatePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
      timestamp: new Date().toISOString(),
    });
  }

  const validation = validatePasswordStrength(password);

  if (!validation.isValid) {
    return res.status(400).json({
      error: "Password does not meet security requirements",
      details: validation.errors,
      timestamp: new Date().toISOString(),
    });
  }

  next();
}

// Common validation rules with enhanced security
export const userValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .customSanitizer((value) => value.toLowerCase().trim()),
  validatePassword,
];

export const loginValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
