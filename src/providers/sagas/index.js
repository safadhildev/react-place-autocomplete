import { all } from "redux-saga/effects";
import Place from "./Place";

export default function* rootSaga() {
  yield all([Place()]);
}
