import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function Whitepaper() {
  const whitepaperData = {
    title:
      "PeoChain - A Decentralized Financial Ecosystem for Global Inclusion",
    authors: ["Dan Otieno", "Daniil Krizhanovskyi"],
    date: "March 2025",
    abstract:
      "PeoChain is an innovative blockchain platform designed to deliver scalable, secure, and accessible decentralized financial services, with a mission to empower underbanked populations globally. Leveraging its novel Proof of Synergy (PoSyg) consensus mechanism and Dynamic Contribution Scoring (DCS) system, PeoChain achieves exceptional scalability, supporting up to 100,000 transactions per second with 1-second finality, while ensuring robust security and economic stability.",
    sections: [
      "Introduction",
      "Proof of Synergy (PoSyg): A Unique Consensus Model",
      "Technical Architecture",
      "Economic Model (Tokenomics)",
      "Financial Model and Projections",
      "Roadmap",
      "Conclusion",
    ],
    keyFeatures: [
      "Ultra-low transaction fees (as low as CHF 0.40)",
      "100,000+ TPS with 1-second finality",
      "Novel Proof of Synergy consensus mechanism",
      "Dynamic Contribution Scoring system",
      "Mobile integration with M-Pesa and GCash",
      "Localized stablecoins for price stability",
    ],
  };

  return (
    <div className="min-h-screen bg-mint">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-raleway font-bold text-forest mb-6">
              PeoChain Technical Whitepaper
            </h1>
            <p className="text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
              A Decentralized Financial Ecosystem for Global Inclusion
            </p>
          </motion.div>

          {/* Main Whitepaper Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sage to-medium-forest rounded-2xl flex items-center justify-center">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-raleway text-forest mb-2">
                  {whitepaperData.title}
                </CardTitle>
                <div className="flex justify-center items-center space-x-4 text-sm text-forest/70 font-hammersmith">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{whitepaperData.date}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-8">
                  <p className="text-forest/80 font-hammersmith leading-relaxed max-w-2xl mx-auto">
                    {whitepaperData.abstract}
                  </p>
                </div>

                <div className="flex justify-center items-center space-x-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-sage hover:bg-medium-forest text-white font-raleway font-medium px-8 py-4"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                </div>

                {/* Authors */}
                <div className="mb-8">
                  <h3 className="text-xl font-raleway font-semibold text-forest mb-4 text-center">
                    Authors
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {whitepaperData.authors.map(
                      (author: string, index: number) => (
                        <div
                          key={index}
                          className="text-center p-4 bg-sage/10 rounded-lg"
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-5 w-5 text-sage" />
                          </div>
                          <p className="font-hammersmith text-forest/80 text-sm">
                            {author}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="mb-8">
                  <h3 className="text-xl font-raleway font-semibold text-forest mb-4 text-center">
                    Table of Contents
                  </h3>
                  <div className="space-y-3">
                    {whitepaperData.sections.map(
                      (section: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-sage/5 rounded-lg hover:bg-sage/10 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                              <span className="text-sage font-raleway font-semibold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <span className="font-hammersmith text-forest">
                              {section}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-sage" />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-raleway text-forest text-center">
                  Key Innovations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {whitepaperData.keyFeatures.map(
                    (feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-sage/5 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-hammersmith text-forest/80">
                          {feature}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Research Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-sage to-medium-forest text-white shadow-lg">
              <CardContent className="p-8 text-[#33523e]">
                <h2 className="text-2xl font-raleway font-bold mb-6 text-center">
                  Research Contributions
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">
                      Proof of Synergy
                    </h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      Novel consensus mechanism combining PoS efficiency with
                      multi-dimensional scoring
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">
                      Financial Inclusion
                    </h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      Mobile integration with M-Pesa and GCash for underbanked
                      populations
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Download className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">
                      Scalability
                    </h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      100,000+ TPS with 1-second finality and ultra-low fees
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
