const steps = ["Booking", "Payment", "Confirmation"];

const BookingStepper = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
                {index + 1}
              </div>

              <span className="hidden font-medium md:block">{step}</span>
            </div>

            {index !== steps.length - 1 && (
              <div className="mx-4 h-0.5 flex-1 bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStepper;
