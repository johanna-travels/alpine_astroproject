import type { ImageMetadata } from 'astro';
import articleBali from '@/assets/articles/cards/bali.webp';
import articleBaliItinerary from '@/assets/articles/bali/bali-itinerary-card.webp';
import articleBaliBelly from '@/assets/articles/bali/bali-belly-card-square.webp';
import articleBaliTips from '@/assets/articles/bali/bali-travel-tips-aricle.webp';
import articleBaliWhereToStay from '@/assets/articles/bali/bali-the-udaya-resort.webp';
import articleMundukModingReviewCard from '@/assets/articles/bali/munduk-moding-plantation-review-card.webp';
import articleMundukModingReviewHero from '@/assets/articles/bali/munduk-moding-plantation-infinity-pool-sunset.webp';
import articleBruges from '@/assets/articles/cards/bruges.webp';
import articleBrugesComingSoon from '@/assets/articles/bruges/shared574.webp';
import articleGreece from '@/assets/articles/cards/greece.webp';
import articleHongKong from '@/assets/articles/hong-kong/hong-kong.webp';
import articleKyoto from '@/assets/articles/kyoto/kyoto-five-story-pagoda.webp';
import articleNara from '@/assets/articles/kyoto/nara-the-famous-bow.webp';
import articleKatsuoji from '@/assets/articles/osaka/katsuoji-temple.webp';
import articleKatsuojiSpring from '@/assets/articles/osaka/spring-colours-at-katsuoji-temple.webp';
import articleOsaka from '@/assets/articles/osaka/namba-yasaka.webp';
import articleOsakaNew from '@/assets/articles/osaka/osaka.webp';
import articleMtFuji from '@/assets/articles/tokyo/mt-fuji-japan.webp';
import articleKamakura from '@/assets/articles/tokyo/kamakura-japan.webp';
import articleTokyoCafes from '@/assets/articles/tokyo/best-cafe-tokyo-1.webp';
import articleTokyoParks from '@/assets/articles/tokyo/greenery-areas-tokyo.webp';
import articleTokyoTemples from '@/assets/articles/tokyo/tokyo-temples-shrines.webp';
import articleTokyoItinerary from '@/assets/articles/tokyo/tokyo-5-day-itinerary.webp';
import articleTokyoWhereToStay from '@/assets/articles/tokyo/tokyo-tower-japan-card.webp';
import articleTokyoThingsToDo from '@/assets/articles/tokyo/teamlab-borderless-tokyo.webp';
import rhodesLcpImage from '@/assets/articles/rhodes/rhodes-old-town-cobblestone-street.webp';
import articleParga from '@/assets/articles/parga/parga-from-above.webp';
import type { DestinationSlug } from '@/domains/destinations/catalog';
import { pageUrl } from '@/lib/site';


export type ArticleSlug = 'bali-7-day-itinerary' | 'bali-cafes' | 'bali-belly' | 'bali-travel-tips' | 'bali-where-to-stay' | 'bruges-christmas-markets' | 'munduk-moding-plantation-review' | 'bruges-guide' | 'hong-kong-first-trip' | 'katsuoji-temple-from-osaka' | 'kyoto-itinerary' | 'mt-fuji-day-trip-from-tokyo' | 'kamakura-day-trip-from-tokyo' | 'nara-day-trip-from-kyoto' | 'osaka-1-day-itinerary' | 'parga-1-day' | 'rhodes-itinerary' | 'tokyo-cafes' | 'tokyo-parks' | 'tokyo-temples' | 'tokyo-5-day-itinerary' | 'tokyo-where-to-stay' | 'tokyo-things-to-do';

export interface Article {
  slug: ArticleSlug;
  destinationSlug: DestinationSlug;
  category: string;
  title: string;
  carouselTitle: string;
  breadcrumbTitle: string;
  metaLabel: string;
  alt: string;
  image?: ImageMetadata;
  /** Shown on destination hubs before the article page is live. */
  comingSoon?: boolean;
  publishedDate: string;
  dateLabel?: string;
  intro: readonly string[];
  lead?: string;
  /** Optional custom paragraphs for article announcement emails (overrides lead/excerpt). */
  newsletterBody?: readonly string[];
  seoTitle?: string;
  seoDescription?: string;
  lcpImage?: ImageMetadata;
  hideAffiliateDisclaimer?: boolean;
}

export const articles: readonly Article[] = [
  {
    slug: 'kyoto-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Kyoto 3-Day Itinerary for First-Time Visitors',
    carouselTitle: 'Kyoto 3-Day Itinerary for First-Time Visitors',
    breadcrumbTitle: 'Kyoto Itinerary',
    metaLabel: 'Japan',
    alt: 'Kyoto travel guide',
    image: articleKyoto,
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "Kyoto is one of Japan's most rewarding cities to explore, but it's also much larger than many first-time visitors expect. Trying to see everything in just a couple of days usually means spending more time travelling between attractions than actually enjoying them.",
      "I spent five days in Kyoto, but if I were planning my first trip again, I'd dedicate three full days to the city. That's enough time to visit many of Kyoto's most famous sights while still leaving room to slow down and enjoy the places in between.",
      "This is the exact route I'd recommend for a first visit to Kyoto. It combines iconic landmarks with a few quieter places that ended up becoming some of my favourite memories from the trip. And if you're still planning your visit, I'd also recommend having a look at the <a href='#section-5' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the questions I wish I'd known the answers to before arriving in Kyoto.",
    ],
    lead: 'Five days in Kyoto, balancing iconic temples with quiet neighbourhoods, slow mornings and the kind of details that make the city stay with you.',
  },
  {
    slug: 'nara-day-trip-from-kyoto',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Nara Day Trip from Kyoto: Deer, Temples & Tips for First-Time Visitors',
    carouselTitle: 'Nara Day Trip from Kyoto: Deer, Temples & Tips for First-Time Visitors',
    breadcrumbTitle: 'Nara Day Trip',
    metaLabel: 'Japan',
    alt: 'Nara day trip travel guide',
    image: articleNara,
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're visiting Kyoto for the first time, Nara is one of the easiest and most rewarding day trips you can add to your itinerary. Located less than an hour away by train, it's best known for its free-roaming deer, historic temples and peaceful parks, making it a completely different experience from Kyoto.",
      "Most people, myself included, first become interested in Nara because of the famous deer. But once I arrived, I quickly realised Nara had much more to offer than just its famous deer. During my visit, I watched the famous mochi-pounding show, wandered through a traditional Japanese garden, explored Todai-ji Temple and spent time with the deer in different parts of Nara Park.",
      "If you're following my <a href='/articles/kyoto-itinerary/' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>Kyoto 3-Day Itinerary</a>, this is the exact route I'd recommend for your day trip to Nara, along with a few practical tips I wish I'd known before visiting.",
    ],
    lead: "If you're visiting Kyoto for the first time, Nara is one of the easiest day trips you can add to your itinerary.",
  },
  {
    slug: 'katsuoji-temple-from-osaka',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Katsuoji Temple from Osaka: What to Know Before You Go',
    carouselTitle: 'Katsuoji Temple from Osaka: What to Know Before You Go',
    breadcrumbTitle: 'Katsuoji Temple',
    metaLabel: 'Japan',
    alt: 'Katsuoji Temple travel guide',
    image: articleKatsuojiSpring,
    publishedDate: '22 June 2026',
    intro: [
      "If you search for day trips from Osaka, you'll probably come across Katsuoji Temple and its thousands of daruma dolls. What I didn't expect was for it to become one of my favourite experiences in Japan.",
      'Located in the hills north of Osaka, Katsuoji is a Buddhist temple best known for its daruma dolls, which are associated with perseverance, good luck, and achieving personal goals. Today, thousands of daruma can be found throughout the temple grounds, making it one of the most distinctive temples in Japan.',
      "In this guide, I'll share what to expect from a visit to Katsuoji Temple, how to get there from Osaka, the unique stamp card experience, and a few practical tips I wish I had known before visiting.",
    ],
    lead: 'Katsuoji Temple is a Buddhist temple in the hills north of Osaka, famous for the thousands of daruma dolls scattered across its peaceful grounds.',
  },
  {
    slug: 'osaka-1-day-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Osaka 1-Day Itinerary',
    carouselTitle: 'Osaka 1-Day Itinerary',
    breadcrumbTitle: 'Osaka Itinerary',
    metaLabel: 'Japan',
    alt: 'Osaka itinerary travel guide',
    image: articleOsakaNew,
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're visiting Japan for the first time, Osaka is a city that's well worth adding to your itinerary. Known for its incredible food, lively neighbourhoods and bright neon lights, it offers a completely different experience from both Tokyo and Kyoto.",
      "While I spent more than one day in Osaka, this is the itinerary I'd recommend if you only have one day to explore. It combines one of the city's most unique shrines, my favourite day trip from Osaka, a couple of memorable food stops and an evening in Dotonbori.",
      "If you're looking for a mix of iconic sights, local food and a slightly different side of Osaka, this itinerary is a great place to start.",
    ],
    lead: 'A relaxed one-day Osaka itinerary combining a peaceful morning shrine with the daruma-filled grounds of Katsuoji Temple.',
  },
  {
    slug: 'mt-fuji-day-trip-from-tokyo',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Mount Fuji Day Trip from Tokyo',
    carouselTitle: 'Mount Fuji Day Trip from Tokyo',
    breadcrumbTitle: 'Mount Fuji Day Trip',
    metaLabel: 'Japan',
    alt: 'Mount Fuji day trip travel guide',
    image: articleMtFuji,
    publishedDate: '23 July 2026',
    intro: [
      "A Mount Fuji day trip from Tokyo is one of the most popular experiences you can add to a Japan itinerary, but it is also one of the most weather-dependent. Clouds can hide the mountain completely, even if you are already in the area, so it is important to keep your expectations realistic. Still, if you only have room for one day trip from Tokyo, Mount Fuji is definitely worth considering.",
      "I booked my bus ticket for my Mount Fuji day trip at the last minute because I kept checking the weather forecast and did not want to risk going on a day with poor visibility. It felt a little stressful at the time, but the views made it absolutely worth it.",
      "In this guide, I'll share the exact stops I visited, what to know before you go, and the easiest ways to plan a Mount Fuji day trip from Tokyo.",
    ],
    lead: 'A complete guide to visiting Mount Fuji as a day trip from Tokyo, including the best viewing spots and practical travel tips.',
  },
  {
    slug: 'kamakura-day-trip-from-tokyo',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Kamakura Day Trip from Tokyo: Temples, Hidden Gems & Seaside Views',
    carouselTitle: 'Kamakura Day Trip from Tokyo: Temples, Hidden Gems & Seaside Views',
    breadcrumbTitle: 'Kamakura Day Trip',
    metaLabel: 'Japan',
    alt: 'Great Buddha of Kamakura at Kotoku-in Temple',
    image: articleKamakura,
    publishedDate: '23 July 2026',
    intro: [
      'Kamakura is one of the best day trips from Tokyo if you want to experience a different side of Japan without traveling too far. It has temples, shrines, traditional streets, local food, sea views, and a much calmer atmosphere than central Tokyo.',
      'You can visit Kamakura as a half-day trip if you only want to see the main highlights, but it also works beautifully as a full-day escape if you want more time for temples, food, and coastal views. For a first visit, I would focus on Hasedera, Kotoku-in, and Komachi Street, then add extra stops like Goryo Shrine, Hokokuji Temple, or Shichirigahama Beach depending on your time, energy, and the weather.',
    ],
    lead: 'A Kamakura day trip from Tokyo covering temples, hidden gems, and seaside views.',
  },
  {
    slug: 'tokyo-5-day-itinerary',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: '5 Days in Tokyo: The Perfect Itinerary for First-Time Visitors',
    carouselTitle: '5 Days in Tokyo: The Perfect Itinerary for First-Time Visitors',
    breadcrumbTitle: 'Tokyo 5-Day Itinerary',
    metaLabel: 'Japan',
    alt: 'Kaminarimon Gate lantern at Sensō-ji Temple in Asakusa, Tokyo',
    image: articleTokyoTemples,
    publishedDate: '23 July 2026',
    intro: [
      'Tokyo is huge, exciting, and overwhelming — especially if it is your first time visiting. Distances are bigger than they look on the map, train stations can feel like small cities, and trying to see everything in one trip can quickly become exhausting.',
      'This 5-day Tokyo itinerary is based on my own 6-night stay in the city and is organized by area to help you see the highlights without spending your whole trip moving back and forth across town. It includes traditional temples, futuristic museums, food experiences, shopping streets, neon neighborhoods, and two easy day trips from Tokyo, while still leaving enough flexibility to adjust each day to your own pace.',
      'Before you go, don’t miss the practical <a href="#section-6" class="underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]">FAQ section</a> at the end of this article, where I answer the most important questions for planning your first trip to Tokyo.',
    ],
    lead: 'A 5-day Tokyo itinerary organized by area — temples, neon neighborhoods, food, and easy day trips without constant cross-city travel.',
  },
  {
    slug: 'tokyo-cafes',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: '5 Best Cafés in Tokyo to Add to Your Itinerary',
    carouselTitle: '5 Best Cafés in Tokyo to Add to Your Itinerary',
    breadcrumbTitle: 'Tokyo Cafés',
    metaLabel: 'Japan',
    alt: '3D cat latte art in a pink teacup at a Tokyo café',
    image: articleTokyoCafes,
    publishedDate: '23 July 2026',
    intro: [
      'Tokyo is a dream city for coffee lovers. Beyond the temples, neon streets, sushi counters, and ramen shops, the city has an incredible café scene filled with specialty coffee, creative latte art, cozy interiors, and unique experiences you will not find everywhere else.',
      'During my trip to Tokyo, I dedicated part of one day to café hopping and visited some of the coffee spots that had been sitting on my list for months. Some were worth visiting for the coffee, while others stood out for their atmosphere.',
      'One thing to know before planning your own Tokyo café crawl is that many cafés do not open very early. Unlike some cities where coffee shops are busy from sunrise, a lot of Tokyo cafés open around 10:00 AM, 11:00 AM, or even later depending on the day. Always check the opening hours before you go, especially if you are planning your itinerary around a specific café.',
      'If you are looking for unique cafés in Tokyo, these are five coffee spots I recommend adding to your itinerary.',
    ],
    lead: 'Tokyo is a dream city for coffee lovers — five unique café spots worth adding to your itinerary.',
  },
  {
    slug: 'tokyo-parks',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Best Parks and Gardens in Tokyo to Add to Your Itinerary',
    carouselTitle: 'Best Parks and Gardens in Tokyo to Add to Your Itinerary',
    breadcrumbTitle: 'Tokyo Parks',
    metaLabel: 'Japan',
    alt: 'Pond and cherry blossoms in a green Tokyo park and garden',
    image: articleTokyoParks,
    publishedDate: '23 July 2026',
    intro: [
      'Tokyo may be known for neon streets, busy stations, shopping districts, and endless food spots, but the city also has some beautiful green spaces that are worth adding to your itinerary. This guide is for you if you love nature, enjoy peaceful city corners, or simply want a green place to take a break while exploring Tokyo.',
      'I’ve pinned the parks and gardens mentioned in this guide on my Ultimate Tokyo Map, which you can find inside my 5-day Tokyo itinerary. You can save the map for your trip and use it to see if there is a park or garden near the area you are exploring that day — perfect for taking a break from Tokyo’s busy streets.',
    ],
    lead: 'Tokyo’s best parks and gardens for a green break from neon streets, busy stations, and endless food spots.',
  },
  {
    slug: 'tokyo-temples',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Best Temples and Shrines in Tokyo to Add to Your Itinerary',
    carouselTitle: 'Best Temples and Shrines in Tokyo to Add to Your Itinerary',
    breadcrumbTitle: 'Tokyo Temples',
    metaLabel: 'Japan',
    alt: 'Five-story pagoda at Sensō-ji Temple in Asakusa, Tokyo',
    image: articleTokyoItinerary,
    publishedDate: '23 July 2026',
    intro: [
      'You have probably already heard of famous Tokyo temples and shrines like Sensō-ji and Meiji Jingu, and of course, they deserve a place on this list. But Tokyo also has a few beautiful hidden gems that many visitors still overlook, from the red torii gates of Hie Shrine to the lucky cats of Gotokuji Temple.',
      'I’ve pinned all the temples and shrines mentioned in this guide on my Ultimate Tokyo Map, which you can find inside my 5-day Tokyo itinerary. You can save the map for your trip and use it to see which stops fit naturally into the area you are exploring that day.',
    ],
    lead: 'Famous Tokyo temples and quieter hidden gems — from Sensō-ji and Meiji Jingu to Hie Shrine and Gotokuji.',
  },
  {
    slug: 'tokyo-where-to-stay',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Where to Stay in Tokyo: The Best Areas and Hotels',
    carouselTitle: 'Where to Stay in Tokyo: The Best Areas and Hotels',
    breadcrumbTitle: 'Where to Stay in Tokyo',
    metaLabel: 'Japan',
    alt: 'Tokyo Tower and Minato City skyline',
    image: articleTokyoWhereToStay,
    publishedDate: '9 August 2026',
    intro: [
      'Choosing where to stay in Tokyo can feel overwhelming. With a city this huge, hundreds of neighborhoods, and one of the world’s most complex train networks, finding the right area can make the difference between spending your trip exploring and wasting valuable time commuting.',
      'The good news? You don’t need to figure it out alone. In this guide, I’ll help you find the best areas to stay in Tokyo based on your travel style, whether you’re visiting for the first time, looking for nightlife, shopping, luxury, a quieter local atmosphere, or the most convenient location for exploring the city.',
      'By the end of this guide, choosing where to stay in Tokyo will feel much easier, giving you more time to focus on the exciting parts of your trip and start getting ready for your Tokyo adventure.',
    ],
    lead: 'A guide to the best areas and hotels in Tokyo, from Shinjuku and Shibuya to Ginza, Asakusa, and beyond.',
  },
  {
    slug: 'tokyo-things-to-do',
    destinationSlug: 'japan',
    category: 'JAPAN',
    title: 'Best Things to Do in Tokyo',
    carouselTitle: 'Best Things to Do in Tokyo',
    breadcrumbTitle: 'Best Things to Do in Tokyo',
    metaLabel: 'Japan',
    alt: 'Immersive digital art installation at teamLab Borderless in Tokyo',
    image: articleTokyoThingsToDo,
    publishedDate: '9 August 2026',
    intro: [
      'Tokyo is huge and one of those cities where you could spend weeks exploring and still feel like you’ve only seen a small part of it. I could easily write a long list with more than 30 things to do, but the goal of this article isn’t to overwhelm you. Instead, I want to highlight the places and experiences that truly deserve a spot on your Tokyo itinerary.',
    ],
    lead: 'The best things to do in Tokyo for first-time visitors, from iconic landmarks to quieter neighborhoods worth slowing down for.',
  },
  {
    slug: 'bali-cafes',
    hideAffiliateDisclaimer: true,
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'Best Cafés in Bali After 2 Months on the Island',
    carouselTitle: 'Best Cafés in Bali After 2 Months on the Island',
    breadcrumbTitle: 'Bali Cafés',
    metaLabel: 'Bali',
    alt: 'Bali cafés guide',
    image: articleBali,
    publishedDate: '18 June 2026',
    intro: [
      'After spending almost two months in Bali, eating out nearly every day became part of my routine. Between cafés, brunch spots, and restaurants, I ended up visiting far more places than I ever expected.',
      "If you've researched Bali before, you've probably come across countless viral cafés on social media. But for a place to make it onto this list, it needed more than just a beautiful setting. Great food, a relaxed atmosphere, and a place I'd genuinely want to return to all mattered just as much.",
      'These are the places that stood out most during my time on the island — from cafés overlooking rice terraces and some of my favorite brunch spots to the restaurant that served the best meal I had in Bali.',
      "Whether you're planning your first trip to Bali or looking for new places to add to your itinerary, these cafés are perfect additions to your Bali adventure. If you're planning a shorter visit, you can also check out my <a href='/articles/bali-7-day-itinerary/' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>7-day Bali itinerary</a> for ideas on how to explore the island.",
    ],
    lead: "Bali's café culture is one of the best in the world — thoughtfully designed spaces, excellent coffee and slow mornings that set the tone for the whole day. These are the spots I keep coming back to.",
  },
  {
    slug: 'bali-belly',
    hideAffiliateDisclaimer: true,
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'Bali Belly: What It Is, My Experience & Recovery',
    carouselTitle: 'Bali Belly: What It Is, My Experience & Recovery',
    breadcrumbTitle: 'Bali Belly',
    metaLabel: 'Bali',
    alt: 'Bali Belly: What It Is, My Experience & Recovery',
    image: articleBaliBelly,
    publishedDate: '26 June 2026',
    intro: [
      "Before travelling to Bali, I'd heard plenty of stories about Bali Belly, but I never expected to experience it myself.",
      "Bali Belly is the common name for traveller's diarrhoea that affects some visitors to Bali. It's usually caused by bacteria, viruses, or parasites found in contaminated food or water.",
      'In most cases, symptoms last between one and three days and improve with rest, proper hydration, and the right treatment. However, if your symptoms last longer than three days, become severe, or you struggle to stay hydrated, it is important to seek medical attention.',
    ],
    lead: 'My honest experience with Bali Belly — what it is, the symptoms I had, and what actually helped me recover.',
  },
  {
    slug: 'bali-travel-tips',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'What to Know Before Traveling to Bali',
    carouselTitle: 'What to Know Before Traveling to Bali',
    breadcrumbTitle: 'Bali Travel Tips',
    metaLabel: 'Bali',
    alt: 'What to Know Before Traveling to Bali',
    image: articleBaliTips,
    publishedDate: '9 August 2026',
    dateLabel: 'Last updated',
    intro: [
      "I spent almost two months traveling around Bali, and by the end of my trip there were a few things I was really glad I'd done.",
      "In this guide, I'll share a few practical tips that I think are worth knowing before traveling to Bali, from getting your Visa on Arrival and choosing an eSIM to the travel essentials I always pack and a few things I'd do exactly the same way again.",
    ],
    lead: 'A few practical tips worth knowing before traveling to Bali — from your Visa on Arrival and eSIM to the travel essentials I always pack.',
  },
  {
    slug: 'bali-7-day-itinerary',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'The Perfect 7-Day Bali Itinerary for First-Time Visitors (2026)',
    carouselTitle: 'The Perfect 7-Day Bali Itinerary for First-Time Visitors (2026)',
    breadcrumbTitle: 'Bali 7-Day Itinerary',
    metaLabel: 'Bali',
    alt: 'The Perfect 7-Day Bali Itinerary for First-Time Visitors (2026)',
    image: articleBaliItinerary,
    publishedDate: '6 July 2026',
    intro: [
      "Bali is one of those places that's almost impossible to experience in just one trip. Between ancient temples, lush rice terraces, beautiful beaches and incredible cafés, there's far more to see than most first-time visitors expect. The biggest mistake people make is trying to fit everything into one itinerary. Bali is much larger than it looks on a map, and getting around often takes longer than Google Maps suggests. Instead of constantly moving hotels, I'd recommend choosing just two bases and exploring from there.",
      "That's exactly how this 7-day itinerary is designed. You'll split your stay between Nusa Dua and Ubud, with a few carefully planned day trips along the way. It's the same approach I followed during my own trip, and it made exploring Bali far more enjoyable.",
      "Before you start planning, I'd also recommend reading my <a href='/articles/bali-travel-tips/' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>What to Know Before Traveling to Bali</a> guide. And before you leave this article, don't forget to check the <a href='#section-faq' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end, where I've answered some of the most common questions first-time visitors have - such as the best way to get around Bali, the best time to visit and whether 7 days are enough to explore the island.",
    ],
    lead: 'A complete 7-day Bali itinerary for first-time visitors, split between Nusa Dua and Ubud with carefully planned day trips along the way.',
  },
  {
    slug: 'bali-where-to-stay',
    destinationSlug: 'bali',
    category: 'BALI',
    title: 'Where to Stay in Bali',
    carouselTitle: 'Where to Stay in Bali',
    breadcrumbTitle: 'Where to Stay in Bali',
    metaLabel: 'Bali',
    alt: 'Where to Stay in Bali accommodation guide',
    image: articleBaliWhereToStay,
    publishedDate: '26 July 2026',
    intro: [
      'Once you decide to visit Bali, the biggest challenge is not what to see — it is deciding where to stay. The island is much bigger than most people expect, and choosing the right area can completely change your experience.',
      "If you have read any of my other Bali guides, you may already know that I spent almost two months exploring the island. That gave me the chance to stay in several different resorts and experience what each area is really like, beyond the photos you see online.",
      'In this guide, you will find my favorite areas to stay in Bali, along with the resorts I would personally recommend in each one. I have also included a few extra hotels that stand out for their location, atmosphere, or overall experience, so you can choose the area that best fits your trip.',
    ],
    lead: 'A guide to the best areas to stay in Bali, from Ubud and Seminyak to Nusa Dua and beyond, with tips on choosing the right base for your trip.',
  },
  {
    slug: 'munduk-moding-plantation-review',
    destinationSlug: 'bali',
    category: 'BALI',
    title: "Munduk Moding Plantation Review: Bali's Iconic Infinity Pool & Luxury Nature Resort",
    carouselTitle: "Munduk Moding Plantation Review: Bali's Iconic Infinity Pool & Luxury Nature Resort",
    breadcrumbTitle: 'Munduk Moding Review',
    metaLabel: 'Bali',
    alt: "Munduk Moding Plantation infinity pool and luxury nature resort in North Bali",
    image: articleMundukModingReviewCard,
    lcpImage: articleMundukModingReviewHero,
    publishedDate: '28 July 2026',
    intro: [
      'Many hotels in Bali describe themselves as eco-friendly, but very few actually make you feel that sustainability is part of the experience. After spending almost two months in Bali and staying at several different resorts, I quickly realized that the word eco is used everywhere—but Munduk Moding Plantation was the first place where I truly understood what an eco-resort should be.',
    ],
    lead: 'Many hotels in Bali call themselves eco-friendly — Munduk Moding Plantation was the first place where I truly felt what an eco-resort should be.',
    newsletterBody: [
      'Hi there,',
      'I just published my full review of Munduk Moding Plantation, one of the most unforgettable stays I experienced in Bali. Surrounded by coffee plantations and tropical forest, this luxury resort in North Bali is known for its breathtaking mountain views, iconic infinity pool, and peaceful atmosphere.',
    ],
  },
  {
    slug: 'rhodes-itinerary',
    destinationSlug: 'greece',
    category: 'GREECE',
    title: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Local Food Spots',
    carouselTitle: 'Rhodes 5-Day Itinerary: Beaches, Day Trips & Local Food Spots',
    breadcrumbTitle: 'Rhodes Itinerary',
    metaLabel: 'Greece',
    alt: 'Rhodes travel guide',
    image: articleGreece,
    publishedDate: '30 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "If you're looking for a Greek island that combines history, beaches and great food, Rhodes is hard to beat. I was surprised to learn it's the third-largest island in Greece, and after spending five days there, it finally made sense why so many people return more than once.",
      "I spent five days exploring the island, and this is the exact route I'd recommend if I were planning the trip again. It includes the places I believe every first-time visitor should see, while leaving plenty of reasons to come back.",
      "Before you start planning your trip, I'd also recommend checking the <a href='#section-6' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the most common questions about visiting Rhodes.",
    ],
    lead: 'Five days on Rhodes, mixing the medieval old town with quiet beaches, island day trips and the kind of local tavernas that make Greek summers unforgettable.',
    lcpImage: rhodesLcpImage,
  },
  {
    slug: 'parga-1-day',
    destinationSlug: 'greece',
    category: 'GREECE',
    title: 'How to spend 1 day in Parga',
    carouselTitle: 'How to spend 1 day in Parga',
    breadcrumbTitle: 'Parga in 1 Day',
    metaLabel: 'Greece',
    alt: 'Parga travel guide',
    image: articleParga,
    publishedDate: '29 June 2026',
    dateLabel: 'Last updated',
    intro: [
      "Parga is one of the most beautiful seaside towns in Greece, known for its colourful houses, crystal-clear beaches and the Venetian Castle overlooking the harbour. Although it's located on the mainland, it has an island-like atmosphere that makes it feel unlike anywhere else in Epirus.",
      "I've visited Parga twice so far. The first time, I spent four days exploring the town at a relaxed pace, while my second visit was a day trip from Preveza. Both trips were completely different, but they confirmed one thing—Parga is still one of my favourite places in Greece.",
      "If you only have one day to explore, this is the itinerary I'd recommend. It includes some of my favourite places for breakfast, sightseeing, swimming and dinner, along with a few tips I picked up during my visits.",
    ],
    lead: 'A relaxed one-day guide to Parga, from its hillside old town to the beaches below the Venetian castle.',
  },
  {
    slug: 'hong-kong-first-trip',
    destinationSlug: 'hong-kong',
    category: 'HONG KONG',
    title: "Places You Shouldn't Miss on Your First Trip to Hong Kong",
    carouselTitle: "Places You Shouldn't Miss on Your First Trip to Hong Kong",
    breadcrumbTitle: 'First Trip to Hong Kong',
    metaLabel: 'Hong Kong',
    alt: 'Hong Kong travel guide',
    image: articleHongKong,
    publishedDate: '30 June 2026',
    intro: [
      "Hong Kong is one of the most unique cities I've ever visited. Although it's part of China, its history has created a fascinating blend of Eastern traditions and Western influences that you notice almost everywhere. Towering skyscrapers stand next to traditional temples, historic trams pass through busy streets, and peaceful gardens offer a quiet escape from the city's fast pace. It's this contrast between old and new that makes Hong Kong feel unlike anywhere else.",
      "In this guide, I've included the places I highly recommend to anyone planning their first trip to the city. You'll also find a map below with all the places mentioned in this guide, along with a few hotel recommendations.",
      "I stayed at Novotel Century Hong Kong and found it to be a great base for exploring the city. Getting there from the airport was easy with a direct bus, and both the MTR and the tram were just a short walk away. One of the things that impressed me most about Hong Kong was how easy it was to get around thanks to its excellent public transport system.",
      "Before you leave, don't miss the <a href='#section-10' class='underline underline-offset-2 text-[#5B6560] hover:text-[#3d4441]'>FAQ section</a> at the end of this guide, where I've answered some of the most common questions about visiting Hong Kong.",
    ],
    lead: 'A first-timer\u2019s guide to Hong Kong, from skyline views over Victoria Harbour to markets, temples and unforgettable food.',
    seoTitle: 'Hong Kong Travel Guide — Voyaflair',
    seoDescription:
      "The places you shouldn't miss on your first trip to Hong Kong — skyline views, markets, temples and local food from a personal travel guide.",
  },
  {
    slug: 'bruges-guide',
    destinationSlug: 'belgium',
    category: 'BELGIUM',
    title: "Best Things to Do in Bruges: A First-Time Visitor's Guide",
    carouselTitle: "Best Things to Do in Bruges: A First-Time Visitor's Guide",
    breadcrumbTitle: 'Bruges Guide',
    metaLabel: 'Belgium',
    alt: 'Bruges travel guide',
    image: articleBruges,
    publishedDate: '9 August 2026',
    dateLabel: 'Last updated',
    intro: [
      "I never expected a little town in Belgium, just an hour from Brussels, to steal my heart the way Bruges did. I’ve always loved medieval cities, cobblestone streets that make you feel like you’ve stepped back in time, and that cozy feeling you get when you’re surrounded by beautiful old buildings rather than the busy, sometimes impersonal atmosphere of a big city. And if you’re anything like me, I have a feeling Bruges won’t disappoint you either.",
      "So, if you’re still wondering whether Bruges is worth visiting and whether you should book those tickets, my answer is simple:",
      "Just book them!",
      "Whether you’re planning to spend one day in Bruges or enjoy a relaxed weekend, I’ve put together a list of my favorite things to do in this charming city — the places I loved most during my visit and would happily return to the next time I’m there.",
    ],
    seoTitle: 'Bruges Travel Guide — Voyaflair',
    seoDescription:
      'Top things to do in Bruges — favorite cafés, chocolate spots, scenic walks, and hidden gems from a personal travel guide.',
  },
  {
    slug: 'bruges-christmas-markets',
    destinationSlug: 'belgium',
    category: 'BELGIUM',
    title: 'Christmas Markets in Bruges 2026',
    carouselTitle: 'Christmas Markets in Bruges 2026',
    breadcrumbTitle: 'Christmas Markets',
    metaLabel: 'Belgium',
    alt: 'Christmas Markets in Bruges',
    image: articleBrugesComingSoon,
    publishedDate: '4 September 2026',
    dateLabel: 'Published',
    intro: [
      "The coziest season of the year is almost here, and you're probably already dreaming of Christmassy things to do this winter in Europe. I totally get you because I do exactly the same thing, and if you're thinking of spending some time in Bruges this Christmas, I'll tell you that it's one of the most magical destinations you can choose. Imagine medieval streets, cobblestone streets, cozy cafés, Belgian hot chocolate and fresh waffles, not to mention two Christmas markets in this little charming city.",
      "I visited Bruges in November last year for my birthday, and I feel so lucky I was able to experience it with all the Christmas decorations and at its coziest. Before I give you all the details about the two Christmas markets in Bruges, I will mention some things that I truly believe will help you plan your trip.",
    ],
    lead: 'A guide to Christmas markets in Bruges 2026 — medieval streets, cozy cafés, Belgian hot chocolate and fresh waffles.',
  },
] as const;

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articleHref(slug: ArticleSlug): string {
  return pageUrl(`articles/${slug}`);
}

export function articlesForDestination(slug: DestinationSlug) {
  return articles.filter((a) => a.destinationSlug === slug);
}
