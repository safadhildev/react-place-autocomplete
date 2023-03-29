import axios from "axios";

export const fetchPlaces = (params) =>
  axios.get(
    `${process.env.REACT_APP_PLACE_AUTOCOMPLETE_HOST}maps/api/place/textsearch/json?key=${process.env.REACT_APP_MAPS_API_KEY}`,
    {
      params,
    }
  );
