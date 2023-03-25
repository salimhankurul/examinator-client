import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { CreateExamForm } from "src/sections/exam/create-exam-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
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
            <CreateExamForm/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
