import { Fragment, useState } from 'react';

import useAuth from '@/hooks/useAuth';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container/Container';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import NavLinks from './Navlinks';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated } = useAuth();

  return (
    <Fragment>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden md:flex md:items-center md:gap-10">
              <NavLinks />

              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    <p>{user.name}</p>
                    <Link to="/logout">Logout</Link>
                  </>
                ) : (
                  <>
                    <Link to="/signin">Signin</Link>
                  </>
                )}
              </div>
            </div>

            <button onClick={() => setOpen(true)} className="md:hidden">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default Navbar;
