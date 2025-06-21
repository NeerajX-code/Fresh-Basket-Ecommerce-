import axios from "../../utils/axios";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loaduser(user));
    } else {
      console.log("No user found in localStorage");
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};

export const asyncLogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error in user logout:", error);
  }
};
export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/users?email=${user.email}&password=${user.password}`);
    console.log(data[0])
    if (data.length > 0) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asyncCurrentUser())
    } else {
      console.error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error in user login:", error);
  }
};

export const asyncUpdateUser = (user) => async (dispatch) => {
  try {
    await axios.patch("/users/" + user.id, user);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncregisterUser = (user) => async (dispatch) => {
  try {
    let res = await axios.post("/users", user);
    console.log("User registered:", res.data);
  } catch (error) {
    console.error("Error in user registration:", error);
  }
};

export const asyncDeleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error)
  }
}