export const actions = {
  GET: {
    REQUEST: "PLACES_GET_REQUEST",
    SUCCESS: "PLACES_GET_SUCCESS",
    ERROR: "PLACES_GET_ERROR",
  },
  RESET: "PLACES_RESET",
};

export const placesReset = () => ({
  type: actions.RESET,
});

export const getPlacesRequest = (params) => {
  return {
    type: actions.GET.REQUEST,
    payload: params,
  };
};

export const getPlacesSuccess = (data) => {
  return {
    type: actions.GET.SUCCESS,
    payload: data,
  };
};

export const getPlacesError = (error) => {
  return {
    type: actions.GET.ERROR,
    payload: error,
  };
};
