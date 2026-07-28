export function getBentoCellClass(index: number, count: number): string {
  const base =
    "relative overflow-hidden rounded-2xl shadow-lg group min-h-[200px] md:min-h-0";

  if (count === 1) {
    return `${base} md:col-span-4 h-64 md:h-[420px]`;
  }

  if (count === 2) {
    return `${base} md:col-span-2 aspect-[4/5]`;
  }

  if (count === 3) {
    if (index === 0) {
      return `${base} aspect-[4/5] w-full md:col-span-2 md:row-span-2 md:aspect-auto md:h-full md:min-h-0`;
    }
    return `${base} aspect-[4/5] w-full md:col-span-2`;
  }

  if (index === 0) {
    return `${base} md:col-span-2 md:row-span-2 h-64 md:h-full md:min-h-[400px]`;
  }
  if (index === 1 || index === 2) {
    return `${base} md:col-span-1 h-48 md:h-[194px]`;
  }
  return `${base} md:col-span-2 h-48 md:h-[194px]`;
}

export function isBentoFeatured(index: number, count: number): boolean {
  return count === 1 || (count >= 3 && index === 0);
}
