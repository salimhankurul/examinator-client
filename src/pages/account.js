import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { SettingsPassword } from "src/sections/account/settings-password";
import { useAuthContext } from "src/contexts/auth-context";

const Page = () => {
  const auth = useAuthContext();

  return (
    <>
      <Head>
        <title>
          {auth.user.firstName} {auth.user.lastName} | Account
        </title>
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
            <Typography variant="h4">Account</Typography>

            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile auth={auth} />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <SettingsPassword />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
