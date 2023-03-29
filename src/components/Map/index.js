import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./Map.css";
import googleMapReact from "google-map-react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = ({ center, selectedPlace }) => {
  const mapRef = useRef();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
      setMapCenter(center);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    console.log("[DEBUG] :: ", { selectedPlace });
    if (selectedPlace) {
      setMapCenter({
        lat: selectedPlace?.geometry?.location?.lat,
        lng: selectedPlace?.geometry?.location?.lng,
      });
    }
  }, [selectedPlace]);

  useEffect(() => {
    console.log("[DEBUG] :: ", { t: mapRef?.current });
  }, [mapRef]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100vh" }}
      center={mapCenter}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControlOptions: {
          position: 3.0,
        },
      }}
    >
      <Marker
        position={{
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        }}
      />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
