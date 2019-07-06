import { call, put, takeLatest } from "redux-saga/effects";

import api from "./api";

import { SIGNIN_REQUEST, SIGNUP_REQUEST, FETCH_LESSONS_REQUEST,FETCH_SELECTED_LESSONS_REQUEST,FETCH_GUROBI_LESSONS_REQUEST,POST_LESSONS_REQUEST } from "./actions.js";

import {
  signinSuccess,
  signinFailure,
  signupFailure,
  signupSuccess,
  fetchLessonsFailure,
  fetchLessonsSuccess,
  fetchSelectedLessonsFailure,
  fetchSelectedLessonsSuccess,
  fetchGurobiLessonsFailure,
  fetchGurobiLessonsSuccess,
  postLessonsFailure,
  postLessonsSuccess
} from "./actions";

function* signinRequest(action) {
  const { email, password } = action.payload;

  try {
    const signinResponse = yield call(api.doSignIn, email, password);
    console.log(signinResponse);

    if (signinResponse) {
      if (signinResponse.status === 200) {
        window.localStorage.setItem("token",signinResponse.data.token);
        yield put(signinSuccess(signinResponse.data));
      } else if (signinResponse.status === 400) {
        yield put(signinFailure(signinResponse));
      } else {
        yield put(signinFailure({ detail: "unknown" }));
      }
    } else {
      yield put(signinFailure({ detail: "no response from api" }));
    }
  } catch (err) {
    yield put(signinFailure({ detail: err.detail }));
  }
}

function* signupRequest(action) {
  const { name, phone, email, password } = action.payload;
  const first_name = name;
  const last_name = "mfg";
  const phone_number = phone;

  try {
    const signupResponse = yield call(api.doSignUp, first_name, last_name, phone_number, password, email);

    if (signupResponse) {
      if (signupResponse.status === 201) {
        yield put(signupSuccess(signupResponse.data));
      } else if (signupResponse.status === 400) {
        yield put(signupFailure(signupResponse));
      } else {
        yield put(signupFailure({ detail: "unknown" }));
      }
    } else {
      yield put(signupFailure({ detaii: "no response fetched" }));
    }
  } catch (err) {
    yield put(signupFailure({ detail: err.detail }));
  }
}

function* fetchLessonsRequest(action) {
  try {
    const FetchLessonsResponse = yield call(api.doFetchLessons);
console.log(FetchLessonsResponse);
    if (FetchLessonsResponse) {
      if (FetchLessonsResponse.status === 200) {
        yield put(fetchLessonsSuccess(FetchLessonsResponse.data));
      } else if (FetchLessonsResponse.status === 400) {
        yield put(fetchLessonsFailure(FetchLessonsResponse));
      } else {
        yield put(fetchLessonsFailure({ detail: "unknown" }));
      }
    } else {
      yield put(fetchLessonsFailure({ detaii: "no response fetched" }));
    }
  } catch (err) {
    yield put(fetchLessonsFailure({ detail: err.detail }));
  }
}

function* fetchSelectedLessonsRequest(action) {
  try {
    const FetchSelectedLessonsResponse = yield call(api.doFetchSelectedLessons);
console.log(FetchSelectedLessonsResponse);
    if (FetchSelectedLessonsResponse) {
      if (FetchSelectedLessonsResponse.status === 200) {
        yield put(fetchSelectedLessonsSuccess(FetchSelectedLessonsResponse.data));
      } else if (FetchSelectedLessonsResponse.status === 400) {
        yield put(fetchSelectedLessonsFailure(FetchSelectedLessonsResponse));
      } else {
        yield put(fetchSelectedLessonsFailure({ detail: "unknown" }));
      }
    } else {
      yield put(fetchSelectedLessonsFailure({ detail: "no response fetched" }));
    }
  } catch (err) {
    yield put(fetchLessonsFailure({ detail: err.detail }));
  }
}

function* fetchGurobiLessonsRequest(action) {
  try {
    const FetchGurobiLessonsResponse = yield call(api.doFetchGurobiLessons);
console.log(FetchGurobiLessonsResponse.data);
    if (FetchGurobiLessonsResponse) {
      if (FetchGurobiLessonsResponse.status === 200) {
        yield put(fetchGurobiLessonsSuccess(FetchGurobiLessonsResponse.data));
      } else if (FetchGurobiLessonsResponse.status === 400) {
        yield put(fetchGurobiLessonsFailure(FetchGurobiLessonsResponse));
      } else {
        yield put(fetchGurobiLessonsFailure({ detail: "unknown" }));
      }
    } else {
      yield put(fetchGurobiLessonsFailure({ detail: "no response fetched" }));
    }
  } catch (err) {
    yield put(fetchLessonsFailure({ detail: err.detail }));
  }
}




function* postLessonsRequest(action) {  
  const { selectedLessons } = action.payload;
  try {
    const PostLessonsResponse = yield call(api.doPostLessons,selectedLessons);

    if (PostLessonsResponse) {
      if (PostLessonsResponse.status === 200) {
        yield put(postLessonsSuccess(PostLessonsResponse.data));
      } else if (PostLessonsResponse.status === 400) {
        yield put(postLessonsFailure(PostLessonsResponse));
      } else {
        yield put(postLessonsFailure({ detail: "unknown" }));
      }
    } else {
      yield put(postLessonsFailure({ detaii: "no response fetched" }));
    }
  } catch (err) {
    yield put(postLessonsFailure({ detail: err.detail }));
  }
}

const saga = function*() {
  yield takeLatest(SIGNIN_REQUEST, signinRequest);
  yield takeLatest(SIGNUP_REQUEST, signupRequest);
  yield takeLatest(FETCH_LESSONS_REQUEST, fetchLessonsRequest);
  yield takeLatest(FETCH_SELECTED_LESSONS_REQUEST, fetchSelectedLessonsRequest);
  yield takeLatest(FETCH_GUROBI_LESSONS_REQUEST, fetchGurobiLessonsRequest);
  yield takeLatest(POST_LESSONS_REQUEST, postLessonsRequest);

};

export default saga;
