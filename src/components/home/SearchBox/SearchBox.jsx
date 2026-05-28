import { Calendar, MapPin, Search } from "lucide-react";
import Button from "../../ui/Button/Button";
import GuestSelector from "../GuestSelector/GuestSelector";
import SearchField from "../SearchField/SearchField";

const SearchBox = () => {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <SearchField
          icon={<MapPin className="h-4 w-4 text-primary" />}
          label="Destination"
          value="Goa, India"
        />

        <SearchField
          icon={<Calendar className="h-4 w-4 text-primary" />}
          label="Check In"
          value="25 May 2026"
        />

        <SearchField
          icon={<Calendar className="h-4 w-4 text-primary" />}
          label="Check Out"
          value="30 May 2026"
          className="border-r-0"
        />

        <GuestSelector />

        <Button size="lg" className="w-full lg:w-auto">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
