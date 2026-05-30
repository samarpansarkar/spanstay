"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Menu } from "lucide-react";
import { Fragment, useState } from "react";

import Button from "../../ui/Button/Button";

import Container from "components/ui/Container/Container";

import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import NavLinks from "../NavLinks/NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden md:flex md:items-center md:gap-10">
              <NavLinks />

              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium text-slate-700 transition-colors hover:text-primary">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button size="sm">Sign Up</Button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center gap-4">
                    <Button size="sm">Book Now</Button>

                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "h-10 w-10",
                        },
                      }}
                    />
                  </div>
                </Show>
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
