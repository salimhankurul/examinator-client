import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { CreateExamForm } from "src/sections/exam-create/create-exam-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useAuthContext } from "src/contexts/auth-context";
import React, { useCallback, useState, useEffect } from "react";

const Page = () => {
  const auth = useAuthContext();
  const [meta, setMeta] = useState({
    courseId: "",
    courseName: "",
    examName: "",
    examDescription: "",
    minimumPassingScore: 50,
    duration: 1,
    randomizeQuestions: true,
    randomizeAnswers: true,
    questionCount: 1,
  });

  return (
    <>
      <Head>
        <title>Create Exam</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Create Exam</Typography>
              <CreateExamForm auth={auth} meta={meta} setMeta={setMeta} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
