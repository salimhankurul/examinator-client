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
  SvgIcon,
} from "@mui/material";
import { useNotificationContext } from "src/contexts/notification-context";
import { useRouter } from "next/navigation";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const CreatedExamForm = ({ auth, meta, SetCreated }) => {
  const router = useRouter();
  const { showNotify, setNotifyText } = useNotificationContext();

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item md={12} sm={12} xs={12}>
              <Stack
                spacing={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{meta.examName}</Typography>
                <SvgIcon sx={{ fontSize: 300, color: "green" }}>
                  <CheckCircleOutlineIcon />
                </SvgIcon>
                <Typography variant="h6" sx={{ fontSize: 60, color: "black" }}>
                  EXAM CREATED SUCCESFULLY
                </Typography>

                <Button variant="contained" onClick={() => { router.push('/')}}>
                  RETURN
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
