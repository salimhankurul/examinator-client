import Head from "next/head";
import { useRef, useState, useEffect } from "react";

import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/exam-join/join-exam-card";
import { getExamsRequest } from "src/api/exam";
import { useAuthContext } from "src/contexts/auth-context";

const dummyExam = {
  courseId: "There Is No Active Exam",
  name: "",
  description: "Please try again later...",
};

const loadingExam = {
  courseId: "Loading...",
  name: "",
  description: "Please wait...",
};

const Page = () => {
  const auth = useAuthContext();
  const ignore = useRef(false);
  const loaded = useRef(false);

  const [exams, setExams] = useState([loadingExam]);

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    async function fetchData() {
      const response = await getExamsRequest({
        accessToken: auth.session.accessToken,
        type: "active",
      });

      if (!response.body || response.body.success === false) {
        console.log(response.body.message);
        return;
      }

      loaded.current = true;

      if (!response.body.exams || response.body.exams.length === 0)
        response.body.exams = [dummyExam];

      setExams(response.body.exams);
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Examinator | List & Join Exams</title>
      </Head>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Card>
            <CardHeader subheader="Please select the exam you want to join" title="Exams" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {exams.map((exam) => (
                  <Grid xs={12} md={6} lg={4} key={exam.examId}>
                    <CompanyCard exam={exam} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
