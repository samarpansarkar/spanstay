import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";

const GuestForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-3xl font-bold">Guest Information</h2>

        <p className="mt-2 text-slate-500">Fill in your booking details</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
        />

        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
        />

        <input
          {...register("email")}
          placeholder="Email Address"
          className="rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
        />

        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
        />
      </div>

      <textarea
        {...register("specialRequest")}
        placeholder="Special Requests"
        rows={5}
        className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
      />

      <Button type="submit" size="lg">
        Continue Booking
      </Button>
    </form>
  );
};

export default GuestForm;
