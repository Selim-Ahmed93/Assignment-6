import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkoutItem } from '@/types/workout';

// Fetch workouts directly from the API
const getWorkouts = async (): Promise<WorkoutItem[]> => {
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data?.workouts || [];
    }
  } catch (error) {
    console.error('Failed to fetch workouts from API:', error);
  }
  return [];
};

const LibraryPage = async () => {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Workout <span className="text-[#ccff00]">Library</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Explore our curated collection of professional strength and conditioning workouts.
          </p>
        </div>

        {/* Workouts Grid */}
        {workouts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-semibold">No workouts found or API is temporarily unavailable.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#13151b] border border-gray-800/80 rounded-3xl p-4 flex flex-col justify-between transition-transform duration-300 hover:border-[#ccff00]/50 hover:shadow-xl group"
              >
                <div>
                  {/* Workout Image */}
                  <div className="relative w-full h-48 bg-gray-900 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={workout.image || '/banner3.png'}
                      alt={workout.title || 'Workout'}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#ccff00]">
                      ★ {workout.rating || '4.8'}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {workout.tags && workout.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black uppercase text-white tracking-wide group-hover:text-[#ccff00] transition-colors">
                    {workout.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {workout.description}
                  </p>
                </div>

                {/* Footer / Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-gray-400 font-medium">
                    <span>{workout.time || '30 min'}</span> • <span>{workout.difficulty || 'Intermediate'}</span>
                  </div>
                  
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="bg-[#ccff00] hover:bg-[#b3e600] text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider transition-all shadow-lg shadow-[#ccff00]/10"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default LibraryPage;