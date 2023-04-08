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
import { CompanyCard } from "src/sections/exam/join-exam-card";
import { CompaniesSearch } from "src/sections/exam/join-exam-search";
import { getExamsRequest } from "src/api/exam";
import { useAuthContext } from "src/contexts/auth-context";
import SyncIcon from "@mui/icons-material/Sync";
const Page = () => {
  const auth = useAuthContext();
  const ignore = useRef(false);
  const loaded = useRef(false);

  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    async function fetchData() {
      const response = await getExamsRequest({ accessToken: auth.session.accessToken });

      if (!response.body || response.body.success === false) {
        console.log(response.body.message);
        return;
      }

      loaded.current = true;
      setExams(response.body.exams);
    }

    fetchData();
  }, []);

  const unloadedContent = () => {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
            <Stack
              spacing={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SvgIcon sx={{ fontSize: 300 }}>
                <SyncIcon />
              </SvgIcon>
              <Typography variant="h6" sx={{ fontSize: 60, color: "black" }}>
                LOADING EXAMS
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  };

  const loadedContent = () => {
    return (
      <>
        <Grid container spacing={3}>
          {exams.map((exam) => (
            <Grid xs={12} md={6} lg={4} key={exam.examId}>
              <CompanyCard exam={exam} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Examinator | Join Exams</title>
      </Head>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Card>
              <CardHeader subheader="Please select the exam you want to join" title="Exams" />
              <Divider />
              <CardContent>{loaded.current ? loadedContent() : unloadedContent()}</CardContent>
            </Card>
          </Stack>
        </Container>

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
