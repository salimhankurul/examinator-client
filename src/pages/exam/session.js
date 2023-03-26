import Head from "next/head";
import { useCallback, useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useExamContext } from "src/contexts/exam-context";

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
    question: "What is the capital of Italy?",
    options: ["Rome", "Paris", "Madrid", "Berlin"],
    answer: "Rome",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the tallest mammal?",
    options: ["Elephant", "Giraffe", "Horse", "Camel"],
    answer: "Giraffe",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    answer: "Vatican City",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    answer: "Skin",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Dollar", "Euro", "Yen", "Pound"],
    answer: "Yen",
  },
  {
    question: "Which planet in our solar system is the hottest?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: "Venus",
  },
  {
    question: 'Who wrote the novel "To Kill a Mockingbird"?',
    options: ["Harper Lee", "J.D. Salinger", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Hg"],
    answer: "Au",
  },
  {
    question: 'Who directed the movie "The Shawshank Redemption"?',
    options: ["Steven Spielberg", "Martin Scorsese", "Quentin Tarantino", "Frank Darabont"],
    answer: "Frank Darabont",
  },
  {
    question: "What is the capital of Italy?",
    options: ["Rome", "Paris", "Madrid", "Berlin"],
    answer: "Rome",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the tallest mammal?",
    options: ["Elephant", "Giraffe", "Horse", "Camel"],
    answer: "Giraffe",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    answer: "Vatican City",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    answer: "Skin",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Dollar", "Euro", "Yen", "Pound"],
    answer: "Yen",
  },
  {
    question: "Which planet in our solar system is the hottest?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: "Venus",
  },
  {
    question: 'Who wrote the novel "To Kill a Mockingbird"?',
    options: ["Harper Lee", "J.D. Salinger", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Hg"],
    answer: "Au",
  },
  {
    question: 'Who directed the movie "The Shawshank Redemption"?',
    options: ["Steven Spielberg", "Martin Scorsese", "Quentin Tarantino", "Frank Darabont"],
    answer: "Frank Darabont",
  },
];

const Page = () => {
  const { exam } = useExamContext();

  const [answers, setAnswers] = useState(Array(10).fill(null)); // initialize answers array with nulls
  const [page, setPage] = useState(1); // initialize page number to 1

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

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers]; // create a copy of the answers array
    newAnswers[index] = value; // update the answer at the specified index
    setAnswers(newAnswers); // set the updated answers array as the new state
  };

  const handleSubmit = () => {
    // TODO: implement exam submission logic
  };

  const handlePageChange = (event, value) => {
    setPage(value); // update the page number when the user clicks on a pagination button
  };

  // calculate the index range for the current page
  const startIndex = (page - 1) * 1;
  const endIndex = startIndex + 1;

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
            {questions.slice(startIndex, endIndex).map((q, index) => (
              <Grid item xs={12} key={startIndex + index}>
                <Typography variant="h6" gutterBottom>
                  {startIndex + index + 1}. {q.question}
                </Typography>
                <RadioGroup
                  aria-label={`Question ${startIndex + index + 1}`}
                  name={`question-${startIndex + index + 1}`}
                  value={answers[startIndex + index]}
                  onChange={(event) => handleAnswerChange(startIndex + index, event.target.value)}
                >
                  {q.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            ))}
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
                {/* <Pagination
                  size={getPaginationSize()}
                  count={Math.ceil(questions.length / 1)}
                  page={page}
                  onChange={handlePageChange}
                  boundaryCount={2}
                  siblingCount={0}
                /> */}
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
