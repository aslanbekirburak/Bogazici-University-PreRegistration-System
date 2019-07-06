import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";

import { uiReducer } from "./ui/reducers";
import * as uiSagas from "./ui/sagas";

export const rootReducer = combineReducers({
  ui: uiReducer
});

export function* rootSaga() {
  yield all([...Object.values(uiSagas)].map(fork));
}
