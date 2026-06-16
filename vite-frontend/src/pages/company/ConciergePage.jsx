import SEO from '@/components/shared/SEO';
import { Plane, Utensils, Car, Map, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const ConciergePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Request Initialized. A curator will contact you shortly.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest overflow-x-hidden">
      <SEO title="Concierge Services" />

      <main className="pb-32">
        <section className="relative min-h-[50vh] flex items-end justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Luxury Private Jet"
              fetchpriority="high"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center px-6 md:px-12 pb-16">
            <span className="font-label-caps text-warm-gold mb-4 block tracking-widest uppercase font-bold text-sm">Concierge Services</span>
            <h2 className="font-display text-5xl md:text-6xl text-on-surface mb-6">Your Private Curator</h2>
            <div className="w-16 h-px bg-warm-gold mx-auto opacity-60"></div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <section className="py-20">
            <div className="text-center mb-16">
              <h3 className="font-display text-3xl md:text-4xl text-on-surface mb-4">Pillars of Curation</h3>
              <p className="text-on-surface-variant font-body text-lg max-w-2xl mx-auto opacity-80">Experience the world without boundaries, curated by masters of the craft.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-8 rounded-sm group hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <Plane className="w-8 h-8 text-warm-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-warm-gold/30 font-bold text-xs tracking-tighter">01</span>
                </div>
                <h4 className="font-display text-2xl text-on-surface mb-3">Private Aviation</h4>
                <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed">Seamless global transit via our network of elite charter partners and priority routing.</p>
              </div>

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-8 rounded-sm group hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <Utensils className="w-8 h-8 text-warm-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-warm-gold/30 font-bold text-xs tracking-tighter">02</span>
                </div>
                <h4 className="font-display text-2xl text-on-surface mb-3">Michelin Access</h4>
                <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed">Priority access to culinary destinations, sold-out venues, and exclusive chef's table experiences.</p>
              </div>

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-8 rounded-sm group hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <Car className="w-8 h-8 text-warm-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-warm-gold/30 font-bold text-xs tracking-tighter">03</span>
                </div>
                <h4 className="font-display text-2xl text-on-surface mb-3">Luxury Chauffeur</h4>
                <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed">Discreet professional transport in a fleet of premium, high-security vehicles.</p>
              </div>

              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-8 rounded-sm group hover:border-warm-gold/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <Map className="w-8 h-8 text-warm-gold opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-warm-gold/30 font-bold text-xs tracking-tighter">04</span>
                </div>
                <h4 className="font-display text-2xl text-on-surface mb-3">Bespoke Itineraries</h4>
                <p className="text-on-surface-variant font-body text-sm opacity-80 leading-relaxed">Hand-crafted journeys designed entirely around your personal legacy and interests.</p>
              </div>

            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16">
            <section className="lg:col-span-2 bg-surface-container/20 border border-glass-border rounded-sm py-16 px-8 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-warm-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="w-32 h-32 rounded-full border-2 border-warm-gold p-1 mb-8">
                <img
                  alt="Julian Vance"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=60&w=400&auto=format&fit=crop"
                />
              </div>
              <h5 className="font-display text-3xl text-on-surface mb-2">Julian Vance</h5>
              <p className="text-xs text-warm-gold uppercase tracking-[0.2em] font-bold mb-8">Head of Curation</p>
              <blockquote className="font-display text-2xl italic text-on-surface-variant leading-snug">
                "Excellence is not an act, but a habit we refine daily for our guests."
              </blockquote>
            </section>

            <section className="lg:col-span-3 bg-surface-container rounded-sm border border-glass-border p-8 md:p-12 shadow-sm">
              <div className="mb-10">
                <h3 className="font-display text-3xl text-warm-gold mb-3">Request Curation</h3>
                <p className="text-on-surface-variant font-body text-lg opacity-80">Submit your requirements and a curator will contact you within 15 minutes.</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Request Category</label>
                  <div className="relative">
                    <select className="w-full bg-deep-charcoal border border-glass-border text-on-surface py-4 pl-4 pr-12 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-colors appearance-none rounded-sm font-body">
                      <option>Private Aviation</option>
                      <option>Dining & Nightlife</option>
                      <option>Ground Transportation</option>
                      <option>Security Services</option>
                      <option>Exclusive Events</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-warm-gold w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Priority Level</label>
                  <div className="flex flex-col sm:flex-row gap-4 pt-1">
                    <label className="flex-1">
                      <input className="hidden peer" name="priority" type="radio" defaultChecked />
                      <div className="text-center py-4 border border-glass-border peer-checked:border-warm-gold peer-checked:text-warm-gold peer-checked:bg-warm-gold/5 rounded-sm transition-all cursor-pointer bg-deep-charcoal font-body font-medium">
                        Standard
                      </div>
                    </label>
                    <label className="flex-1">
                      <input className="hidden peer" name="priority" type="radio" />
                      <div className="text-center py-4 border border-glass-border peer-checked:border-red-400 peer-checked:text-red-400 peer-checked:bg-red-400/5 rounded-sm transition-all cursor-pointer bg-deep-charcoal font-body font-medium">
                        Urgent
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Description of Requirement</label>
                  <textarea
                    required
                    className="w-full bg-deep-charcoal border border-glass-border text-on-surface p-4 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-colors rounded-sm placeholder:opacity-30 font-body"
                    placeholder="Detail your specific requests or preferences..."
                    rows="5"
                  ></textarea>
                </div>

                <button
                  className="w-full bg-primary text-on-primary py-4 px-8 font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all rounded-sm shadow-sm"
                  type="submit"
                >
                  Initialize Request
                </button>
              </form>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ConciergePage;
