"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ConditionalFieldProps {
  visible: boolean;
  children: React.ReactNode;
}

export default function ConditionalField({ visible, children }: ConditionalFieldProps) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
