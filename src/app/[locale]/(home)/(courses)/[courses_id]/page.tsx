"use client";

import { useParams } from "next/navigation";

import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";

import { useGetCourseById } from "~/hooks";

const CourseDetail = () => {
  const { courses_id } = useParams();
  const { data: course, loading, error } = useGetCourseById(courses_id as string);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" fontWeight={600}>
          Lỗi khi tải khóa học
        </Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" fontWeight={600}>
          Không tìm thấy khóa học
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} px={2}>
      <Card sx={{ width: "100%", maxWidth: 800 }}>
        {course.image && (
          <img
            src={course.image}
            alt={course.name}
            width="100%"
            height="auto"
            style={{ objectFit: "cover", maxHeight: 400, borderRadius: 8 }}
          />
        )}
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h1" gutterBottom fontWeight={700}>
              {course.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" textAlign={"justify"} fontWeight={400}>
              {course.description || "No description available."}
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight={600}>
              <strong>Mã khoá học:</strong> {course.course_code}
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight={600}>
              <strong>Năm học:</strong> {course.year}
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight={600}>
              <strong>Số chỉ:</strong> {course.credit}
            </Typography>
            {course.term && (
              <Typography variant="body1" color="text.primary" fontWeight={600}>
                <strong>Học kì:</strong> {course.term}
              </Typography>
            )}
          </Stack>
        </CardContent>
        <Box
          p={2}
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button color="success" variant="contained" size="large" sx={{ width: "50%" }}>
            Đăng ký ngay
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CourseDetail;
