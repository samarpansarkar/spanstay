import { containerVariants } from '@/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import NavLinks from './Navlinks';

const MobileMenu = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
            }}
            className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white p-8 shadow-2xl"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLinks mobile onClose={onClose} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
