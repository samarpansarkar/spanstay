import { fadeUpVariant, staggerContainer } from "@/animations/variants";
import { motion } from "framer-motion";
import HotelCard from "../HotelCard/HotelCard";

const HotelGrid = ({ hotels }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {hotels.map((hotel) => (
        <motion.div key={hotel._id} variants={fadeUpVariant}>
          <HotelCard hotel={hotel} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HotelGrid;
