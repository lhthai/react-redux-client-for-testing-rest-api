import {
  GET_STUDENTS,
  GET_STUDENTS_SUCCESS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from "./actionTypes"
import axios from "axios"


export const getStudents = () => async dispatch => {
  dispatch({ type: GET_STUDENTS })
  try {
    const { data } = await axios.get("/api/students")
    dispatch({ type: GET_STUDENTS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createStudent = item => async dispatch => {
  try {
    const { data } = await axios.post("/api/students/", item)
    dispatch({ type: CREATE_STUDENT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateStudent = item => async dispatch => {
  try {
    const { data } = await axios.put(`/api/students/${item.pk}`, item)
    dispatch({ type: UPDATE_STUDENT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteStudent = pk => async dispatch => {
  try {
    await axios.delete(`/api/students/${pk}`)
    dispatch({ type: DELETE_STUDENT, payload: pk })
  } catch (error) {
    console.log(error)
  }
}
