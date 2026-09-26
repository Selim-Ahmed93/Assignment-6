'use client';

import React from 'react';
import { usePlan } from '@/context/PlanContext';
import { WorkoutItem } from '@/types/workout';

export default function ActionButtons({ workout }: { workout: WorkoutItem }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-2">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2.5" d="M12 4v16m8-8H4" />
        </svg>
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => addToSaved(workout)}
        className="flex-1 bg-transparent hover:bg-gray-800 text-white border border-gray-700 font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Save for later
      </button>
    </div>
  );
}