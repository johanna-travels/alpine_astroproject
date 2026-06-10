"use client";
import React, { useEffect, useRef, useState, createContext } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import CarouselDots from "./CarouselDots";

type BlurImageProps = {
  height?: number | string;
  width?: number | string;
  src?: string;
  className?: string;
  alt?: string;
  fill?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>;

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  mediaType?: "video" | "image"; // Added to support videos
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? window.innerWidth - 32 : 384; // mobile: full-width card (100vw - 2rem gutters), desktop: md:w-96
      const gap = 12;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        {/* Padding wrapper: spacing lives here, scroller stays pure logic */}
        <div className="pt-carousel-top-sm pb-dot-zone md:pt-carousel-top-md lg:pt-carousel-top-lg">
        <div
          id="apple-cards-carousel"
          className="flex w-full snap-x snap-mandatory overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] md:snap-none"
          ref={carouselRef}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex w-fit flex-row justify-start gap-3",
              "px-[max(1rem,calc((100vw-80rem)/2))]",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="slide snap-center rounded-3xl md:snap-align-none md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        </div>
        {/* Dots wrapper: pagination on all screens */}
        <CarouselDots
          carouselId="apple-cards-carousel"
          count={items.length}
          gap={12}
        />
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
    <div className="relative z-10 flex h-card-mobile w-card-mobile flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-card-desktop md:w-card-desktop dark:bg-neutral-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 p-8">
        <p className="text-left font-sans text-sm font-medium text-white md:text-base">
          {card.category}
        </p>
        <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </p>
      </div>

      {/* Conditional Video / Image logic */}
      {card.mediaType === "video" ? (
        <LazyVideo src={card.src} />
      ) : (
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
      )}
    </div>
  );
};

const LazyVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 z-10 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background view"}
      {...rest}
    />
  );
};