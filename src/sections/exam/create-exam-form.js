import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
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
  FormControl,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateCalendar } from "@mui/x-date-pickers";
import { TimeClock } from "@mui/x-date-pickers";

import { loremIpsum } from "lorem-ipsum";

import { createExamRequest } from "src/api/exam";

import { courses } from "src/layouts/dashboard/config";
import { useNotificationContext } from "src/contexts/notification-context";

export const CreateExamForm = ({ auth, meta, setMeta, SetCreated }) => {
  const { showNotify, setNotifyText } = useNotificationContext();

  // *** pagination size ***
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setPageWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPaginationSize = () => {
    if (pageWidth > 960) {
      return "large";
    } else if (pageWidth > 600) {
      return "medium";
    } else {
      return "small";
    }
  };

  // *** form ***

  // javascript sleep function
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState({});

  const [startDate, setStartDate] = useState(dayjs().minute(0).second(0).millisecond(0));

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      console.log(auth);
      console.dir(questions, { depth: null });

      const accessToken = auth.session.accessToken;

      const examQuestions = Object.values(questions).map((question) => {
        const questionText = question.question;
        const options = [];

        for (const [key, value] of Object.entries(question.options)) {
          options.push({
            optionText: value,
            isCorrect: key === question.correctOption,
          });
        }

        return {
          questionText,
          options,
        };
      });

      const body = {
        name: meta.examName,
        description: meta.examDescription,
        examQuestions,
        courseName: meta.courseName,
        courseId: meta.courseId,
        minimumPassingScore: meta.minimumPassingScore,
        startDate: startDate.unix() * 1000,
        duration: parseInt(meta.duration),
        isOptionsRandomized: meta.randomizeAnswers,
        isQuestionsRandomized: meta.randomizeQuestions,
      };

      console.log("request body:");
      console.dir({ body, accessToken }, { depth: null });

      const request = await createExamRequest({ body, accessToken });

      if (request.success === false) {
        throw new Error(request.error.message);
      }

      setNotifyText("Exam created !"); 
      showNotify(true)

      console.log(request.data);

      await sleep(2000)

      SetCreated(true)
    },
    [meta, questions, startDate, auth, setNotifyText, showNotify]
  );

  const handleChange = useCallback(
    (event) => {
      setMeta((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [setMeta]
  );

  const handleChecked = useCallback(
    (event) => {
      setMeta((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    },
    [setMeta]
  );

  const handleQuestionCount = useCallback(
    (event) => {
      const count = event.target.value;

      if (count < 0) event.target.value = 0;
      else if (count > 100) event.target.value = 100;

      handleChange(event);
    },
    [handleChange]
  );

  const handleExamDuration = useCallback(
    (event) => {
      const count = event.target.value;

      if (count < 0) event.target.value = 0;
      else if (count > 120) event.target.value = 120;

      handleChange(event);
    },
    [handleChange]
  );

  const handleQuestionChange = useCallback(
    (event) => {
      let question = questions[currentQuestion];
      if (!question) {
        question = {
          question: "",
          correctOption: "A",
          options: {
            A: "",
            B: "",
            C: "",
            D: "",
          },
        };
      }

      if (event.target.name === "question") {
        question.question = event.target.value;
      } else if (event.target.name === "correctOption") {
        question.correctOption = event.target.value;
      } else {
        question.options[event.target.name] = event.target.value;
      }
      setQuestions((prevState) => ({
        ...prevState,
        [currentQuestion]: question,
      }));
      console.log(currentQuestion);
      console.log(questions);
    },
    [setQuestions, questions, currentQuestion]
  );

  const handleRandomFill = (event) => {
    const random = {
      question: loremIpsum({ count: 3, units: "sentences" }),
      correctOption: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
      options: {
        A: loremIpsum({ count: 1, units: "sentences" }),
        B: loremIpsum({ count: 1, units: "sentences" }),
        C: loremIpsum({ count: 1, units: "sentences" }),
        D: loremIpsum({ count: 1, units: "sentences" }),
      },
    };
    console.log(random);
    console.log(currentQuestion);

    questions[currentQuestion] = random;
    setQuestions(JSON.parse(JSON.stringify(questions)));
  };

  const handleCourseSelection = (event) => {
    console.log(event.target);
    console.log(event.target.name);
    console.log(event.target.value);
    const courseName = courses.find((course) => course.id === event.target.value).name;
    handleChange({ target: { name: "courseName", value: courseName } });
    handleChange({ target: { name: "courseId", value: event.target.value } });

    handleChange({ target: { name: "examName", value: courseName + " Final" } });
    handleChange({
      target: { name: "examDescription", value: "Description of " + courseName + " Final" },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Please fill in following fields" title="Exam Details" />
          <Divider />
          <CardContent>
            <Grid container spacing={6} wrap="wrap">
              <Grid item md={4} sm={6} xs={12}>
                <Stack spacing={1}>
                  <Typography variant="h6">Information</Typography>
                  <Stack
                    style={{
                      rowGap: 10,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                      <Select
                        label="Select Course"
                        name="selectCourse"
                        onChange={handleCourseSelection}
                        variant="outlined"
                      >
                        {courses.map((course) => (
                          <MenuItem value={course.id}>{course.id + "  " + course.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Course ID"
                      name="courseId"
                      onChange={handleChange}
                      value={meta.courseId}
                    />
                    <TextField
                      spacing={1}
                      label="Course Name"
                      name="courseName"
                      onChange={handleChange}
                      value={meta.courseName}
                    />
                    <TextField
                      spacing={1}
                      label="Exam Name"
                      name="examName"
                      onChange={handleChange}
                      value={meta.examName}
                    />
                    <TextField
                      spacing={1}
                      label="Exam Description"
                      name="examDescription"
                      onChange={handleChange}
                      value={meta.examDescription}
                    />
                    <Typography variant="h6">Metadata</Typography>
                    <TextField
                      spacing={1}
                      label="Question Count"
                      name="questionCount"
                      type="number"
                      onChange={handleQuestionCount}
                      value={meta.questionCount}
                    />

                    <TextField
                      spacing={1}
                      label="Exam Duration (minutes)"
                      name="duration"
                      type="number"
                      onChange={handleExamDuration}
                      value={meta.duration}
                    />
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <Stack spacing={1}>
                  <Stack
                    style={{
                      rowGap: 15,
                    }}
                  >
                    <Typography variant="h6">Details</Typography>

                    <Box>
                      <Stack
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10%",
                        }}
                      >
                        <Typography variant="h6">Minimum Passing Score</Typography>
                        <Typography variant="h6">{meta.minimumPassingScore}%</Typography>
                      </Stack>
                      <Slider
                        aria-label="Small steps"
                        defaultValue={85}
                        step={5}
                        marks
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                        name="minimumPassingScore"
                        onChange={handleChange}
                        value={meta.minimumPassingScore}
                      />
                    </Box>
                    <Typography variant="h6">Randominization</Typography>

                    <FormControlLabel
                      label="Questions"
                      control={
                        <Checkbox
                          name="randomizeQuestions"
                          checked={meta.randomizeQuestions}
                          onChange={handleChecked}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Answers"
                      control={
                        <Checkbox
                          name="randomizeAnswers"
                          checked={meta.randomizeAnswers}
                          onChange={handleChecked}
                        />
                      }
                    />

                    <Stack
                      style={{
                        marginTop: "10%",
                        rowGap: 15,
                      }}
                    >
                      <Typography variant="h6">Starts</Typography>
                      <div>
                        {startDate.format("DD/MM/YYYY").toLocaleString()}{" "}
                        {startDate.format("HH:mm").toLocaleString()}
                      </div>
                      <Typography variant="h6">Ends</Typography>
                      <div>
                        {startDate
                          .add(meta.duration, "minutes")
                          .format("DD/MM/YYYY")
                          .toLocaleString()}{" "}
                        {startDate.add(meta.duration, "minutes").format("HH:mm").toLocaleString()}
                      </div>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <Stack spacing={1}>
                  <Stack
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Typography variant="h6">Date & Time</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={startDate}
                        disablePast={true}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimeClock
                        ampm={false}
                        value={startDate}
                        disablePast={true}
                        minutesStep={1}
                        onChange={(newValue) => setStartDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Stack>
              </Grid>

              <CardHeader subheader="Please fill following fields" title="Fill Questions" />
              <Divider
                style={{
                  width: "95%",
                  borderWidth: 0,
                  borderStyle: "solid",
                  borderColor: "#F2F4F7",
                  borderBottomWidth: 3,
                  marginLeft: "1rem",
                }}
              />

              <Grid container item md={12} sm={12} xs={12}>
                <Grid xs={10}>
                  <Stack spacing={3}>
                    <Typography variant="h6">Question #{currentQuestion}</Typography>
                    <TextField
                      label="Question"
                      name="question"
                      multiline
                      rows={4}
                      variant="filled"
                      onChange={handleQuestionChange}
                      value={questions[currentQuestion] ? questions[currentQuestion].question : ""}
                    />
                  </Stack>
                </Grid>
                <Grid xs={2}>
                  <Stack
                    spacing={3}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">Correct Option</InputLabel>
                    <Select
                      value={
                        questions[currentQuestion] ? questions[currentQuestion].correctOption : "A"
                      }
                      label="Correct Option"
                      name="correctOption"
                      onChange={handleQuestionChange}
                      style={{
                        marginTop: 60,
                      }}
                    >
                      <MenuItem value={"A"}>A</MenuItem>
                      <MenuItem value={"B"}>B</MenuItem>
                      <MenuItem value={"C"}>C</MenuItem>
                      <MenuItem value={"D"}>D</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <Stack>
                  <TextField
                    fullWidth
                    label="Option A"
                    name="A"
                    variant="filled"
                    onChange={handleQuestionChange}
                    value={questions[currentQuestion] ? questions[currentQuestion].options.A : ""}
                  />
                </Stack>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <Stack>
                  <TextField
                    fullWidth
                    label="Option B"
                    name="B"
                    variant="filled"
                    onChange={handleQuestionChange}
                    value={questions[currentQuestion] ? questions[currentQuestion].options.B : ""}
                  />
                </Stack>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <Stack>
                  <TextField
                    fullWidth
                    label="Option C"
                    name="C"
                    variant="filled"
                    value={questions[currentQuestion] ? questions[currentQuestion].options.C : ""}
                    onChange={handleQuestionChange}
                  />
                </Stack>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <Stack>
                  <TextField
                    fullWidth
                    label="Option D"
                    name="D"
                    variant="filled"
                    value={questions[currentQuestion] ? questions[currentQuestion].options.D : ""}
                    onChange={handleQuestionChange}
                  />
                </Stack>
              </Grid>

              <Grid item md={12} sm={12} xs={12} direction="row">
                <Stack
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleRandomFill}
                    style={{ marginRight: "85%" }}
                  >
                    Random Fill
                  </Button>
                </Stack>
                <Stack
                  spacing={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Select Question</Typography>

                  <Pagination
                    size={getPaginationSize()}
                    showFirstButton
                    showLastButton
                    color="primary"
                    count={parseInt(meta.questionCount)}
                    page={currentQuestion}
                    onChange={(e, v) => setCurrentQuestion(v)}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              CREATE EXAM
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
