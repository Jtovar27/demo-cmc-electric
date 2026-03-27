export type Locale = "en" | "es";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface CourseCard {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  price: number;
  level: string;
  duration?: string | null;
  instructor?: string | null;
  featured: boolean;
  moduleCount?: number;
  lessonCount?: number;
}

export interface LessonWithProgress {
  id: string;
  title: string;
  titleEs: string;
  videoUrl?: string | null;
  duration?: string | null;
  order: number;
  visible: boolean;
  completed?: boolean;
  resources: {
    id: string;
    title: string;
    url: string;
    type: string;
  }[];
}

export interface ModuleWithLessons {
  id: string;
  title: string;
  titleEs: string;
  order: number;
  lessons: LessonWithProgress[];
}

export interface CourseWithModules {
  id: string;
  title: string;
  titleEs: string;
  slug: string;
  description: string;
  descriptionEs: string;
  coverImage?: string | null;
  price: number;
  level: string;
  duration?: string | null;
  instructor?: string | null;
  modules: ModuleWithLessons[];
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}

export interface AdminUser {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  createdAt: Date;
  enrollments: number;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    };
  }
}
