import Head from "next/head";
import { useCallback, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const [questionCount, setQuestionCount] = useState(50);

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
            <SettingsNotifications
              setQuestionCount={setQuestionCount}
              questionCount={questionCount}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
