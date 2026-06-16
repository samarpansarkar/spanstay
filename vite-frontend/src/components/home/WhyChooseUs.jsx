import { ShieldCheck, Clock, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Booking',
    description: 'Your payments and personal information are protected by industry-leading security.'
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    description: 'No waiting around. Get your booking confirmed instantly upon payment.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Pay securely using Stripe with multiple payment options available.'
  },
  {
    icon: Headphones,
    title: 'Exclusive Concierge',
    description: 'Our personalized support team is always here to help you with your journey.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 border-t border-glass-border bg-deep-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-on-surface mb-4 font-display">Curated Excellence</h2>
          <p className="text-on-surface-variant font-body text-lg">
            We provide a seamless experience from booking to check-out, ensuring your luxury stay is perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-surface-container-lowest border border-glass-border rounded-md p-8 hover:border-warm-gold/30 transition-colors shadow-sm hover:shadow-warm-gold/5">
                <div className="w-14 h-14 bg-warm-gold/10 border border-warm-gold/20 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-warm-gold" />
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-3 font-display tracking-wide">{feature.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
