import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import styles from "./styles";
import { Layout, notification, Space, Spin } from "antd";

const Map = ({ selectedPlace }) => {
  const mapRef = useRef();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const { loading } = useSelector((state) => {
    return {
      loading: state.placeReducer.places.loading,
    };
  });

  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const handleUserLocationErr = (error) => {
    const errorCode = error.code;
    let errorMessage = "Error";
    switch (errorCode) {
      case error.PERMISSION_DENIED:
        errorMessage = "[ERROR] :: User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "[ERROR] :: Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage = "[ERROR] :: The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorMessage = "[ERROR] :: An unknown error occurred.";
        break;
      default:
        errorMessage = "[ERROR] :: Something went wrong.";
        break;
    }

    notification.open({
      message: "Error getting your location",
      description: errorMessage,
    });
  };

  const handleCurrentPosition = (position) => {
    setMapCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const getUserCurrentLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>
          handleCurrentPosition(position)
        );
      } else {
        notification.open({
          message: "Error getting your location",
          description: "Geolocation is not supported by this browser.",
        });
      }
    } catch (err) {
      handleUserLocationErr(err);
    }
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      setMapCenter({
        lat: selectedPlace?.geometry?.location?.lat,
        lng: selectedPlace?.geometry?.location?.lng,
      });
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: mapCenter.lat,
        lng: mapCenter.lng,
      });
      map.fitBounds(bounds);
    }
  }, [mapCenter, map]);

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  return (
    <Layout>
      <Spin
        tip="Loading..."
        size="large"
        style={styles.loadingContainer}
        spinning={loading}
      />
      {isLoaded && (
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
        </GoogleMap>
      )}
    </Layout>
  );
};

export default memo(Map);
