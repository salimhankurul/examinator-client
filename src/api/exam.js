import axios from "axios";
import { EXAM_API_URL } from "./settings";

export const createExamRequest = async ({ body, accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/CREATE`,
      {
        ...body,
      },
      {
        headers: {
          "access-token": accessToken,
        },
      }
    );
    return { body: request.data };
  } catch (error) {
    if (error.response) {
      return { body: error.response.data };
    }

    return { error: error.message };
  }
};

export const getExamsRequest = async ({ accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/GET_EXAMS`,
      {},
      {
        headers: {
          "access-token": accessToken,
        },
      }
    );
    return { body: request.data };
  } catch (error) {
    if (error.response) {
      return { body: error.response.data };
    }

    return { error: error.message };
  }
};
