import dayjs from "dayjs";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";

const statusMap = {
  ongoing: "warning",
  passed: "success",
  failed: "error",
};

export const MyExams = (props) => {
  const { exams = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Your Exams" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell sortDirection="desc">Exam Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Your Score</TableCell>
                <TableCell>Your Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams
                .sort((a, b) => b.startDate - a.startDate)
                .map((exam) => {
                  return (
                    <TableRow hover key={exam.examId}>
                      <TableCell>{exam.courseId}</TableCell>
                      <TableCell>{exam.courseName}</TableCell>
                      <TableCell>{exam.examName}</TableCell>
                      <TableCell>{dayjs(exam.startDate).format("DD/MM/YYYY HH:mm")}</TableCell>
                      <TableCell>{dayjs(exam.endDate).format("DD/MM/YYYY HH:mm")}</TableCell>
                      <TableCell>
                        {exam.score}/{exam.totalPoints}
                      </TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[exam.examStatus]}>
                          {exam.examStatus}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
    </Card>
  );
};

MyExams.prototype = {
  exams: PropTypes.array,
  sx: PropTypes.object,
};
