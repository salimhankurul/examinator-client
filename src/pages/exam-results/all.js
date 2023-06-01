import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/exam-results/all-results-table";
import { applyPagination } from "src/utils/apply-pagination";
import { getExamsRequest } from "src/api/exam";
import { useAuthContext } from "src/contexts/auth-context";

const Page = () => {
  const auth = useAuthContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


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
      const response = await getExamsRequest({ accessToken: auth.session.accessToken, type: 'finished' });

      if (!response.body || response.body.success === false) {
        console.log(response.body.message);
        return;
      }

      loaded.current = true;
      setExams(response.body.exams);
    }

    fetchData();
  }, []);


  return (
    <>
      <Head>
        <title>Examinator | Exams Results</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
              <Typography variant="h6">{ loaded.current && `Found ${exams.length} Results`}</Typography>

                <Typography variant="h4">{ loaded.current ? `Finished Exams` : 'Loading, Please Wait...'}</Typography>
              </Stack>
        
            </Stack>
            <CustomersTable
              count={exams.length}
              items={exams}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
