import { all, call, put, putResolve, takeLatest } from "redux-saga/effects";
import { fetchPlaces } from "../../api";
import { actions, getPlacesError, getPlacesSuccess } from "../actions/Place";

const callGetPlaces = (params) => fetchPlaces(params);

function* sagaGetPlaces({ payload }) {
  try {
    console.log("[DEBUG] :: sagaGetPlaces ", { payload });
    const response = yield call(callGetPlaces, payload);
    console.log("[DEBUG] :: sagaGetPlaces ", { response });
    const { status, data } = response;
    if (status === 200) {
      const formatted = data?.results?.map((item) => ({
        ...item,
        value: item?.place_id,
        label: item?.formatted_address,
      }));

      yield putResolve(getPlacesSuccess(formatted));
      return;
    }
    yield put(getPlacesError("Error"));
  } catch (e) {
    yield put(getPlacesError(e?.toString()));
  }
}

export default function* Places() {
  yield all([takeLatest(actions.GET.REQUEST, sagaGetPlaces)]);
}
