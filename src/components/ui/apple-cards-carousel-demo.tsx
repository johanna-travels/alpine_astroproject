"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const data = [
  {
    category: "Mountains",
    title: "Stillness above the clouds.",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Coastlines",
    title: "Where the light meets the sea.",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Forests",
    title: "Quiet found between the trees.",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Cities",
    title: "Character in every corner.",
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
    content: <DummyContent />,
  },
];

function DummyContent() {
  return (
    <div className="rounded-3xl bg-[#F5F5F7] p-8 md:p-14 dark:bg-neutral-800">
      <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 md:text-2xl dark:text-neutral-400">
        Places chosen for character, stillness, and depth. Scroll through a
        curated set of destinations and tap any card to read more.
      </p>
    </div>
  );
}

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full py-20">
      <h2 className="mx-auto max-w-7xl px-4 text-xl font-bold text-neutral-800 md:text-5xl dark:text-neutral-200">
        Destinations
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
