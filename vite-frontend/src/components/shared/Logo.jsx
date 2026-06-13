import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="text-xl font-bold text-white tracking-tight">
      Span<span className="text-indigo-400">Stay</span>
    </Link>
  );
};

export default Logo;
