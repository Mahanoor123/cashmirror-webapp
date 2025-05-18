
import { motion } from "framer-motion";

const parallaxVariants = {
  initial: { opacity: 0, y: 80, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.95 },
};

const ParallexWrapper = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={parallaxVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ParallexWrapper;
