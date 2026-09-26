'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { WorkoutItem } from '@/types/workout';

interface PlanContextType {
  planList: WorkoutItem[];
  savedList: WorkoutItem[];
  addToPlan: (item: WorkoutItem) => void;
  addToSaved: (item: WorkoutItem) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toastMessage: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<WorkoutItem[]>([]);
  const [savedList, setSavedList] = useState<WorkoutItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. LocalStorage theke data load kora (Safe Try-Catch)
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog_plan');
      const savedSaved = localStorage.getItem('fitlog_saved');

      if (savedPlan) {
        const parsedPlan = JSON.parse(savedPlan) as WorkoutItem[];
        if (Array.isArray(parsedPlan)) setPlanList(parsedPlan);
      }

      if (savedSaved) {
        const parsedSaved = JSON.parse(savedSaved) as WorkoutItem[];
        if (Array.isArray(parsedSaved)) setSavedList(parsedSaved);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Toast message auto hide kora (Timer Cleanup)
  const showToast = (msg: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastMessage(msg);
    timerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 2. Add to Today's Plan logic (Functional Update)
  const addToPlan = (item: WorkoutItem) => {
    setPlanList((prev) => {
      const isExist = prev.some((p) => String(p.id) === String(item.id));
      if (isExist) {
        showToast(`"${item.title || 'Workout'}" is already in today's plan!`);
        return prev;
      }
      const updated = [...prev, item];
      localStorage.setItem('fitlog_plan', JSON.stringify(updated));
      showToast(`Added "${item.title || 'Workout'}" to today's plan!`);
      return updated;
    });
  };

  // 3. Add to Save for later logic (Functional Update)
  const addToSaved = (item: WorkoutItem) => {
    setSavedList((prev) => {
      const isExist = prev.some((s) => String(s.id) === String(item.id));
      if (isExist) {
        showToast(`"${item.title || 'Workout'}" is already saved!`);
        return prev;
      }
      const updated = [...prev, item];
      localStorage.setItem('fitlog_saved', JSON.stringify(updated));
      showToast(`Saved "${item.title || 'Workout'}" for later!`);
      return updated;
    });
  };

  // 4. Remove from Plan logic
  const removeFromPlan = (id: string | number) => {
    setPlanList((prev) => {
      const updated = prev.filter((item) => String(item.id) !== String(id));
      localStorage.setItem('fitlog_plan', JSON.stringify(updated));
      showToast('Removed workout from plan');
      return updated;
    });
  };

  // 5. Remove from Saved logic
  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => {
      const updated = prev.filter((item) => String(item.id) !== String(id));
      localStorage.setItem('fitlog_saved', JSON.stringify(updated));
      showToast('Removed workout from saved list');
      return updated;
    });
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toastMessage,
      }}
    >
      {children}

      {/* Floating Toast Notification UI */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#ccff00] text-black font-bold px-5 py-3 rounded-xl shadow-2xl border border-black/10 flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span className="text-xs uppercase tracking-wide">{toastMessage}</span>
        </div>
      )}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};