import {
  GET_STUDENTS,
  GET_STUDENTS_SUCCESS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from "../actions/actionTypes"

const initialState = {
  data: [],
  loading: false
}

const studentReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return { ...state, loading: true }
    case GET_STUDENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case CREATE_STUDENT:
      return { ...state, data: [...state.data, action.payload] }
    case UPDATE_STUDENT:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.pk === action.payload.pk) return action.payload
          return item
        })
      }
    case DELETE_STUDENT:
      return {
        ...state,
        data: state.data.filter(item => {
          return item.pk !== action.payload
        })
      }
    default:
      return state
  }
}

export default studentReducers
