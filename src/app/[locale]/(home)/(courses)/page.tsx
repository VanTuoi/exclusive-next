"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent, CardMedia, Grid, Skeleton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { useGetCourses } from "~/hooks/use-courses";

const CoursePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: courses = [], loading } = useGetCourses({ search: searchTerm });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} py={2}>
        <Typography sx={{ color: theme.palette.success[800], mb: 3 }} variant="h4">
          Danh sách khoá học
        </Typography>
        <TextField
          size="small"
          label="Tìm kiếm khoá học"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên hoặc mã khoá học..."
          sx={{
            width: "450px",
            mb: 0,
            "& .MuiInputBase-root": {
              fontSize: "1.1rem",
              fontWeight: 500,
              borderRadius: "20px"
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.05rem",
              fontWeight: 500
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: "2px"
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1rem",
              fontWeight: 500,
              opacity: 0.3
            }
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        {loading ? (
          <SkeletonLoader />
        ) : courses.length === 0 ? (
          <Grid size={12}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Không tìm thấy khoá học nào.
            </Typography>
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid key={course.id} size={3}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: theme.palette.grey[100],
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 2
                  }
                }}
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={course.image || "/assets/img/not-found.jpg"}
                  alt={course.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {course.description}
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    Mã: {course.course_code} – {course.term} {course.year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default CoursePage;

const SkeletonLoader = () => {
  const theme = useTheme();
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid key={index} size={3}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid",
              borderColor: theme.palette.grey[50],
              borderRadius: 3
            }}
          >
            <Skeleton variant="rectangular" height={160} />
            <CardContent>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};
