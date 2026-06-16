import SEO from '@/components/shared/SEO';
import { Quote } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-surface-container-lowest overflow-x-hidden">
      <SEO title="About Us" />
      
      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] w-full flex items-end justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Luxury Villa Sunset" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2000&auto=format&fit=crop" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full px-6 md:px-12 pb-20 text-center">
            <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-8 rounded-sm max-w-lg mx-auto shadow-sm">
              <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-4">Defining Heritage &amp; Grandeur</h2>
              <p className="font-body text-on-surface-variant md:text-lg">Since our inception, SpanStay Elite has been the silent custodian of the world's most prestigious residences, offering a bridge between timeless tradition and contemporary luxury.</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* History Section */}
          <section className="py-20">
            <h3 className="font-display text-3xl md:text-4xl text-warm-gold mb-12 text-center">Our Odyssey</h3>
            <div className="max-w-3xl mx-auto relative border-l border-warm-gold/30 ml-4 md:ml-auto space-y-16">
              
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-warm-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"></div>
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-warm-gold mb-2 block">2008</span>
                <h4 className="font-display text-2xl text-on-surface mb-2">The Foundation</h4>
                <p className="text-on-surface-variant font-body">Established in the heart of London, SpanStay began with a portfolio of seven historic estates, dedicated to preserving architectural heritage for the modern traveler.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-warm-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"></div>
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-warm-gold mb-2 block">2015</span>
                <h4 className="font-display text-2xl text-on-surface mb-2">Global Expansion</h4>
                <p className="text-on-surface-variant font-body">Crossing oceans to curate villas in the Maldives and the Amalfi Coast, redefining what it means to experience 'Elite' hospitality on a global scale.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-warm-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"></div>
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-warm-gold mb-2 block">TODAY</span>
                <h4 className="font-display text-2xl text-on-surface mb-2">The Digital Concierge</h4>
                <p className="text-on-surface-variant font-body">Merging high-tech convenience with high-touch service, we continue to set the benchmark for luxury stays across 40 countries.</p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-warm-gold/10 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center">
              <Quote className="w-12 h-12 text-warm-gold mb-6 opacity-80" />
              <h2 className="font-display text-3xl md:text-5xl italic text-on-surface mb-8 max-w-3xl leading-snug">"Our mission is to curate the unreachable."</h2>
              <div className="w-12 h-[1px] bg-warm-gold mx-auto mb-8 opacity-60"></div>
              <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                We exist for the few who value privacy as much as luxury. Our commitment is a relentless pursuit of the extraordinary, ensuring every SpanStay property is more than a residence—it is a legacy in the making.
              </p>
            </div>
          </section>

          {/* Leadership Team */}
          <section className="py-20">
            <h3 className="font-display text-3xl md:text-4xl text-on-surface mb-12 text-center">The Curators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm overflow-hidden p-6 hover:border-warm-gold/30 transition-colors">
                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden mb-6">
                  <img 
                    alt="Julian Vance" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
                <h4 className="font-display text-2xl text-warm-gold mb-1">Julian Vance</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-4">Head of Curation</p>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">A veteran of luxury hospitality with two decades spent scouting the Mediterranean's best-kept secrets.</p>
              </div>

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm overflow-hidden p-6 hover:border-warm-gold/30 transition-colors">
                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden mb-6">
                  <img 
                    alt="Elena Moretti" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
                <h4 className="font-display text-2xl text-warm-gold mb-1">Elena Moretti</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-4">Director of Experience</p>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">Elena ensures that every guest interaction is as seamless and personalized as a bespoke suit.</p>
              </div>

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm overflow-hidden p-6 hover:border-warm-gold/30 transition-colors">
                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden mb-6">
                  <img 
                    alt="Marcus Thorne" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
                <h4 className="font-display text-2xl text-warm-gold mb-1">Marcus Thorne</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-4">Chief Operations Officer</p>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">The strategist behind our global logistical perfection, ensuring every estate meets the Elite standard.</p>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
