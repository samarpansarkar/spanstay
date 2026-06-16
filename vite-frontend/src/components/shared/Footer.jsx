import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-navy border-t border-glass-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-on-surface tracking-tight font-display">
              Span<span className="text-warm-gold">Stay</span>
            </Link>
            <p className="mt-5 text-on-surface-variant text-sm leading-relaxed font-body">
              Your trusted partner for booking premium stays across India. Experience curated comfort and luxury wherever you go.
            </p>
          </div>

          <div>
            <h4 className="text-on-surface font-display text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Home</Link></li>
              <li><Link to="/hotels" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Browse Properties</Link></li>
              <li><Link to="/bookings" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-display text-lg mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">About Us</Link></li>
              <li><Link to="/careers" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Careers</Link></li>
              <li><Link to="/concierge" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-display text-lg mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Privacy Policy</Link></li>
              <li><Link to="#" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Terms of Service</Link></li>
              <li><Link to="#" className="text-on-surface-variant hover:text-warm-gold transition-colors text-sm font-body">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-on-surface-variant text-sm font-body uppercase tracking-wider text-xs">
            © {new Date().getFullYear()} SpanStay Elite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
