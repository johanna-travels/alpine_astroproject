"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const baseUrl = import.meta.env.BASE_URL;

const data = [
  {
    category: "GREECE",
    title: "",
    src: `${baseUrl}Video/Home%20-Greece.MP4`, 
    mediaType: "video",
    content: <DummyContent />,
  },
  {
    category: "BELGIUM", // Will automatically become uppercase via code
    title: "",
    src: `${baseUrl}Video/Home-Bruges.MP4`, 
    mediaType: "video",
    content: <DummyContent />,
  },
  {
    category: "INDONESIA", // Will automatically become uppercase via code
    title: "",
    src: `${baseUrl}Video/Home-Indonesia.MP4`, 
    mediaType: "video",
    content: <DummyContent />,
  },  

   {
    category: "JAPAN", // Will automatically become uppercase via code
    title: "",
    src: `${baseUrl}Video/Home%20Japan.mp4`, 
    mediaType: "video",
    content: <DummyContent />,
  },  
] as const; 

function DummyContent() {
  return (
    <div className="rounded-3xl p-8 font-['Inter',_sans-serif] md:p-14 dark:bg-neutral-800" style={{ backgroundColor: 'var(--color-bg)' }}>
      <p className="mx-auto max-w-3xl text-base text-neutral-600 md:text-2xl dark:text-neutral-400">
        Places chosen for character, stillness, and depth. Scroll through a
        curated set of destinations and tap any card to read more.
      </p>
    </div>
  );
}

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={`${card.src}-${index}`} card={card} index={index} />
  ));

  return (
    <div 
      className="h-full w-full py-20 font-['Didot',_serif] 
        /* 1. HIGHER LETTER: Targets all paragraphs inside the cards to make them uppercase */
        [&_p]:uppercase 
        
        /* 2. PX FONT SIZING: Forces category labels to exactly 20px */
        [&_p]:text-[20px] 
        
        /* 3. PX LETTER SPACING: Adds a clean 2px tracking to the uppercase layout */
        [&_p]:tracking-[2px]"
    >
      {/* Main Section Header */}
      <h2 className="mx-auto max-w-7xl px-4 text-xl font-bold text-neutral-800 md:text-5xl dark:text-neutral-200">
        Destinations
      </h2>
      <Carousel items={cards} />
    </div>
  );
}