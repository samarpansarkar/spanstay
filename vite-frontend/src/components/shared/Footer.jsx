import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Logo />
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Your trusted partner for booking premium stays across India. Experience comfort and luxury wherever you go.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/hotels" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Browse Hotels</Link></li>
              <li><Link to="/bookings" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SpanStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
