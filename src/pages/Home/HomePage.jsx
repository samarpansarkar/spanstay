import Button from "@/components/ui/Button/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading/Heading";

const HomePage = () => {
  return (
    <section>
      <Container>
        <div className="space-y-8 text-center">
          <Heading
            center
            title="Find Your Perfect Stay"
            subtitle="Discover premium hotels and unforgettable travel experiences around the world."
          />
          <Button size="lg">Explore Hotels</Button>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
