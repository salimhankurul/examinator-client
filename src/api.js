import axios from "axios";

const EXAM_API_URL = "https://tdjufw63yc.execute-api.eu-west-1.amazonaws.com";

export const loginRequest = async ({ email, password }) => {
  try {

    console.log("loginRequest input", { email, password });

    const request = await axios.post(`${EXAM_API_URL}/SIGNIN`, {
      email,
      password,
    });
    console.log("loginRequest response",  request.data);
    return { success: request.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const logoutRequest = async ({ userId, accessToken }) => {
  try {

    console.log("logoutRequest input", { userId, accessToken });
    
    const request = await axios.post(`${EXAM_API_URL}/SIGNOUT`, 
    {
      userId,
    },
    {
      headers: {
        '_token': accessToken
      }
    }
    );
    console.log("logoutRequest response",  request.data);
    return { success: request.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const updateProfileRequest = async ({ accessToken, body }) => {
  try {

    console.log("updateProfileRequest input", { body, accessToken });
    
    const request = await axios.post(`${EXAM_API_URL}/SET_PROFILE`, 
    {
      ...body,
    },
    {
      headers: {
        '_token': accessToken
      }
    }
    );
    console.log("updateProfileRequest response",  request.data);
    return { success: request.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getProfileRequest = async ({ accessToken }) => {
  try {

    console.log("getProfileRequest input", { accessToken });
    
    const request = await axios.post(`${EXAM_API_URL}/GET_PROFILE`, {},
    {
      headers: {
        '_token': accessToken
      }
    }
    );

    console.log("getProfileRequest response",  request.data);
    return { success: request.data };
  } catch (error) {
    console.log("getProfileRequest error")
    console.log(JSON.stringify(error))
    return { error: error.response };
  }
};

