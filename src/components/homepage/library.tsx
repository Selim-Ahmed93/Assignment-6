import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorkoutItem } from '@/types/workout';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// API theke data fetch korar function (Fail-safe version)
const getFetchData = async (): Promise<WorkoutItem[]> => {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store', // Vercel-e realtime fresh fetch ensure korar jonno
    });

    if (!res.ok) {
      console.error(`API fetch failed with status: ${res.status}`);
      return [];
    }

    const rawData = await res.json();

    // API array pathak ba object ({ data: [...] }) pathak — safe array extraction
    if (Array.isArray(rawData)) {
      return rawData;
    } else if (Array.isArray(rawData?.data)) {
      return rawData.data;
    } else if (Array.isArray(rawData?.workouts)) {
      return rawData.workouts;
    }

    return [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const LibraryPage = async () => {
  const data = await getFetchData();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Empty / Error Fallback State */}
      {!data || data.length === 0 ? (
        <div className="bg-[#13151b] border border-gray-800 rounded-2xl p-8 text-center my-6">
          <p className="text-yellow-400 font-bold text-lg mb-1">
            ⚠️ Unable to load workout data!
          </p>
          <p className="text-gray-400 text-xs">
            Please try reloading the page or check your internet connection.
          </p>
        </div>
      ) : (
        /* Responsive Grid Layout (3x4 grid on large screens) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Link key={item.id} href={`/workouts/${item.id}`} className="block h-full">
              <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer">
                
                {/* Top Image Container */}
                <div className="relative w-full h-48 sm:h-52 bg-gray-900 overflow-hidden">
                  <Image
                    src={item.image || '/banner3.png'}
                    alt={item.title || 'Workout Image'}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag Pills */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {item.tags && item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Workout Name */}
                    <h3 className="text-white text-base sm:text-lg font-black uppercase tracking-tight line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Equipment Line */}
                    <p className="text-gray-400 text-xs mt-1 font-normal">
                      {item.equipment}
                    </p>
                  </div>

                  {/* Stats Row (Duration, Calories, Rating) */}
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-medium pt-4 mt-5 border-t border-gray-800/60">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <path strokeWidth="2" d="M12 7v5l3 2" />
                      </svg>
                      <span>{item.time}</span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.32 1.83-6.19 4.5-7.66.36-.2.82.02.87.43.32 2.59 2.11 4.7 4.63 5.23.36.08.68-.2.68-.57V2.5c0-.42.4-.73.81-.62C18.25 2.94 21 6.8 21 11.5c0 6.35-4.03 11.5-9 11.5z" />
                      </svg>
                      <span>{item.calories}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default LibraryPage;