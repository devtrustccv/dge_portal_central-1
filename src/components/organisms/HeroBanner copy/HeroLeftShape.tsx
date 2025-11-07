import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageCache = new Set<string>();

interface HeroLeftShapeProps {
  imageUrl: string;
}

export const HeroLeftShape: React.FC<HeroLeftShapeProps> = ({ imageUrl }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageCache.has(imageUrl)) {
      setLoaded(true);
      return;
    }

    setLoaded(false);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imageCache.add(imageUrl);
      setLoaded(true);
    };
  }, [imageUrl]);

  return (
    <div className="relative w-full max-w-[558px] aspect-square">
      <motion.div className="absolute inset-0 rounded-[48px] md:rounded-[68px] 2xl:rounded-[100px] bg-gradient-to-b from-[#60C2A7] to-[#2470B8] p-4 md:p-5 2xl:p-8">
        <div className="w-full h-full rounded-[40px] md:rounded-[60px] 2xl:rounded-[84px] bg-[#F8FAFC]" />
      </motion.div>

      <AnimatePresence mode="wait">
        {loaded && (
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-4 md:inset-5 2xl:inset-[32px] bg-contain bg-bottom bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
