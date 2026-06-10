"use client";
import React from "react";
import { Carousel, Card } from "@/components/carousel/apple-cards-carousel";

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
    <div className="card-container h-full w-full py-20">
      {/* Main Section Header */}
      <h2 className="text-[clamp(44px,9vw,75px)] font-normal leading-[0.9] text-black m-0 tracking-tight px-[max(1rem,calc((100vw-80rem)/2))]">
        Destinations
      </h2>
      <Carousel items={cards} />
    </div>
  );
}