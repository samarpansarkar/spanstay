import { Menu } from "lucide-react";
import { Fragment } from "react";
import Button from "../../ui/Button/Button";
import Container from "../../ui/Container";
import Logo from "../Logo";
import NavLinks from "../NavLinks/NavLinks";
import { useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";

const Navbar = () => {
  const [open, setOpen]=useState(false);
  return (
    <Fragment>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden md:block">
              <NavLinks />
            </div>
            <div className="hidden md:block">
              <Button size="sm">Book Now</Button>
            </div>
            <button onClick={() => setOpen(true)} className="md:hidden">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={()=>setOpen(false)}/>
    </Fragment>
  );
};

export default Navbar;
