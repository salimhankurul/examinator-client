import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MyExams } from "src/sections/exam-my/list";
import { useAuthContext } from "src/contexts/auth-context";

const Page = () => {
  const auth = useAuthContext();

  return (
    <>
      <Head>
        <title>Examinator | My Exam Results</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Typography align="center" gutterBottom variant="h5">
              {auth.user.firstName || ""} {auth.user.lastName || ""} | Account
            </Typography>
            <Grid xs={12} md={12} lg={12}>
              {auth?.user?.exams && <MyExams exams={Object.values(auth.user.exams)} sx={{ height: "100%" }} />}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
