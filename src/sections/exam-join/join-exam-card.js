import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
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
import { useNotificationContext } from "src/contexts/notification-context";
import dayjs from "dayjs";

export const CompanyCard = (props) => {
  const { showNotify, setNotifyText, setSeverity, setAutoHideDuration } = useNotificationContext();

  const { exam } = props;
  const router = useRouter();
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
          {exam.name}
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
            {exam.startDate && dayjs(exam.startDate).format("DD/MMM/YYYY HH:mm")}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          {exam.examId && (
            <Button
              variant="outlined"
              onClick={() => {
                if (exam.startDate > Date.now()) {
                  setAutoHideDuration(2500);
                  setSeverity("error");
                  setNotifyText(
                    `This exam not started yet! It will start on ${dayjs(exam.startDate).format(
                      "DD/MMM/YYYY HH:mm"
                    )}`
                  );
                  showNotify(true);
                } else {
                  router.push("/exam-session/session?examId=" + exam.examId);
                }
              }}
            >
              Join
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
