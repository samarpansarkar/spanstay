import Button from "@/components/ui/Button";

const PaymentSummary = () => {
  return (
    <div className="sticky top-28 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div>
        <h2 className="text-2xl font-bold">Payment Summary</h2>
      </div>

      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex justify-between">
          <span className="text-slate-600">5 Nights</span>

          <span>₹21,000</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Taxes & Fees</span>

          <span>₹2,500</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">Discount</span>

          <span className="text-green-600">-₹1,500</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xl font-bold">
        <span>Total</span>

        <span>₹22,000</span>
      </div>

      <Button size="lg" className="w-full">
        Proceed To Payment
      </Button>
    </div>
  );
};

export default PaymentSummary;
