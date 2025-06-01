import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MainLayout from "@/components/layout/main-layout";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <MainLayout className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="min-h-[70vh] w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 border-sage/20 shadow-lg">
        <CardContent className="pt-6 pb-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-forest dark:text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 mb-6 text-sm text-forest/70 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild variant="outline" className="mt-2">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
    </MainLayout>
  );
};

export default NotFound;
