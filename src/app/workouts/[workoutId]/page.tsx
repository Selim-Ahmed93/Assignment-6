import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkoutItem } from '@/types/workout';

// Single workout API fetch function
const getSingleWorkout = async (workoutId: string): Promise<WorkoutItem | null> => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !Array.isArray(data)) return data as WorkoutItem;
    }

    // Fallback: Main API theke find korbe
    const allRes = await fetch('https://api.abcz.workers.dev/api/fitlog', { cache: 'no-store' });
    if (!allRes.ok) return null;

    const allData = await allRes.json();
    const list: WorkoutItem[] = Array.isArray(allData) ? allData : allData?.workouts || [];
    return list.find((item: WorkoutItem) => String(item.id) === String(workoutId)) || null;
  } catch (error) {
    console.log('Error fetching single workout:', error);
    return null;
  }
};

type Props = {
  params: Promise<{ workoutId: string }>;
};

const WorkoutDetailsPage = async ({ params }: Props) => {
  const { workoutId } = await params;
  const workout = await getSingleWorkout(workoutId);

  // Data na paowa gele Fallback UI
  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found!</h2>
        <Link
          href="/"
          className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-full uppercase text-xs"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  const defaultInstructions: string[] = workout.instructions || [
    'Position yourself comfortably on the bench/mat with feet flat on the floor.',
    'Grip the weights securely with wrists straight and shoulders braced.',
    'Execute the movement with controlled cadence through a full range of motion.',
    'Return to starting position smoothly and repeat for recommended sets.',
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors"
        >
          ← Back to Library
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Image Container */}
        <div className="bg-[#13151b] border border-gray-800 rounded-3xl overflow-hidden p-3 shadow-2xl">
          <div className="relative w-full h-[320px] sm:h-[450px] bg-gray-900 rounded-2xl overflow-hidden">
            <Image
              src={workout.image || '/banner3.png'}
              alt={workout.title || 'Workout detail'}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Detailed Information */}
        <div className="flex flex-col gap-6">
          
          {/* Header & Tags */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {workout.tags && workout.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {workout.title || 'Workout Name'}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
              {workout.description ||
                'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.'}
            </p>
          </div>

          {/* Key Specs Table / Panel */}
          <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Equipment</p>
              <p className="text-white text-xs font-semibold mt-1">{workout.equipment || 'Barbell, Bench'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Difficulty</p>
              <p className="text-white text-xs font-semibold mt-1">{workout.difficulty || 'Intermediate'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Sets & Reps</p>
              <p className="text-white text-xs font-semibold mt-1">
                {workout.sets || 4} Sets / {workout.reps || '6-8'} Reps
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Duration</p>
              <p className="text-white text-xs font-semibold mt-1">{workout.time || '25 min'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Calories</p>
              <p className="text-white text-xs font-semibold mt-1">{workout.calories || '180 kcal'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Rating</p>
              <p className="text-[#ccff00] text-xs font-semibold mt-1">★ {workout.rating || '4.8'}</p>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-5">
            <h3 className="text-white text-sm font-black uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-3">
              {defaultInstructions.map((step: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-xs text-gray-300">
                  <span className="flex items-center justify-center bg-[#ccff00] text-black font-black w-5 h-5 rounded-full text-[10px] shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add to today&apos;s plan
            </button>

            <button
              type="button"
              className="flex-1 bg-transparent hover:bg-gray-800 text-white border border-gray-700 font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save for later
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WorkoutDetailsPage;