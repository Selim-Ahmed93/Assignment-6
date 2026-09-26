'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';

const MyPlanPage = () => {
  const { planList, removeFromPlan } = usePlan();
  const [completedIds, setCompletedIds] = useState<(string | number)[]>([]);

  // Toggle completed status for an item
  const toggleCompleted = (id: string | number) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((cId) => cId !== id));
    } else {
      setCompletedIds([...completedIds, id]);
    }
  };

  // Helper to parse numbers from string (e.g. "25 min" -> 25, "180 kcal" -> 180)
  const parseNumber = (value?: string | number): number => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Calculate total metrics dynamically
  const totalMinutes = planList.reduce((acc, item) => acc + parseNumber(item.time), 0);
  const totalCalories = planList.reduce((acc, item) => acc + parseNumber(item.calories), 0);
  const completedCount = completedIds.filter((id) =>
    planList.some((item) => String(item.id) === String(id))
  ).length;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 min-h-[75vh]">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            MY TODAY&apos;S PLAN
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Track and complete your scheduled workouts for the day.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-5 py-2.5 rounded-xl uppercase text-xs tracking-wider transition-colors w-fit"
        >
          + Add More Workouts
        </Link>
      </div>

      {/* Summary Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-4 sm:p-5">
          <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Total Workouts
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">{planList.length}</p>
        </div>

        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-4 sm:p-5">
          <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Est. Time
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {totalMinutes} <span className="text-xs font-semibold text-gray-400">min</span>
          </p>
        </div>

        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-4 sm:p-5">
          <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Est. Burn
          </p>
          <p className="text-2xl sm:text-3xl font-black text-[#ccff00] mt-1">
            {totalCalories} <span className="text-xs font-semibold text-gray-400">kcal</span>
          </p>
        </div>

        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-4 sm:p-5">
          <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Completed
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {completedCount} <span className="text-xs font-semibold text-gray-500">/ {planList.length}</span>
          </p>
        </div>
      </div>

      {/* Empty State */}
      {planList.length === 0 ? (
        <div className="bg-[#13151b] border border-gray-800/80 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center my-8">
          <div className="w-16 h-16 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-400 mb-4 text-2xl">
            🏋️‍♂️
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">
            Your Today&apos;s Plan is Empty!
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6">
            You haven&apos;t added any workout routines to your plan yet. Browse the library and add exercises to get started!
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-6 py-3 rounded-xl uppercase text-xs tracking-wider transition-colors"
          >
            Explore Library
          </Link>
        </div>
      ) : (
        /* Workouts List */
        <div className="space-y-4">
          {planList.map((item) => {
            const isDone = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-[#13151b] border ${
                  isDone ? 'border-green-500/40 opacity-75' : 'border-gray-800'
                } rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 shadow-lg`}
              >
                {/* Left Side: Thumbnail + Title + Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-900 overflow-hidden shrink-0 border border-gray-800">
                    <Image
                      src={item.image || '/banner3.png'}
                      alt={item.title || 'Workout'}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {item.tags && item.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ccff00] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                      {isDone && (
                        <span className="bg-green-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Done ✓
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/workout/${item.id}`}
                      className={`text-base sm:text-lg font-black uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors ${
                        isDone ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {item.title}
                    </Link>

                    <p className="text-gray-400 text-xs mt-0.5">
                      {item.equipment || 'No equipment'} • {item.time || '15 min'} • {item.calories || '100 kcal'}
                    </p>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                  <button
                    type="button"
                    onClick={() => toggleCompleted(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-green-500 hover:bg-green-600 text-black font-black'
                    }`}
                  >
                    {isDone ? 'Undo' : 'Mark as Done'}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromPlan(item.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-colors cursor-pointer border border-red-500/20"
                    title="Remove from plan"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyPlanPage;