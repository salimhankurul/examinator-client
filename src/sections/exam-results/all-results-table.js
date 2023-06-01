import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  SvgIcon,
} from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";

import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/navigation";

export const CustomersTable = (props) => {
  const router = useRouter();

  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Exam Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Show Results</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((exam) => {
                return (
                  <TableRow hover key={exam.examId}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{exam.courseId}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{exam.courseName}</TableCell>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell>{dayjs(exam.startDate).toString()}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        startIcon={
                          <SvgIcon fontSize="small">
                            <ArrowDownOnSquareIcon />
                          </SvgIcon>
                        }
                        onClick={() => {
                          router.push("/exam-results/one?examId=" + exam.examId);
                        }}
                      >
                        Results
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
