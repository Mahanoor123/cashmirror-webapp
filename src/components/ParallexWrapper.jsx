import { motion } from "framer-motion";

const parallaxVariants = {
  initial: { opacity: 0, y: 50, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.98 },
};

const ParallexWrapper = ({ children }) => {
  return (
    <motion.div
    variants={parallaxVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed top-0 left-0 w-full h-screen bg-white z-20 p-10 overflow-auto"
  >
    {children}
  </motion.div>
  );
}

export default ParallexWrapper
