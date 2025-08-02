import { ResponseData } from "~/types";

import { Course, CourseInput } from "~/types/courses";

import { getApi } from "~/utils/api-selector";

export const coursesApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    getCourses: (params?: { search?: string }) => api.get<ResponseData<Course[]>>("/courses", { params }),

    getCourse: (id: string) => api.get<ResponseData<Course>>(`/courses/${id}`),

    createCourse: (course: Partial<CourseInput>) => api.post<ResponseData<Course>>("/courses", course),

    updateCourse: (id: string, course: Partial<CourseInput>) => api.put<ResponseData<Course>>(`/courses/${id}`, course),

    deleteCourse: (id: string) => api.delete<ResponseData<null>>(`/courses/${id}`)
  };
};
