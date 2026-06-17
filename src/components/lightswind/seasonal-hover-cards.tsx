
import React from 'react';
import { cn } from "../../lib/utils";

export interface SeasonCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  href?: string;
  showText?: boolean;
}

interface SeasonalHoverCardsProps {
  cards: SeasonCardProps[];
  className?: string;
}

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  className,
  href,
  showText = true,
}: SeasonCardProps) => {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-700 ease-out lg:hover:w-2/3 cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt={imageAlt || title}
      />
      {showText && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-0"></div>
          <div className="relative md:absolute md:bottom-20 z-10 space-y-2">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-sm text-gray-300">{subtitle}</p>
          </div>
          <div className="mt-4 transform translate-y-6 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            <p className="text-lg text-white">{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export function SeasonalHoverCards({
  cards,
  className,
}: SeasonalHoverCardsProps) {
  return (
    <div className={cn("flex flex-wrap md:flex-nowrap gap-4 w-full px-4", className)}>
      {cards.map((card, index) => (
        <SeasonCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          href={card.href}
        />
      ))}
    </div>
  );
}
