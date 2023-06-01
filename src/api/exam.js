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

export const getExamsRequest = async ({ accessToken, type }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/GET_EXAMS`,
      {
        type
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

export const joinExamRequest = async ({ accessToken, examId }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/JOIN`,
      {
        examId
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

export const submitExamRequest = async ({ accessToken, examToken, questionId, optionId }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/SUBMIT`,
      {
        questionId,
        optionId
      },
      {
        headers: {
          "access-token": accessToken,
          "exam-token": examToken,
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


export const getExamResultRequest = async ({ accessToken, examId }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/GET_RESULTS`,
      {
        examId
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