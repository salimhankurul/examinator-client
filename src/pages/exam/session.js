import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useExamContext } from "src/contexts/exam-context";
import { useRouter } from 'next/router';

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
  Radio,
  RadioGroup,
  Container,
} from "@mui/material";

const questions = [
  {
    id: 1,
    question: "What is the smallest country in the world?",
    options: [
      { id: 1, text: "Monaco" },
      { id: 2, text: "San Marino" },
      { id: 3, text: "Liechtenstein" },
      { id: 4, text: "Vatican City" },
    ],
    answer: 4,
  },
  {
    id: 2,
    question: "What is the largest continent?",
    options: [
      { id: 1, text: "Asia" },
      { id: 2, text: "Africa" },
      { id: 3, text: "North America" },
      { id: 4, text: "Antarctica" },
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "Who wrote the novel '1984'?",
    options: [
      { id: 1, text: "Ernest Hemingway" },
      { id: 2, text: "George Orwell" },
      { id: 3, text: "F. Scott Fitzgerald" },
      { id: 4, text: "J.D. Salinger" },
    ],
    answer: 2,
  },
  {
    id: 4,
    question: "What is the chemical symbol for iron?",
    options: [
      { id: 1, text: "Ag" },
      { id: 2, text: "Fe" },
      { id: 3, text: "Au" },
      { id: 4, text: "Hg" },
    ],
    answer: 2,
  },
  {
    id: 5,
    question: "What is the highest mountain in the world?",
    options: [
      { id: 1, text: "Mount Everest" },
      { id: 2, text: "K2" },
      { id: 3, text: "Makalu" },
      { id: 4, text: "Cho Oyu" },
    ],
    answer: 1,
  },
  {
    id: 6,
    question: "Who painted the famous work 'The Persistence of Memory'?",
    options: [
      { id: 1, text: "Vincent van Gogh" },
      { id: 2, text: "Pablo Picasso" },
      { id: 3, text: "Salvador Dali" },
      { id: 4, text: "Rembrandt" },
    ],
    answer: 3,
  },
  {
    id: 7,
    question: "What is the capital of Australia?",
    options: [
      { id: 1, text: "Sydney" },
      { id: 2, text: "Melbourne" },
      { id: 3, text: "Brisbane" },
      { id: 4, text: "Canberra" },
    ],
    answer: 4,
  },
  {
    id: 8,
    question: "What is the largest organ in the human body?",
    options: [
      { id: 1, text: "Heart" },
      { id: 2, text: "Liver" },
      { id: 3, text: "Skin" },
      { id: 4, text: "Brain" },
    ],
    answer: 3,
  },
  {
    question: "What is the capital of Turkey?",
    options: [
      { id: 1, text: "Ankara" },
      { id: 2, text: "Istanbul" },
      { id: 3, text: "Izmir" },
      { id: 4, text: "Bursa" },
    ],
    answer: 1,
  },
  {
    id: 10,
    question: "Which planet in our solar system has the most moons?",
    options: [
      { id: 1, text: "Jupiter" },
      { id: 2, text: "Saturn" },
      { id: 3, text: "Neptune" },
      { id: 4, text: "Uranus" },
    ],
    answer: 1,
  },
  {
    id: 11,
    question: "Who directed the movie 'Forrest Gump'?",
    options: [
      { id: 1, text: "Steven Spielberg" },
      { id: 2, text: "Quentin Tarantino" },
      { id: 3, text: "Robert Zemeckis" },
      { id: 4, text: "Christopher Nolan" },
    ],
    answer: 3,
  },
  {
    id: 12,
    question: "What is the currency of Switzerland?",
    options: [
      { id: 1, text: "Dollar" },
      { id: 2, text: "Euro" },
      { id: 3, text: "Franc" },
      { id: 4, text: "Pound" },
    ],
    answer: 3,
  },
  {
    id: 13,
    question: "What is the largest animal in the world?",
    options: [
      { id: 1, text: "Elephant" },
      { id: 2, text: "Giraffe" },
      { id: 3, text: "Whale" },
      { id: 4, text: "Hippopotamus" },
    ],
    answer: 3,
  },
  {
    id: 14,
    question: "What is the chemical symbol for sodium?",
    options: [
      { id: 1, text: "Na" },
      { id: 2, text: "Ne" },
      { id: 3, text: "Ni" },
      { id: 4, text: "Nb" },
    ],
    answer: 1,
  },
  {
    id: 15,
    question: "Who invented the telephone?",
    options: [
      { id: 1, text: "Thomas Edison" },
      { id: 2, text: "Alexander Graham Bell" },
      { id: 3, text: "Nikola Tesla" },
      { id: 4, text: "Guglielmo Marconi" },
    ],
    answer: 2,
  },
  {
    id: 16,
    question: "What is the highest waterfall in the world?",
    options: [
      { id: 1, text: "Niagara Falls" },
      { id: 2, text: "Angel Falls" },
      { id: 3, text: "Iguazu Falls" },
      { id: 4, text: "Victoria Falls" },
    ],
    answer: 2,
  },
];

const Page = () => {
  const router = useRouter();

  const { exam } = useExamContext();

  const [answers, setAnswers] = useState({}); // initialize answers object as an empty object

  const [page, setPage] = useState(1); // initialize page number to 1

  const startIndex = (page - 1) * 1;
  const endIndex = startIndex + 1;

  useEffect(
    () => {
      if (!exam) {
        router.push('/exams');
      }
    },
    [exam]
  );

  const handleSubmit = () => {
    // TODO: implement exam submission logic
  };

  const handleAnswerChange = (questionId, optionId) => {
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
            {startIndex + index + 1}. {question.question}
          </Typography>
          <RadioGroup
            aria-label={`Question ${question.id}`}
            name={`question-${question.id}`}
            value={getAnswerForQuestion(question.id)}
            onChange={(event) => handleAnswerChange(question.id, event.target.value)}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item xs={2} style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <Typography variant="h6" gutterBottom style={{ color: "red", fontFamily: 'Monaco' }}>
            Saved
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const getPageNumbers = () => {
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
        Exam
      </Typography>
      <Card variant="outlined">
        <CardHeader subheader={exam.courseId} title={exam.examName} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {questions.slice(startIndex, endIndex).map((q, index) => renderQuestion(q, index))}
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
                <div>{getPageNumbers().map(renderPageNumber)}</div>
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
