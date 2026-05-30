import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 StayFinder. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-600">
            <button>Privacy</button>

            <button>Terms</button>

            <button>Contact</button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
