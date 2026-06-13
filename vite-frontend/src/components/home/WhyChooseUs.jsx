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
    title: '24/7 Support',
    description: 'Our customer support team is always here to help you with your journey.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose SpanStay</h2>
          <p className="text-slate-400">
            We provide a seamless experience from booking to check-out, ensuring your stay is perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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
