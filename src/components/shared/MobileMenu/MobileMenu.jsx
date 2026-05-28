import { AnimatePresence, motion } from "framer-motion";
import NavLinks from "../NavLinks/NavLinks";

const MobileMenu = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
            }}
            className="fixed right-0 top-0 z-50 h-full w-70 bg-white p-8 shadow-2xl"
          >
            <NavLinks mobile onClose={onClose}/>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
