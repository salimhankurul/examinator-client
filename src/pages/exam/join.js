import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/exam/join-exam-card";
import { CompaniesSearch } from "src/sections/exam/join-exam-search";

const companies = [
  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    logo: "/assets/logos/logo-dropbox.png",
    title: "Dropbox",
    downloads: "594",
  },
  {
    id: "ed2b900870ceba72d203ec15",
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    logo: "/assets/logos/logo-medium.png",
    title: "Medium Corporation",
    downloads: "625",
  },
  {
    id: "a033e38768c82fca90df3db7",
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    logo: "/assets/logos/logo-slack.png",
    title: "Slack",
    downloads: "857",
  },
];

const exams = [
  {
    examId: "2569ce0d517a7f06d3ea1f24",
    examName: "Introduction to Computer Science Final Exam",
    courseId: "COME125",
    courseName: "Introduction to Computer Science",
    minimumPassingScore: 70,
    startDate: "Tue, 21 Mar 2024 11:00:00 GMT",
    duration: 65,
    description:
      "This exam is designed to test students' knowledge of fundamental computer science concepts, including algorithms, data structures, programming languages, and more.",
  },
  {
    examId: "3f06d7e69a5c6844d4cb1243",
    examName: "Web Development Final Exam",
    courseId: "CS204",
    courseName: "Web Development",
    minimumPassingScore: 75,
    startDate: "Mon, 30 Apr 2024 13:00:00 GMT",
    duration: 120,
    description:
      "This exam covers various aspects of web development, including HTML, CSS, JavaScript, web design principles, and more.",
  },
  {
    examId: "2d738b37d53b98e36b41e9c1",
    examName: "Operating Systems Final Exam",
    courseId: "CS302",
    courseName: "Operating Systems",
    minimumPassingScore: 65,
    startDate: "Wed, 22 May 2024 09:30:00 GMT",
    duration: 90,
    description:
      "This exam tests students' understanding of operating system concepts, including process management, memory management, file systems, and more.",
  },
  {
    examId: "81d7b246e964f93a7e0ce20d",
    examName: "Computer Networks Final Exam",
    courseId: "CS325",
    courseName: "Computer Networks",
    minimumPassingScore: 70,
    startDate: "Thu, 06 Jun 2024 14:00:00 GMT",
    duration: 120,
    description:
      "This exam covers various topics related to computer networks, including network architectures, protocols, routing algorithms, and more.",
  },
  {
    examId: "9f4a2e9bc1dbd3465a5c5e5d",
    examName: "Artificial Intelligence Final Exam",
    courseId: "CS401",
    courseName: "Artificial Intelligence",
    minimumPassingScore: 80,
    startDate: "Fri, 21 Jun 2024 10:30:00 GMT",
    duration: 150,
    description:
      "This exam tests students' understanding of various artificial intelligence concepts, including search algorithms, logic programming, decision trees, and more.",
  },
  {
    examId: "f1b93872b1730f98c9dbb16d",
    examName: "Computer Graphics Final Exam",
    courseId: "CS410",
    courseName: "Computer Graphics",
    minimumPassingScore: 70,
    startDate: "Tue, 02 Jul 2024 12:00:00 GMT",
    duration: 120,
    description:
      "This exam covers various topics related to computer graphics, including rasterization, shading, ray tracing, and more.",
  },
];

const Page = () => {
  return (
    <>
      <Head>
        <title>Examinator | Join Exams</title>
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
                <Typography variant="h4">Exams</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid container spacing={3}>
              {exams.map((exam) => (
                <Grid xs={12} md={6} lg={4} key={exam.examId}>
                  <CompanyCard exam={exam} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
