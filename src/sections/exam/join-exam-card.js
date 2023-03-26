import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";
import { useExamContext } from "src/contexts/exam-context";

export const CompanyCard = (props) => {
  const { exam } = props;
  const router = useRouter();
  const { setExam } = useExamContext();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src="/assets/logos/logo-medium.png" variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {exam.courseId}
        </Typography>
        <Typography align="center" gutterBottom variant="h5">
          {exam.examName}
        </Typography>
        <Typography align="center" variant="body1">
          {exam.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {exam.startDate}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setExam(exam);
              router.push("/exam/session");
            }}
          >
            Start
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
