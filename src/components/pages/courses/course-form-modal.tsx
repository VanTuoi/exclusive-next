import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateCourse, useDeleteCourse, useUpdateCourse } from "~/hooks/use-courses";

import { Course } from "~/types/courses";

export const CourseFormModal = ({
  open,
  onClose,
  course
}: {
  open: boolean;
  onClose: () => void;
  course?: Course | null;
}) => {
  const courseSchema = z.object({
    name: z.string().min(1, "Tên khoá học không được để trống").max(100, "Tên khoá học không quá 100 ký tự"),
    course_code: z.string().min(1, "Mã khoá học không được để trống").max(20, "Mã khoá học không quá 20 ký tự"),
    image: z.string().url("Ảnh phải là một URL hợp lệ").optional().or(z.literal("")),
    description: z.string().max(500, "Mô tả không quá 500 ký tự").optional(),
    year: z.number().min(2000, "Năm phải từ 2000 trở đi").max(2100, "Năm không vượt quá 2100"),
    term: z.enum(["Spring", "Summer", "Fall", "Winter"]).or(z.string().optional()),
    credit: z.number().min(1, "Tối thiểu 1 tín chỉ").max(10, "Tối đa 10 tín chỉ")
  });

  type CourseInput = z.infer<typeof courseSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "1",
      course_code: "1",
      image: "1",
      description: "1",
      year: new Date().getFullYear(),
      term: "Spring",
      credit: 1
    }
  });

  useEffect(() => {
    if (course) {
      const { ...courseData } = course;
      reset({
        ...courseData,
        term: courseData.term || "Spring",
        credit: courseData.credit || 1
      });
    } else {
      reset({
        name: "",
        course_code: "",
        image: "",
        description: "",
        year: new Date().getFullYear(),
        term: "Spring",
        credit: 1
      });
    }
  }, [course, reset]);

  const { createCourse, loading: loadingCreate } = useCreateCourse(onClose);
  const { updateCourse, loading: loadingUpdate } = useUpdateCourse(onClose);
  const { deleteCourse, loading: loadingDelete } = useDeleteCourse(onClose);

  const onSubmit = handleSubmit((data: CourseInput) => {
    if (course) {
      updateCourse({
        id: course.id,
        courseData: data
      });
    } else {
      createCourse(data);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{course ? "Cập nhật khoá học" : "Thêm khoá học mới"}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Tên khoá học"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Mã khoá học"
              fullWidth
              {...register("course_code")}
              error={!!errors.course_code}
              helperText={errors.course_code?.message}
            />

            <TextField
              label="Ảnh (URL)"
              fullWidth
              {...register("image")}
              error={!!errors.image}
              helperText={errors.image?.message}
            />

            <TextField
              size="medium"
              label="Mô tả"
              fullWidth
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Năm"
              type="number"
              fullWidth
              {...register("year", { valueAsNumber: true })}
              error={!!errors.year}
              helperText={errors.year?.message}
            />

            <TextField
              label="Học kỳ"
              fullWidth
              {...register("term")}
              error={!!errors.term}
              helperText={errors.term?.message}
            />

            <TextField
              label="Tín chỉ"
              type="number"
              fullWidth
              {...register("credit", { valueAsNumber: true })}
              error={!!errors.credit}
              helperText={errors.credit?.message}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={onClose} color="error">
                Hủy
              </Button>

              {course && (
                <Button
                  onClick={() => deleteCourse(course)}
                  disabled={loadingDelete}
                  loading={loadingDelete}
                  color="error"
                  variant="outlined"
                >
                  Xoá
                </Button>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || loadingCreate || loadingUpdate}
                loading={isSubmitting || loadingCreate || loadingUpdate}
              >
                {course ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
