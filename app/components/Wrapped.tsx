"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Dumbbell,
  Trophy,
  Calendar,
  Users,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  landscapeImages,
  portraitImages,
  allImages,
  shuffleImages,
  ImageData,
} from "@/app/lib/images";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Counter Component for animations
function Counter({
  value,
  label,
  description,
}: {
  value: number | string;
  label: string;
  description?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState("0");
  const isUncountable = value === "Uncountable";

  useEffect(() => {
    if (typeof value === "number") {
      const animation = animate(count, value, {
        duration: 2.5,
        ease: "easeOut",
      });
      return animation.stop;
    } else if (isUncountable) {
      // Animate to a high number then switch
      const animation = animate(count, 9999, { duration: 3, ease: "circIn" });
      const timer = setTimeout(() => {
        setDisplayValue("Uncountable");
      }, 3000);
      return () => {
        animation.stop();
        clearTimeout(timer);
      };
    }
  }, [value, count, isUncountable]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (typeof value === "number") {
        setDisplayValue(latest.toLocaleString());
      } else if (isUncountable && displayValue !== "Uncountable") {
        setDisplayValue(latest.toLocaleString() + "+");
      }
    });
    return unsubscribe;
  }, [rounded, value, isUncountable, displayValue]);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "font-black tracking-tighter mb-4",
          displayValue === "Uncountable"
            ? "text-5xl sm:text-6xl"
            : "text-7xl sm:text-8xl"
        )}
      >
        {displayValue}
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl sm:text-3xl font-bold uppercase tracking-widest opacity-90"
      >
        {label}
      </motion.div>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-xl opacity-75 max-w-xs mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

type Slide = {
  id: string;
  type:
    | "intro"
    | "stat"
    | "collage"
    | "outro"
    | "counter"
    | "vertical-image"
    | "list";
  title?: string;
  subtitle?: string;
  images?: string[]; // Array of image paths
  image?: string; // Single image for vertical layout
  stat?: {
    icon: React.ElementType;
    value: string;
    label: string;
    description: string;
  };
  counter?: {
    value: number | string;
    label: string;
    description?: string;
  };
  listItems?: { label: string; value: string | number; rank?: number }[];
  color?: string;
  bgIcon?: React.ElementType;
};

const slides: Slide[] = [
  {
    id: "intro",
    type: "intro",
    title: "Swole Yappers",
    subtitle: "2025 Wrapped",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-900",
    bgIcon: Dumbbell,
  },
  {
    id: "workouts",
    type: "counter",
    counter: {
      value: 41,
      label: "Workouts",
      description: "We stayed consistent-ish 😤",
    },
    color: "bg-gradient-to-br from-blue-500 to-blue-900",
    bgIcon: Calendar,
  },
  {
    id: "fun",
    type: "collage",
    title: "Unserious Behavior",
    images: [
      "/images/landscape-4-3/funny1.webp",
      "/images/landscape-4-3/funny2.webp",
      "/images/landscape-4-3/funny3.webp",
    ],
    color: "bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900",
  },
  {
    id: "yap",
    type: "counter",
    counter: {
      value: "Uncountable",
      label: "Amount of Yap",
    },
    color: "bg-gradient-to-br from-pink-500 to-rose-900",
    bgIcon: Users,
  },
  {
    id: "attendees-collage",
    type: "collage",
    title: "20+ Unique Attendees",
    images: [
      "/images/landscape-4-3/group1.webp",
      "/images/landscape-4-3/group2.webp",
      "/images/landscape-4-3/group3.webp",
    ],
    color: "bg-gradient-to-br from-cyan-500 to-blue-900",
  },
  {
    id: "least-attended",
    type: "vertical-image",
    title: "Least Attended Day",
    subtitle: "Legs",
    image: "/images/portrait-3-4/cooked_bens.webp",
    color: "bg-zinc-900", // Fallback color
  },
  {
    id: "creative-exercise",
    type: "vertical-image",
    title: "Most Creative Exercise",
    subtitle: "Shivani",
    image: "/images/portrait-3-4/shivani.webp",
    color: "bg-zinc-900",
  },
  {
    id: "top-attendees",
    type: "list",
    title: "Top Attendees",
    subtitle: "(approx. by photos)",
    listItems: [
      { label: "Swerd", value: 19, rank: 1 },
      { label: "Steph", value: 17, rank: 2 },
      { label: "Zoe", value: 11, rank: 3 },
      { label: "Wern", value: 11, rank: 3 },
      { label: "Shivani", value: 8, rank: 4 },
    ],
    color: "bg-gradient-to-br from-indigo-500 to-blue-900",
    bgIcon: Trophy,
  },
  {
    id: "bottleneck",
    type: "vertical-image",
    title: "Biggest Bottleneck",
    subtitle: "Nabil Overtraining (no workouts Aug-Dec)",
    image: "/images/portrait-3-4/benadryl.webp",
    color: "bg-zinc-900",
  },
  {
    id: "outro",
    type: "outro",
    title: "We'll be back in 2026",
    subtitle: "Stay Swole.",
    color: "bg-zinc-950",
  },
];

export default function Wrapped() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Randomize images on mount for the outro carousel
  const [randomizedImages, setRandomizedImages] = useState<ImageData[]>([]);
  useEffect(() => {
    setRandomizedImages(shuffleImages(allImages));
  }, []);


  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const didSwipe = useRef(false);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    if (currentSlide >= slides.length) return;

    // Different duration based on slide type
    const currentSlideData = slides[currentSlide];
    const isCollage = currentSlideData.type === "collage";
    const isUncountable =
      currentSlideData.type === "counter" &&
      currentSlideData.counter?.value === "Uncountable";

    const duration = isUncountable ? 6000 : isCollage ? 7000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((curr) => curr + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, isPaused]);

  // Carousel logic (Outro)
  useEffect(() => {
    if (
      currentSlide < slides.length ||
      isCarouselPaused ||
      randomizedImages.length === 0
    )
      return;

    const timer = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = prev + 1 >= randomizedImages.length ? 0 : prev + 1;
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused, isCarouselPaused, randomizedImages.length]);

  useEffect(() => {
    if (currentSlide < slides.length || !carouselRef.current) return;

    const container = carouselRef.current;
    const target = container.children[carouselIndex] as HTMLElement;

    if (target) {
      container.scrollTo({
        left: target.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [carouselIndex, currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide((curr) => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((curr) => curr - 1);
    }
  };

  const resetSlideshow = () => {
    setCurrentSlide(0);
    setCarouselIndex(0);
    setRandomizedImages(shuffleImages(allImages));
  };

  const handleCarouselClick = (e: React.MouseEvent) => {
    // Don't handle click if we just did a swipe
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const x = clientX - left;

    if (x < width * 0.3) {
      setCarouselIndex((prev) =>
        prev - 1 < 0 ? randomizedImages.length - 1 : prev - 1
      );
    } else {
      setCarouselIndex((prev) =>
        prev + 1 >= randomizedImages.length ? 0 : prev + 1
      );
    }
  };

  // Slide navigation touch handlers (hold to pause, tap to navigate)
  const handleSlideTouchStart = () => {
    touchStartTime.current = Date.now();
    setIsPaused(true);
  };

  const handleSlideTouchEnd = (navigate: () => void) => {
    setIsPaused(false);

    // Only navigate if it was a quick tap (< 200ms), not a hold
    if (touchStartTime.current !== null) {
      const holdDuration = Date.now() - touchStartTime.current;
      if (holdDuration < 200) {
        navigate();
      }
    }

    touchStartTime.current = null;
  };

  // Carousel touch handlers (for outro screen)
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    setIsCarouselPaused(true);
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    setIsCarouselPaused(false);

    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // This was a swipe, not a tap
      didSwipe.current = true;
      if (diff > 0) {
        // Swiped left -> go to next
        setCarouselIndex((prev) =>
          prev + 1 >= randomizedImages.length ? 0 : prev + 1
        );
      } else {
        // Swiped right -> go to previous
        setCarouselIndex((prev) =>
          prev - 1 < 0 ? randomizedImages.length - 1 : prev - 1
        );
      }
    }

    touchStartX.current = null;
  };

  // Finished State (Summary/Carousel)
  if (currentSlide >= slides.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black text-white flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-md h-full max-h-[900px] flex flex-col bg-gradient-to-b from-emerald-900 via-zinc-900 to-zinc-950 overflow-hidden sm:rounded-xl sm:h-[85vh] sm:shadow-2xl sm:border sm:border-zinc-800">
          <div className="flex-1 flex flex-col relative">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent pt-6 pb-10 text-center pointer-events-none">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-lg">
                Swole Yappers
              </h1>
              <p className="text-lg font-bold uppercase tracking-widest opacity-80 mt-1">
                See you in 2026
              </p>
            </div>

            {/* Carousel */}
            <div className="relative flex-1 overflow-hidden mt-20 mb-24 mx-3">
              <div
                ref={carouselRef}
                className="absolute inset-0 overflow-x-auto snap-x snap-mandatory flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pointer-events-none rounded-xl"
              >
                {randomizedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="min-w-full h-full flex items-center justify-center snap-center relative overflow-hidden rounded-lg"
                  >
                    <div className="relative w-full h-full p-2">
                      <Image
                        src={img.src}
                        alt={`Memory ${idx + 1}`}
                        fill
                        className="object-contain drop-shadow-2xl rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="absolute inset-0 z-10"
                onClick={handleCarouselClick}
                onTouchStart={handleCarouselTouchStart}
                onTouchEnd={handleCarouselTouchEnd}
                onMouseDown={() => setIsCarouselPaused(true)}
                onMouseUp={() => setIsCarouselPaused(false)}
              />
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-none">
              {randomizedImages.slice(0, 8).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    idx === carouselIndex % 8 ? "bg-white w-4" : "bg-white/40"
                  )}
                />
              ))}
              {randomizedImages.length > 8 && (
                <span className="text-white/40 text-xs ml-1">
                  +{randomizedImages.length - 8}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-zinc-950 to-transparent p-6 flex flex-col items-center gap-3 pb-6 pointer-events-auto">
              <button
                onClick={resetSlideshow}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-colors shadow-lg active:scale-95"
              >
                <RotateCcw size={18} />
                Replay 2025
              </button>
              <p className="text-xs font-bold tracking-widest opacity-40 uppercase">
                Swole Yappers • 2025
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-md h-full max-h-[900px] flex flex-col bg-zinc-900 overflow-hidden sm:rounded-xl sm:h-[85vh] sm:shadow-2xl sm:border sm:border-zinc-800">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-2">
          {slides.map((s, idx) => {
            const isCollage = s.type === "collage";
            const isUncountable =
              s.type === "counter" && s.counter?.value === "Uncountable";
            const duration = isUncountable ? 6 : isCollage ? 7 : 5;
            const isComplete = idx < currentSlide;
            const isCurrent = idx === currentSlide;
            return (
              <div
                key={s.id}
                className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  key={`${s.id}-${currentSlide}`}
                  className="h-full bg-white"
                  style={{
                    width: isComplete ? "100%" : "0%",
                    animationName: isCurrent ? "progress" : "none",
                    animationDuration: `${duration}s`,
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Touch Areas */}
        <div
          className="absolute inset-0 z-20 flex select-none touch-manipulation"
          style={{ WebkitTouchCallout: "none" }}
        >
          <div
            className="flex-1 h-full"
            onClick={prevSlide}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={handleSlideTouchStart}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent click from firing
              handleSlideTouchEnd(prevSlide);
            }}
          />
          <div
            className="flex-1 h-full"
            onClick={nextSlide}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={handleSlideTouchStart}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent click from firing
              handleSlideTouchEnd(nextSlide);
            }}
          />
        </div>

        {/* Content - Render all slides, show only current one */}
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <motion.div
              key={s.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
                zIndex: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.4 }}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center text-center overflow-hidden",
                s.color,
                !isActive && "pointer-events-none"
              )}
            >
              {/* Background Image for Vertical Slides */}
              {s.type === "vertical-image" && s.image && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={s.image}
                    alt={s.title || ""}
                    fill
                    className="object-cover"
                    priority={idx <= 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-90" />
                </div>
              )}

              {/* Background Icon for solid slides */}
              {s.bgIcon && (
                <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                  <s.bgIcon
                    className="w-[80vh] h-[80vh] text-white opacity-[0.03] -rotate-12 transform"
                    strokeWidth={1}
                  />
                </div>
              )}

              <div
                className={cn(
                  "relative z-10 w-full h-full flex flex-col justify-center p-8",
                  s.type === "vertical-image" ? "justify-end pb-24" : ""
                )}
              >
                {s.type === "intro" && (
                  <div className="space-y-6">
                    <motion.h1
                      initial={false}
                      animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ delay: isActive ? 0.2 : 0 }}
                      className="text-6xl font-black uppercase tracking-tighter"
                    >
                      {s.title}
                    </motion.h1>
                    <motion.p
                      initial={false}
                      animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ delay: isActive ? 0.4 : 0 }}
                      className="text-2xl font-medium opacity-90"
                    >
                      {s.subtitle}
                    </motion.p>
                  </div>
                )}

                {s.type === "counter" && s.counter && isActive && (
                  <Counter
                    key={`counter-${s.id}-${currentSlide}`}
                    value={s.counter.value}
                    label={s.counter.label}
                    description={s.counter.description}
                  />
                )}

                {s.type === "stat" && s.stat && (
                  <div className="space-y-8">
                    <motion.div
                      initial={false}
                      animate={isActive ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    >
                      <s.stat.icon size={48} className="text-white" />
                    </motion.div>
                    <div>
                      <motion.div
                        initial={false}
                        animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ delay: isActive ? 0.2 : 0 }}
                        className="text-7xl font-bold tracking-tight"
                      >
                        {s.stat.value}
                      </motion.div>
                      <motion.div
                        initial={false}
                        animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ delay: isActive ? 0.3 : 0 }}
                        className="text-2xl font-semibold mt-2 uppercase tracking-widest opacity-80"
                      >
                        {s.stat.label}
                      </motion.div>
                    </div>
                    <motion.p
                      initial={false}
                      animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ delay: isActive ? 0.4 : 0 }}
                      className="text-xl max-w-xs mx-auto leading-relaxed"
                    >
                      {s.stat.description}
                    </motion.p>
                  </div>
                )}

                {s.type === "collage" && s.images && (
                  <div className="w-full h-full flex flex-col pt-8 pb-3 px-2">
                    <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                      {s.images.map((img, imgIdx) => (
                        <motion.div
                          key={img}
                          initial={false}
                          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                          transition={{ delay: isActive ? imgIdx * 0.12 : 0 }}
                          className="relative flex-1 rounded-lg overflow-hidden shadow-xl"
                        >
                          <Image
                            src={img}
                            alt="Collage memory"
                            fill
                            className="object-cover"
                            priority={idx <= 2}
                          />
                        </motion.div>
                      ))}
                    </div>
                    {s.title && (
                      <motion.div
                        initial={false}
                        animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ delay: isActive ? 0.5 : 0 }}
                        className="mt-2 relative z-10"
                      >
                        <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                          {s.title}
                        </h2>
                      </motion.div>
                    )}
                  </div>
                )}

                {s.type === "vertical-image" && (
                  <div className="space-y-2 text-left w-full">
                    <motion.h2
                      initial={false}
                      animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none"
                    >
                      {s.title}
                    </motion.h2>
                    {s.subtitle && (
                      <motion.p
                        initial={false}
                        animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ delay: isActive ? 0.1 : 0 }}
                        className="text-xl sm:text-2xl font-bold opacity-90 text-emerald-300"
                      >
                        {s.subtitle}
                      </motion.p>
                    )}
                  </div>
                )}

                {s.type === "list" && s.listItems && (
                  <div className="w-full h-full flex flex-col pt-12">
                    <div className="mb-6">
                      <motion.h2
                        initial={false}
                        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                        className="text-4xl font-black uppercase tracking-tighter"
                      >
                        {s.title}
                      </motion.h2>
                      {s.subtitle && (
                        <p className="text-sm opacity-60 mt-1">
                          {s.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-3 justify-center max-w-xs mx-auto w-full">
                      {s.listItems.map((item, itemIdx) => (
                        <motion.div
                          key={item.label}
                          initial={false}
                          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: isActive ? itemIdx * 0.1 : 0 }}
                          className="flex items-center justify-between bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-xl w-6 text-center opacity-50">
                              {item.rank ?? itemIdx + 1}
                            </span>
                            <span className="font-bold text-lg">
                              {item.label}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-emerald-400 text-xl">
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {s.type === "outro" && (
                  <div className="space-y-6">
                    <motion.h1
                      initial={false}
                      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      className="text-5xl font-black uppercase leading-tight"
                    >
                      {s.title}
                    </motion.h1>
                    <motion.div
                      initial={false}
                      animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ delay: isActive ? 0.3 : 0 }}
                    >
                      <Trophy
                        size={80}
                        className="mx-auto text-yellow-400 mb-6"
                      />
                      <p className="text-2xl font-bold">{s.subtitle}</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Footer/Brand */}
        <div className="absolute bottom-4 left-0 right-0 z-30 text-center text-xs font-bold tracking-widest opacity-50 uppercase pointer-events-none">
          Swole Yappers • 2025
        </div>
      </div>
    </div>
  );
}
