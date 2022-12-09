import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import { all } from "redux-saga/effects";
import posts, { postsSaga } from "./posts";
import write, { writeSaga } from "./write";

const rootReducer = combineReducers({
  auth,
  loading,
  write,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), postsSaga(), writeSaga()]);
}

export default rootReducer;
