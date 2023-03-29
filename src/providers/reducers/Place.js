import { actions } from "../actions/Place";

const initialState = {
  places: {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null,
  },
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESET: {
      return initialState;
    }
    case actions.GET.REQUEST:
      return {
        ...state,
        places: {
          ...state.places,
          loading: true,
          data: null,
          error: null,
          message: null,
        },
      };
    case actions.GET.SUCCESS:
      return {
        ...state,
        places: {
          ...state.places,
          loading: false,
          success: true,
          data: action.payload,
        },
      };
    case actions.GET.ERROR:
      return {
        ...state,
        places: {
          ...state.places,
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default placeReducer;
