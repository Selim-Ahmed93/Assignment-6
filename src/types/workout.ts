export interface WorkoutItem {
  id: string | number;
  title?: string;
  image?: string;
  tags?: string[];
  equipment?: string;
  time?: string;
  calories?: string;
  rating?: number | string;
}