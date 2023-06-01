import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Head from "next/head";
import queryString from "query-string";
import dayjs from "dayjs";

import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OneExamResult } from "src/sections/exam-results/one-results-table";
import { getExamResultRequest } from "src/api/exam";
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

  const [exam, setExam] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    async function fetchData() {
      const params = queryString.parse(document.location.search);

      if (!params.examId) throw new Error("Exam ID is missing");

      const response = await getExamResultRequest({ accessToken: auth.session.accessToken, examId: params.examId });

      if (!response.body || response.body.success === false) {
        console.log(response.body.message);
        return;
      }

      loaded.current = true;
      setExam(response.body.exam);
      setResults(response.body.results);
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Examinator | Exam Result</title>
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
                <Typography variant="h6">{exam.examId}</Typography>
                <Typography variant="h4">{exam.courseId} : {exam.courseName} </Typography>           
              </Stack>    
            </Stack>
            
            <OneExamResult
              count={results.length}
              items={results}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />

          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
