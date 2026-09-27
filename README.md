# 🏋️‍♂️ FitLog — Workout Library App

**FitLog** is a modern, responsive web application designed for fitness enthusiasts to explore workout routines, track daily training sessions, and build custom workout plans. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

> *"Train hard, log honest."*

---

## 🚀 Live Demo & API

- **Live Site**: https://fitlog-app-two.vercel.app/
- **API Endpoint**: `https://api.abcz.workers.dev/api/fitlog`

---

## ✨ Key Features

- 📱 **Responsive Navigation Bar**: Includes a mobile dropdown menu, smooth navigation links, and dynamic live counters for planned and saved workouts.
- 🏋️ **The Library**: Displays a grid of workout routines fetched from an external API with tags, equipment, duration, calorie burn, and ratings.
- 🔍 **Dynamic Workout Details Page (`/workouts/[workoutId]`)**:
  - Two-column layout with high-resolution visual previews.
  - Comprehensive metadata (Equipment, Difficulty, Sets & Reps, Duration, Calories, Rating).
  - Step-by-step workout execution instructions.
  - Interactive **"Add to today's plan"** and **"Save for later"** actions.
- 📋 **Interactive "My Plan" Dashboard (`/my-plan`)**:
  - **Live Metrics Calculation**: Real-time aggregation of total exercises, estimated workout time (min), estimated calorie burn (kcal), and completion progress.
  - **Progress Tracking**: Toggle exercises as "Mark as Done" or "Undo".
  - **Manage Plan**: Easily remove items from today's plan.
  - **Empty State UI**: Clean call-to-action when no workouts are added.
- 🔔 **Toast Notifications**: Interactive floating feedback when items are added or modified.
- 💾 **Persistent State**: State management powered by React Context API and synchronized with `localStorage` so data stays saved across page reloads.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management**: React Context API (`PlanContext`)
- **Icons & UI**: Heroicons / Inline SVG
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Folder Structure

```text
src/
├── app/
│   ├── layout.tsx                # Root layout with PlanProvider
│   ├── page.tsx                  # Home page (Banner + Library)
│   ├── my-plan/
│   │   └── page.tsx              # My Plan dashboard
│   └── workouts/
│       └── [workoutId]/
│           └── page.tsx          # Dynamic workout details page
├── components/
│   ├── ActionButtons.tsx         # Client component for adding workouts
│   ├── homepage/
│   │   ├── Banner.tsx            # Hero banner section
│   │   └── LibraryPage.tsx       # Workout library grid
│   └── share/
│       ├── navbar.tsx            # Navigation header with live counts
│       └── footer.tsx            # Footer component
├── context/
│   └── PlanContext.tsx           # Context provider for Plan & Saved items
└── types/
    └── workout.ts                # TypeScript interfaces for workout data
