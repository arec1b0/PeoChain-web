import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Users, Calendar, Eye } from 'lucide-react';

export default function Whitepaper() {
  const { data: whitepaperData, isLoading } = useQuery({
    queryKey: ['/api/whitepaper'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mint">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage mx-auto mb-4"></div>
            <p className="text-forest font-raleway">Loading whitepaper details...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl md:text-6xl font-raleway font-bold text-forest mb-6">
              Technical Whitepaper
            </h1>
            <p className="text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
              Deep dive into PeoChain's innovative approach to solving the blockchain trilemma
            </p>
          </motion.div>

          {/* Main Whitepaper Card */}
          {whitepaperData && (
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
                  <CardTitle className="text-3xl font-raleway text-forest mb-2">
                    {whitepaperData.title}
                  </CardTitle>
                  <div className="flex justify-center items-center space-x-4 text-sm text-forest/70 font-hammersmith">
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="border-sage text-sage">
                        v{whitepaperData.version}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{whitepaperData.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{whitepaperData.downloads.toLocaleString()} downloads</span>
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
                      Download PDF ({whitepaperData.size})
                    </Button>
                  </div>

                  {/* Authors */}
                  <div className="mb-8">
                    <h3 className="text-xl font-raleway font-semibold text-forest mb-4 text-center">
                      Authors
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {whitepaperData.authors.map((author: string, index: number) => (
                        <div key={index} className="text-center p-4 bg-sage/10 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-5 w-5 text-sage" />
                          </div>
                          <p className="font-hammersmith text-forest/80 text-sm">{author}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div className="mb-8">
                    <h3 className="text-xl font-raleway font-semibold text-forest mb-4 text-center">
                      Table of Contents
                    </h3>
                    <div className="space-y-3">
                      {whitepaperData.sections.map((section: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-sage/5 rounded-lg hover:bg-sage/10 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                              <span className="text-sage font-raleway font-semibold text-sm">{index + 1}</span>
                            </div>
                            <span className="font-hammersmith text-forest">{section}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-sage/20">
                    <div className="text-center">
                      <div className="text-2xl font-raleway font-bold text-sage mb-1">
                        {whitepaperData.citations}
                      </div>
                      <div className="font-hammersmith text-forest/70 text-sm">Academic Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-raleway font-bold text-sage mb-1">
                        {whitepaperData.downloads.toLocaleString()}
                      </div>
                      <div className="font-hammersmith text-forest/70 text-sm">Total Downloads</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-sage to-medium-forest text-white shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-raleway font-bold mb-6 text-center">
                  Key Research Contributions
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">Novel Consensus</h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      Proof of Synergy mechanism solving the trilemma
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">Democratic Access</h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      Low barriers for global validator participation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Download className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-raleway font-semibold mb-2">Performance</h3>
                    <p className="font-hammersmith text-sm opacity-90">
                      100,000+ TPS with 1-second finality
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