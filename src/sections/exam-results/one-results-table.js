import PropTypes from "prop-types";
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
import { SeverityPill } from "src/components/severity-pill";

import { Scrollbar } from "src/components/scrollbar";

const statusMap = {
  passed: "success",
  failed: "error",
};

export const OneExamResult = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    totalPoints = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Student Score</TableCell>
                <TableCell>Student Passed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((result) => {
                const status = result.userIsPassed ? "passed" : "failed";
                return (
                  <TableRow hover key={result.userId}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{result.universityPersonalId}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {result.userFirstName} {result.userLastName}
                    </TableCell>
                    <TableCell>
                      {result.userScore}/{totalPoints}
                    </TableCell>

                    <TableCell>
                      <SeverityPill color={statusMap[status]}>{status}</SeverityPill>
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

OneExamResult.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalPoints: PropTypes.number,
};
