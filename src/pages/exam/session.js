import Head from "next/head";
import { useCallback, useState, useEffect, useRef } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { useAuthContext } from "src/contexts/auth-context";
import { joinExamRequest, submitExamRequest } from "src/api/exam";

import dayjs from "dayjs";
import queryString from "query-string";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
  Slider,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  Radio,
  RadioGroup,
  Container,
} from "@mui/material";

const Page = () => {
  const [page, setPage] = useState(1); // initialize page number to 1

  const startIndex = (page - 1) * 1;
  const endIndex = startIndex + 1;

  const auth = useAuthContext();
  const ignore = useRef(false);
  const loaded = useRef(false);

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]); // exam questions
  const [answers, setAnswers] = useState({}); // initialize answers object as an empty object
  const [token, setToken] = useState(""); // exam-session token

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    async function fetchData() {
      const params = queryString.parse(document.location.search);

      if (!params.examId) throw new Error("Exam ID is missing");

      const response = await joinExamRequest({
        accessToken: auth.session.accessToken,
        examId: params.examId,
      });

      if (!response.body || response.body.success === false) {
        throw new Error(response.body?.message || "Failed to join exam");
      }

      setQuestions(response.body.examQuestions);
      setToken(response.body.token);
      setExam(response.body.exam);

      if (response.body.userAnswers) {
        setAnswers(response.body.userAnswers)
      }

      loaded.current = true;
    }

    fetchData();
  }, [setQuestions, setToken, setExam, setAnswers]);

  const handleSubmit = () => {
    // TODO: implement exam submission logic
  };

  const handleAnswerChange = (questionId, optionId) => {
    async function submit() {
      const response = await submitExamRequest({
        accessToken: auth.session.accessToken,
        examToken: token,
        questionId,
        optionId,
      });

      if (!response.body || response.body.success === false) {
        throw new Error(response.body?.message || "Failed to join exam");
      }
    }

    submit()

    setAnswers({ ...answers, [questionId]: optionId }); // update the answers object with the new answer for the specified question
  };

  const getAnswerForQuestion = (questionId) => {
    return answers[questionId] || null;
  };

  const renderQuestion = (question, index) => {
    return (
      <Grid container xs={12}>
        <Grid item xs={10} key={startIndex + index}>
          <Typography variant="h6" gutterBottom>
            {startIndex + index + 1}. {question.questionText}
          </Typography>
          <RadioGroup
            aria-label={`Question ${question.questionId}`}
            name={`question-${question.questionId}`}
            value={getAnswerForQuestion(question.questionId)}
            onChange={(event) => handleAnswerChange(question.questionId, event.target.value)}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.optionId}
                value={option.optionId}
                control={<Radio />}
                label={option.optionText}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
        </Grid>
      </Grid>
    );
  };

  const getPageNumbers = () => {
    if (!questions) return [1];
    if (questions.length === 0) return [1];

    const pageCount = Math.ceil(questions.length);
    const pageNumbers = [];

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const renderPageNumber = (number) => {
    return (
      <Button
        sx={{
          margin: "5px 5px",
        }}
        key={number}
        variant={number === page ? "contained" : "outlined"}
        onClick={() => setPage(number)}
      >
        {number}
      </Button>
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {exam?.name || ""}
      </Typography>
      <Card variant="outlined">
        <CardHeader subheader={exam?.courseId || ""} title={exam?.courseName || "..."} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {loaded.current && questions ? (
              questions.slice(startIndex, endIndex).map((q, index) => renderQuestion(q, index))
            ) : (
              <Typography variant="h6" align="center" gutterBottom>
                {" "}
                Loading...{" "}
              </Typography>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container md={12} sm={12} xs={12} wrap="wrap">
            <Grid item md={10} sm={10} xs={10}>
              <Stack
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div>{getPageNumbers().map((i) => renderPageNumber(i))} </div>
              </Stack>
            </Grid>

            <Grid item md={2} sm={2} xs={2}>
              <Stack
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                  Finish
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
