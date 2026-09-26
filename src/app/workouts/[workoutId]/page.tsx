import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkoutItem } from '@/types/workout';
import ActionButtons from '@/components/ActionButtons';

// Local fallback workout list (Ensures 100% reliable loading without network fetch issues)
const fallbackWorkouts: WorkoutItem[] = [
  {
    id: 1,
    title: 'BARBELL BENCH PRESS',
    equipment: 'Barbell / Flat Bench',
    time: '45 min',
    calories: '320 kcal',
    rating: '4.9',
    tags: ['CHEST', 'STRENGTH'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
    description: 'The foundational compound chest exercise for overall upper body pressing strength.',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '6-8',
    instructions: [
      'Position yourself comfortably on the bench with feet flat on the floor.',
      'Grip the barbell slightly wider than shoulder-width apart.',
      'Unrack the bar and lower it with control to your mid-chest.',
      'Press the bar explosively back up to the starting position.'
    ]
  },
  {
    id: 2,
    title: 'INCLINE DUMBBELL PRESS',
    equipment: 'Dumbbells / Incline Bench',
    time: '40 min',
    calories: '280 kcal',
    rating: '4.8',
    tags: ['CHEST', 'HYPERTROPHY'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    description: 'Targets the clavicular head (upper chest) while allowing a natural wrist angle.',
    difficulty: 'Intermediate',
    sets: 3,
    reps: '8-10',
    instructions: [
      'Set an adjustable bench to a 30-45 degree incline.',
      'Hold dumbbells at shoulder level with palms facing forward.',
      'Press the dumbbells up and slightly inward until arms are extended.',
      'Lower slowly with control feeling the stretch in upper chest.'
    ]
  },
  {
    id: 3,
    title: 'CABLE CHEST FLYES',
    equipment: 'Dual Cable Machine',
    time: '30 min',
    calories: '210 kcal',
    rating: '4.7',
    tags: ['CHEST', 'ISOLATION'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    description: 'Provides continuous tension across the chest through the full range of motion.',
    difficulty: 'Beginner',
    sets: 3,
    reps: '12-15',
    instructions: [
      'Set pulleys to shoulder height or slightly higher.',
      'Step forward with a slight lean and slight bend in your elbows.',
      'Bring handles together in a hugging motion in front of your chest.',
      'Return slowly to the starting position.'
    ]
  },
  {
    id: 4,
    title: 'BARBELL BACK SQUAT',
    equipment: 'Barbell / Squat Rack',
    time: '50 min',
    calories: '450 kcal',
    rating: '5.0',
    tags: ['LEGS', 'COMPOUND'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    description: 'The king of lower body movements building quadriceps, glutes, and core stability.',
    difficulty: 'Advanced',
    sets: 5,
    reps: '5',
    instructions: [
      'Rest the barbell across your upper back (traps).',
      'Unrack the bar, step back, and set your feet shoulder-width apart.',
      'Lower your hips back and down until thighs are parallel to the floor.',
      'Drive through your heels to return to standing.'
    ]
  },
  {
    id: 5,
    title: 'ROMANIAN DEADLIFT',
    equipment: 'Barbell / Plates',
    time: '35 min',
    calories: '310 kcal',
    rating: '4.9',
    tags: ['HAMSTRINGS', 'POSTERIOR'],
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=80',
    description: 'Hinge-focused movement targeting hamstrings and glutes through eccentric stretch.',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '8-10',
    instructions: [
      'Hold the barbell with an overhand grip in front of your thighs.',
      'Keep a slight bend in your knees and push your hips back.',
      'Lower the bar along your shins until you feel a deep stretch in hamstrings.',
      'Drive your hips forward to return to the starting position.'
    ]
  },
  {
    id: 6,
    title: 'STANDING OVERHEAD PRESS',
    equipment: 'Barbell',
    time: '35 min',
    calories: '260 kcal',
    rating: '4.8',
    tags: ['SHOULDERS', 'STRENGTH'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80',
    description: 'Full overhead vertical pressing for shoulder mass and core stability.',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '6-8',
    instructions: [
      'Hold the bar at shoulder height with hands shoulder-width apart.',
      'Brace your core and squeeze your glutes for stability.',
      'Press the bar straight up overhead, moving your head slightly back.',
      'Lock out arms at the top and lower back down smoothly.'
    ]
  }
];

// Single workout fetch function with API primary & direct local fallback array
const getSingleWorkout = async (workoutId: string): Promise<WorkoutItem | null> => {
  try {
    // 1. Try Live API First
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !Array.isArray(data)) return data as WorkoutItem;
    }

    const allRes = await fetch('https://api.abcz.workers.dev/api/fitlog', { cache: 'no-store' });
    if (allRes.ok) {
      const allData = await allRes.json();
      const list: WorkoutItem[] = Array.isArray(allData) ? allData : allData?.workouts || [];
      const found = list.find((item: WorkoutItem) => String(item.id) === String(workoutId));
      if (found) return found;
    }
  } catch (error) {
    console.log('API unreachable, using bulletproof local array fallback');
  }

  // 2. Instant Local Fallback (No network dependency)
  return fallbackWorkouts.find((item) => String(item.id) === String(workoutId)) || null;
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

          {/* Interactive Action Buttons */}
          <ActionButtons workout={workout} />

        </div>

      </div>
    </section>
  );
};

export default WorkoutDetailsPage;