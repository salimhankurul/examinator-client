import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

const avatarStyle = {
  backgroundColor: "#3f51b5",
  height: 56,
  width: 56,
};

const cardStyle = {
  margin: "24px 0",
};
const courseListStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "8px",
  margin: "16px 0",
};

export const AccountProfile = ({ auth }) => {
  const {
    university,
    userType,
    lastName,
    universityPersonalId,
    userId,
    email,
    courses,
    firstName,
    exams,
  } = auth.user;

  return (
    <Card
      style={{
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar style={avatarStyle}>SK</Avatar>
          <Typography gutterBottom variant="h5">
            {auth.user.firstName} {auth.user.lastName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {auth.user.university}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {auth.user.universityPersonalId}
          </Typography>
        </Box>
      </CardContent>

      <CardContent>
        <Typography variant="h6">Courses</Typography>
        <Box style={courseListStyle}>
          {courses.map((course) => (
            <Typography key={course.id} variant="body1">
              {course.name}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
