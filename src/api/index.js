import axios from "axios";

export const fetchPlaces = (params) =>
  axios.get(
    `${process.env.REACT_APP_PLACE_HOST}maps/api/place/autocomplete/json`,
    {
      params: {
        ...params,
        key: process.env.REACT_APP_PLACE_API_KEY,
      },
    }
  );
