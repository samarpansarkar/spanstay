import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import BookingStepper from "@/components/checkout/BookingStepper";
import GuestForm from "@/components/checkout/GuestForm";
import PaymentSummary from "@/components/checkout/PaymentSummary";

const CheckoutPage = () => {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="space-y-10">
          <BookingStepper />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <GuestForm />

            <PaymentSummary />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default CheckoutPage;
