import { useState, useEffect, useRef } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { useAuthContext } from "src/contexts/auth-context";
import { useNotificationContext } from "src/contexts/notification-context";
import { joinExamRequest, submitExamRequest } from "src/api/exam";
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

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Page = () => {
  const { showNotify, setNotifyText, setSeverity, setAutoHideDuration } = useNotificationContext();
  const auth = useAuthContext();
  const router = useRouter();

  const ignore = useRef(false);

  const [page, setPage] = useState(-1);
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
        // setAutoHideDuration(2500)
        // setSeverity('error')
        // setNotifyText(response.body.message);
        // showNotify(true)
        // router.push("/exam-session/list");
        throw new Error(response.body?.message || "Failed to join exam");
      }

      setQuestions(response.body.examQuestions);
      setToken(response.body.token);
      setExam(response.body.exam);

      if (response.body.userAnswers) {
        setAnswers(response.body.userAnswers);
      }

      setPage(1);
    }

    fetchData();
  }, [setQuestions, setToken, setExam, setAnswers]);

  const handleSubmit = () => {
    setNotifyText("Finished Exam !");
    showNotify(true);
    router.push("/");
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

      setAnswers({ ...answers, [questionId]: optionId }); // update the answers object with the new answer for the specified question
      setNotifyText("Answer submitted !");
      showNotify(true);
    }

    submit();
  };

  const renderQuestionCard = () => {
    if (!questions || questions.length === 0 || page === -1) {
      return (
        <Typography variant="h6" align="center" gutterBottom>
          {" "}
          ...{" "}
        </Typography>
      );
    }

    const currQuestion = page - 1;
    const question = questions[currQuestion];

    if (question === undefined) {
      throw new Error(`Question ${currQuestion} is undefined`);
    }

    return (
      <>
        <Grid container xs={12}>
          <Grid item xs={10} key={page}>
            <Typography variant="h6" gutterBottom>
              {page}. {question.questionText}
            </Typography>
            <RadioGroup
              aria-label={`Question ${question.questionId}`}
              name={`question-${question.questionId}`}
              value={answers[question.questionId] || null}
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
        </Grid>
      </>
    );
  };

  const isPageAnswered = (pageNumber) => {
    if (!questions || questions.length === 0 || page === -1) {
      return false;
    }
    const pageQuestion = questions[pageNumber - 1];
    const isAnswered = Object.keys(answers).includes(pageQuestion.questionId);
    return isAnswered;
  };

  const getPageButtons = (pages) => {
    return pages.map((pageNumber) => {
      const isAnswered = isPageAnswered(pageNumber);
      return (
        <Button
          sx={{
            margin: "5px 5px",
          }}
          key={pageNumber}
          variant={isAnswered ? "contained" : "outlined"}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      );
    });
  };

  const renderQuestionPages = () => {
    if (!questions || questions.length === 0 || page === -1) {
      return getPageButtons([1]);
    }

    const pageNumbers = [];

    for (let i = 1; i <= questions.length; i++) {
      pageNumbers.push(i);
    }

    return getPageButtons(pageNumbers);
  };

  const getRemainingTime = (exam) => (exam.endDate - Date.now()) / 1000;

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setNotifyText("Exam Time Finished !");
      showNotify(true);
      router.push("/");
      return
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">
          {minutes}:{seconds}
        </div>
      </div>
    );
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          {exam?.name || ""}
        </Typography>
        <Card variant="outlined">
          <CardHeader subheader={exam?.courseId || ""} title={exam?.courseName || ""} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {renderQuestionCard()}
                {exam.endDate && (
                  <CountdownCircleTimer
                    isPlaying
                    duration={getRemainingTime(exam)}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                )}
              </Grid>
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
                  <div>{renderQuestionPages()} </div>
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
