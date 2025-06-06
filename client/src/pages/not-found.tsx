import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MainLayout from "@/components/layout/main-layout";
import { Container, Section } from "@/components/ui/layout-system";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <MainLayout className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Section spacing="xl" className="min-h-[70vh] flex items-center justify-center">
        <Container variant="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="shadow-lg border-destructive/20">
              <CardContent className="p-8 space-y-fluid-md">
                <div className="flex items-center justify-center gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <h1 className="text-fluid-2xl font-bold leading-tight text-foreground">
                    404 Page Not Found
                  </h1>
                </div>

                <p className="text-fluid-base leading-relaxed text-muted-foreground">
                  The page you're looking for doesn't exist or has been moved.
                </p>

                <Button asChild variant="outline" size="lg" className="touch-target">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default NotFound;
