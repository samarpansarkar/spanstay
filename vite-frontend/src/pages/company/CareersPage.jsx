import SEO from '@/components/shared/SEO';
import { MapPin, Globe, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const CareersPage = () => {
  const handleApply = () => {
    toast.success("Application process initiated. Our team will review your profile.");
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest overflow-x-hidden">
      <SEO title="Careers" />
      
      <main className="pb-32">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center md:items-end pb-12 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Grand luxury hotel lobby" 
              src="https://images.unsplash.com/photo-1542314831-c6a4d14b4df3?q=80&w=2000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <p className="text-xs text-warm-gold mb-2 tracking-[0.2em] font-bold uppercase">Careers</p>
            <h1 className="font-display text-5xl md:text-7xl text-on-surface mb-6">Join the Elite</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">Shape the future of luxury travel with a team dedicated to the art of the extraordinary.</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto">
          {/* Open Positions */}
          <section className="px-6 md:px-12 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-warm-gold mb-2">Open Positions</h2>
                <p className="text-on-surface-variant font-body">Find your place in our legacy.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Position Card 1 */}
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm p-8 flex flex-col gap-6 hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-2xl text-on-surface mb-2">Elite Curator</h3>
                    <p className="text-on-surface-variant text-sm font-body flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-warm-gold" /> Paris / Remote
                    </p>
                  </div>
                  <span className="bg-warm-gold/10 text-warm-gold px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border border-warm-gold/20">Full-time</span>
                </div>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed flex-1">Curate bespoke experiences for our most discerning clientele across European capitals.</p>
                <button onClick={handleApply} className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-sm hover:brightness-110 transition-all uppercase tracking-widest text-xs">Apply Now</button>
              </div>

              {/* Position Card 2 */}
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm p-8 flex flex-col gap-6 hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-2xl text-on-surface mb-2">Senior Concierge</h3>
                    <p className="text-on-surface-variant text-sm font-body flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-warm-gold" /> New York City
                    </p>
                  </div>
                  <span className="bg-warm-gold/10 text-warm-gold px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border border-warm-gold/20">Full-time</span>
                </div>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed flex-1">Lead the front-line of hospitality at our flagship North American properties.</p>
                <button onClick={handleApply} className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-sm hover:brightness-110 transition-all uppercase tracking-widest text-xs">Apply Now</button>
              </div>
            </div>
          </section>

          {/* Culture Section */}
          <section className="mt-32 px-6 md:px-12">
            <h2 className="font-display text-3xl md:text-4xl text-warm-gold mb-12 text-center">Our Heritage of Excellence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-sm overflow-hidden aspect-square md:aspect-[4/5] border border-glass-border">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Luxury office desk" 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute bottom-0 p-8 w-full bg-gradient-to-t from-surface-container-lowest">
                  <h4 className="font-display text-2xl text-on-surface mb-3">Unwavering Standards</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">We believe that luxury is in the details. Every touchpoint, every interaction, and every moment is crafted to exceed expectations.</p>
                </div>
              </div>
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm p-10 border-l-4 border-l-warm-gold">
                <h4 className="font-display text-3xl text-warm-gold mb-6">A Culture of Innovation</h4>
                <p className="text-on-surface-variant font-body leading-relaxed text-lg">While we honor the traditions of grand hospitality, we embrace the cutting-edge. SpanStay Elite is where legacy meets the future of travel tech.</p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mt-32 px-6 md:px-12">
            <div className="bg-surface-container border border-glass-border rounded-sm p-12 md:p-20 shadow-sm">
              <h2 className="font-display text-3xl md:text-4xl text-center mb-16 text-on-surface">Elite Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
                  <div className="w-16 h-16 rounded-sm bg-warm-gold/10 flex items-center justify-center border border-warm-gold/20 shrink-0">
                    <Globe className="w-8 h-8 text-warm-gold" />
                  </div>
                  <div>
                    <h5 className="font-bold text-warm-gold uppercase tracking-wider text-xs mb-3">Global Travel Perks</h5>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed">Complimentary stays at our global portfolio of five-star estates and private villas.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
                  <div className="w-16 h-16 rounded-sm bg-warm-gold/10 flex items-center justify-center border border-warm-gold/20 shrink-0">
                    <Award className="w-8 h-8 text-warm-gold" />
                  </div>
                  <div>
                    <h5 className="font-bold text-warm-gold uppercase tracking-wider text-xs mb-3">Elite Training</h5>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed">Direct mentorship from the world's leading hospitality experts and concierge masters.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
                  <div className="w-16 h-16 rounded-sm bg-warm-gold/10 flex items-center justify-center border border-warm-gold/20 shrink-0">
                    <TrendingUp className="w-8 h-8 text-warm-gold" />
                  </div>
                  <div>
                    <h5 className="font-bold text-warm-gold uppercase tracking-wider text-xs mb-3">Rapid Growth</h5>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed">Merit-based advancement pathways within our fast-expanding international network.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Call to Action */}
          <section className="mt-32 px-6 md:px-12 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-4xl mb-6 text-on-surface">Ready to start?</h3>
            <p className="text-on-surface-variant text-lg font-body mb-10">Your journey to becoming a curator of the world's finest moments begins here.</p>
            <button onClick={handleApply} className="inline-block px-12 py-4 border border-warm-gold text-warm-gold font-bold uppercase tracking-widest text-sm hover:bg-warm-gold/10 transition-colors rounded-sm">
              Join our Talent Pool
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CareersPage;
