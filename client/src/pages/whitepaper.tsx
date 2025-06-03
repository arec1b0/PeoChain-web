import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  Users,
  Calendar,
  ChevronRight,
  BookOpen,
  Clock,
  ExternalLink,
  Zap,
  Shield,
  DollarSign,
  Gauge,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { ErrorBoundaryEnhanced } from "@/components/ui/error-boundary-enhanced";
import { EXTERNAL_URLS } from "@shared/config";
import { CARD_STYLES, BUTTON_STYLES, LAYOUT_STYLES } from "@shared/styles";

interface WhitepaperSection {
  title: string;
  summary: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface WhitepaperStats {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface WhitepaperData {
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  sections: WhitepaperSection[];
  keyFeatures: string[];
}

const Whitepaper: React.FC = () => {
  const whitepaperData = {
    title:
      "PeoChain - A Decentralized Financial Ecosystem for Global Inclusion",
    authors: ["Dan Otieno", "Daniil Krizhanovskyi"],
    date: "March 2025",
    version: "v2.1",
    pages: "64",
    abstract:
      "PeoChain is an innovative blockchain platform designed to deliver scalable, secure, and accessible decentralized financial services, with a mission to empower underbanked populations globally. Leveraging its novel Proof of Synergy (PoSyg) consensus mechanism and Dynamic Contribution Scoring (DCS) system, PeoChain achieves exceptional scalability, supporting up to 100,000 transactions per second with 1-second finality, while ensuring robust security and economic stability.",
    sections: [
      {
        title: "Introduction",
        summary:
          "Overview of global financial inclusion challenges and PeoChain's innovative solution to bridge the gap for underbanked populations worldwide.",
        icon: <BookOpen className="h-5 w-5" />,
        highlight: false,
      },
      {
        title: "Proof of Synergy (PoSyg): A Unique Consensus Model",
        summary:
          "Revolutionary consensus mechanism that combines validator performance, network contribution, and stake weight to achieve optimal scalability and security.",
        icon: <Zap className="h-5 w-5" />,
        highlight: true,
      },
      {
        title: "Technical Architecture",
        summary:
          "Comprehensive system design including subnet architecture, cross-chain interoperability, and zero-knowledge proof implementations.",
        icon: <Shield className="h-5 w-5" />,
        highlight: false,
      },
      {
        title: "Economic Model (Tokenomics)",
        summary:
          "Token distribution, validator rewards, transaction fee structure, and economic incentives driving network sustainability.",
        icon: <DollarSign className="h-5 w-5" />,
        highlight: true,
      },
      {
        title: "Financial Model and Projections",
        summary:
          "Revenue streams, market analysis, adoption forecasts, and long-term financial sustainability projections for the PeoChain ecosystem.",
        icon: <ArrowRight className="h-5 w-5" />,
        highlight: false,
      },
      {
        title: "Roadmap",
        summary:
          "Development phases from testnet launch through mainnet deployment, including key milestones and timeline for global expansion.",
        icon: <Calendar className="h-5 w-5" />,
        highlight: false,
      },
      {
        title: "Conclusion",
        summary:
          "Summary of PeoChain's potential impact on global financial inclusion and the future of decentralized finance.",
        icon: <CheckCircle className="h-5 w-5" />,
        highlight: false,
      },
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

  const whitepaperStats: WhitepaperStats[] = [
    {
      label: "Document Version",
      value: whitepaperData.version,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Total Pages",
      value: whitepaperData.pages,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: "Publication Date",
      value: whitepaperData.date,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: "Read Time",
      value: "15 min",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <ErrorBoundaryEnhanced>
      <MainLayout className="bg-gradient-to-br from-mint via-mint/50 to-sage/10 min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-sage/30 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-medium-forest/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sage/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <Badge className="mb-6 bg-sage/20 text-forest border-sage/30 px-4 py-2 text-sm font-raleway">
                Technical Whitepaper
              </Badge>
              <h1 className="text-5xl md:text-6xl font-raleway font-bold text-forest mb-8 leading-tight">
                PeoChain Technical
                <span className="block bg-gradient-to-r from-sage to-medium-forest bg-clip-text text-transparent">
                  Whitepaper
                </span>
              </h1>
              <p className="text-2xl font-hammersmith text-forest/70 max-w-4xl mx-auto leading-relaxed">
                A Decentralized Financial Ecosystem for Global Inclusion
              </p>
            </motion.div>

            {/* Document Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {whitepaperStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-sage/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 bg-sage/20 rounded-lg flex items-center justify-center text-sage">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-lg font-raleway font-bold text-forest">{stat.value}</p>
                    <p className="text-xs font-hammersmith text-forest/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Whitepaper Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-sage/10 to-medium-forest/10 text-center pb-8 pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-sage to-medium-forest rounded-3xl flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-raleway text-forest mb-4 leading-tight">
                    {whitepaperData.title}
                  </CardTitle>
                  <div className="flex justify-center items-center space-x-6 text-sm text-forest/70 font-hammersmith">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{whitepaperData.date}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Version {whitepaperData.version}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="text-center mb-10">
                    <h3 className="text-xl font-raleway font-semibold text-forest mb-4">Abstract</h3>
                    <p className="text-forest/80 font-hammersmith leading-relaxed max-w-4xl mx-auto text-lg">
                      {whitepaperData.abstract}
                    </p>
                  </div>

                  <div className="flex justify-center items-center space-x-4 mb-12">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-sage to-medium-forest hover:from-medium-forest hover:to-forest text-white font-raleway font-medium px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = EXTERNAL_URLS.WHITEPAPER_PDF;
                        link.download = "PEOCHAIN_White_Paper.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-sage/50 text-sage hover:bg-sage/10 font-raleway font-medium px-8 py-4 transition-all duration-300"
                      onClick={() => window.open(EXTERNAL_URLS.WHITEPAPER_PDF, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Online
                    </Button>
                  </div>

                  {/* Authors */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-raleway font-semibold text-forest mb-6 text-center">
                      Research Authors
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {whitepaperData.authors.map((author, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="text-center p-6 bg-gradient-to-br from-sage/5 to-sage/10 rounded-2xl border border-sage/20 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-center mb-3">
                            <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-sage" />
                            </div>
                          </div>
                          <p className="font-raleway font-semibold text-forest text-lg">{author}</p>
                          <p className="font-hammersmith text-forest/60 text-sm mt-1">Lead Researcher</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-sage/5 to-medium-forest/5 text-center pb-6">
                  <CardTitle className="text-3xl font-raleway text-forest">
                    Table of Contents
                  </CardTitle>
                  <p className="text-forest/60 font-hammersmith mt-2">Explore the comprehensive research sections</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {whitepaperData.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                          section.highlight 
                            ? 'bg-gradient-to-r from-sage/10 to-medium-forest/10 border-sage/30 hover:border-sage/50' 
                            : 'bg-sage/5 border-sage/20 hover:bg-sage/10 hover:border-sage/30'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            section.highlight 
                              ? 'bg-sage/30 text-sage group-hover:bg-sage group-hover:text-white' 
                              : 'bg-sage/20 text-sage group-hover:bg-sage/30'
                          }`}>
                            {section.icon || (
                              <span className="font-raleway font-bold text-sm">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-raleway font-bold text-forest text-lg mb-2 group-hover:text-sage transition-colors duration-300">
                                {section.title}
                              </h4>
                              {section.highlight && (
                                <Badge className="bg-sage/20 text-sage border-sage/30 ml-2 flex-shrink-0">
                                  Key Innovation
                                </Badge>
                              )}
                            </div>
                            <p className="font-hammersmith text-forest/70 leading-relaxed">
                              {section.summary}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-sage/60 group-hover:text-sage group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-raleway text-forest mb-2">
                    Key Technical Innovations
                  </CardTitle>
                  <p className="text-forest/60 font-hammersmith">Revolutionary features powering the PeoChain ecosystem</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {whitepaperData.keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-br from-sage/5 to-sage/10 rounded-2xl border border-sage/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-sage to-medium-forest rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-hammersmith text-forest/80 leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Research Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-16"
            >
              <Card className="bg-gradient-to-br from-sage via-medium-forest to-forest text-white shadow-2xl overflow-hidden">
                <CardContent className="p-10">
                  <h2 className="text-4xl font-raleway font-bold mb-8 text-center">
                    Research Contributions
                  </h2>
                  <p className="text-center text-white/80 font-hammersmith mb-10 text-lg max-w-3xl mx-auto">
                    Pioneering blockchain innovations with measurable impact on global financial inclusion
                  </p>
                  <div className="grid md:grid-cols-3 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-raleway font-bold text-xl mb-3">
                        Proof of Synergy
                      </h3>
                      <p className="font-hammersmith text-white/90 leading-relaxed">
                        Novel consensus mechanism combining PoS efficiency with
                        multi-dimensional scoring for optimal network performance
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-raleway font-bold text-xl mb-3">
                        Financial Inclusion
                      </h3>
                      <p className="font-hammersmith text-white/90 leading-relaxed">
                        Seamless mobile integration with M-Pesa and GCash,
                        empowering underbanked populations globally
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-center group"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <Gauge className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-raleway font-bold text-xl mb-3">
                        Ultra Scalability
                      </h3>
                      <p className="font-hammersmith text-white/90 leading-relaxed">
                        100,000+ TPS with 1-second finality and ultra-low fees,
                        solving the blockchain trilemma
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </ErrorBoundaryEnhanced>
  );
};

export default Whitepaper;
