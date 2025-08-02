export interface Course {
  id: string;
  image?: string;
  course_code: string;
  name: string;
  description?: string;
  year: number;
  term?: string;
  credit: number;
  created_at: string;
  updated_at?: string;
}

export type CourseInput = Omit<Course, "id" | "created_at" | "updated_at">;
