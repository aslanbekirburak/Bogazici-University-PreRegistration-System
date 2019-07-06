import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_RESET,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESET,
  SIGNOUT_REQUEST,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSONS_REQUEST,
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_RESET,
  FETCH_SELECTED_LESSONS_FAILURE,
  FETCH_SELECTED_LESSONS_REQUEST,
  FETCH_SELECTED_LESSONS_SUCCESS,
  FETCH_SELECTED_LESSONS_RESET,
  FETCH_GUROBI_LESSONS_FAILURE,
  FETCH_GUROBI_LESSONS_REQUEST,
  FETCH_GUROBI_LESSONS_SUCCESS,
  FETCH_GUROBI_LESSONS_RESET,
  POST_LESSONS_FAILURE,
  POST_LESSONS_REQUEST,
  POST_LESSONS_SUCCESS,
  POST_LESSONS_RESET
} from "./actions";

const initialState = {
  user: {},
  lessons: [],
  token: "",
  Selectedlessons:[],
  Gurobilessons:[],

  loggedIn: false,

  signinInProgress: false,
  signinHasError: false,
  signinCompleted: false,
  signinError: "",

  signupInProgress: false,
  signupHasError: false,
  signupCompleted: false,
  sigupError: "",

  fetchLessonsInProgress: false,
  fetchLessonsHasError: false,
  fetchLessonsCompleted: false,
  fetchLessonsError: "",

  fetchSelectedLessonsInProgress: false,
  fetchSelectedLessonsHasError: false,
  fetchSelectedLessonsCompleted: false,
  fetchSelectedLessonsError: "",

  fetchGurobiLessonsInProgress: false,
  fetchGurobiLessonsHasError: false,
  fetchGurobiLessonsCompleted: false,
  fetchGurobiLessonsError: "",

  pushLessonsInProgress: false,
  pushLessonsHasError: false,
  pushLessonsCompleted: false,
  pushLessonsError: ""
};

export const uiReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        signinInProgress: true,
        signinHasError: false,
        signinCompleted: false
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        signinInProgress: false,
        signinHasError: true,
        signinCompleted: true,
        signinError: payload.detail
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token:payload.token,
        user:payload.user,
        signinInProgress: false,
        signinHasError: false,
        signinCompleted: true
      };
    case SIGNIN_RESET:
      return {
        ...state,
        signinInProgress: false,
        signinHasError: false,
        signinCompleted: false
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        signupInProgress: true,
        signupHasError: false,
        signupCompleted: false
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        signupInProgress: false,
        signupHasError: true,
        signupCompleted: true,
        signupError: payload.detail
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loggedIn: true,
        signupInProgress: false,
        signupHasError: false,
        signupCompleted: true
      };

    case SIGNUP_RESET:
      return {
        ...state,
        signupInProgress: false,
        signupHasError: false,
        signupCompleted: false
      };

    case SIGNOUT_REQUEST:
      return {
        ...state,
        user: {},
        token: "",

        loggedIn: false,

        signinInProgress: false,
        signinHasError: false,
        signinCompleted: false,
        signinError: ""
      };
    case FETCH_LESSONS_REQUEST:
      return {
        ...state,
        fetchLessonsInProgress: true,
        fetchLessonsHasError: false,
        fetchLessonsCompleted: false
      };

    case FETCH_LESSONS_FAILURE:
      return {
        ...state,
        fetchLessonsInProgress: false,
        fetchLessonsHasError: true,
        fetchLessonsCompleted: true,
        fetchLessonsError: payload.detail
      };
    case FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: payload,
        fetchLessonsInProgress: false,
        fetchLessonsHasError: false,
        fetchLessonsCompleted: true
      };

    case FETCH_LESSONS_RESET:
      return {
        ...state,
        fetchLessonsInProgress: false,
        fetchLessonsHasError: false,
        fetchLessonsCompleted: false
      };
      case FETCH_SELECTED_LESSONS_REQUEST:
        return {
          ...state,
          fetchSelectedLessonsInProgress: true,
          fetchSelectedLessonsHasError: false,
          fetchSelectedLessonsCompleted: false
        };
  
      case FETCH_SELECTED_LESSONS_FAILURE:
        return {
          ...state,
          fetchSelectedLessonsInProgress: false,
          fetchSelectedLessonsHasError: true,
          fetchSelectedLessonsCompleted: true,
          fetchSelectedLessonsError: payload.detail
        };
      case FETCH_SELECTED_LESSONS_SUCCESS:
        return {
          ...state,
          Selectedlessons: payload[0].selectedCourses,
          fetchSelectedLessonsInProgress: false,
          fetchSelectedLessonsHasError: false,
          fetchSelectedLessonsCompleted: true
        };
  
      case FETCH_SELECTED_LESSONS_RESET:
        return {
          ...state,
          fetchSelectedLessonsInProgress: false,
          fetchSelectedLessonsHasError: false,
          fetchSelectedLessonsCompleted: false
        };







        case FETCH_GUROBI_LESSONS_REQUEST:
        return {
          ...state,
          fetchGurobiLessonsInProgress: true,
          fetchGurobiLessonsHasError: false,
          fetchGurobiLessonsCompleted: false
        };
  
      case FETCH_GUROBI_LESSONS_FAILURE:
        return {
          ...state,
          fetchGurobiLessonsInProgress: false,
          fetchGurobiLessonsHasError: true,
          fetchGurobiLessonsCompleted: true,
          fetchGurobiLessonsError: payload.detail
        };
       
      case FETCH_GUROBI_LESSONS_SUCCESS:
        return {
          ...state,
          Gurobilessons: payload[0].takenCourses,
          fetchGurobiLessonsInProgress: false,
          fetchGurobiLessonsHasError: false,
          fetchGurobiLessonsCompleted: true
        };
  
      case FETCH_GUROBI_LESSONS_RESET:
        return {
          ...state,
          fetchGurobiLessonsInProgress: false,
          fetchGurobiLessonsHasError: false,
          fetchGurobiLessonsCompleted: false
        };



      case POST_LESSONS_REQUEST:
      return {
        ...state,
        pushLessonsInProgress: true,
        pushLessonsHasError: false,
        pushLessonsCompleted: false
      };

    case POST_LESSONS_FAILURE:
      return {
        ...state,
        pushLessonsInProgress: false,
        pushLessonsHasError: true,
        pushLessonsCompleted: true,
        pushLessonsError: payload.detail
      };
    case POST_LESSONS_SUCCESS:
      return {
        ...state,
        pushLessonsInProgress: false,
        pushLessonsHasError: false,
        pushLessonsCompleted: true
      };

    case POST_LESSONS_RESET:
      return {
        ...state,
        pushLessonsInProgress: false,
        pushLessonsHasError: false,
        pushLessonsCompleted: false
      };

    default:
      return {
        ...state
      };
  }
};
