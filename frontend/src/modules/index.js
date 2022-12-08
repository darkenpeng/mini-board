import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import { all } from "redux-saga/effects";
import posts, { postsSaga } from "./posts";

const rootReducer = combineReducers({
  auth,
  loading,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), postsSaga()]);
}

export default rootReducer;
