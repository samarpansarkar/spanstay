"use client";

import Button from "@/components/ui/Button/Button";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "../DatePicker/DatePicker";
import GuestDropdown from "../GuestDropdown/GuestDropdown";
import SearchField from "../SearchField/SearchField";

const SearchBox = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/hotels");
  };
  return (
    <div className="rounded-3xl bg-white p-4 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <SearchField
          icon={<MapPin className="h-4 w-4 text-primary" />}
          label="Destination"
          value="Goa, India"
        />

        <DatePicker label="Check In" />

        <DatePicker label="Check Out" />

        <GuestDropdown />

        <Button size="lg" className="w-full lg:w-auto" onClick={handleSearch}>
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
