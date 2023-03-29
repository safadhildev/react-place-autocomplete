import "./App.css";

import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Map from "./components/Map";
const { Content } = Layout;

const styles = {
  contentContainer: {
    textAlign: "center",
    lineHeight: "120px",
    // color: "#fff",
    flex: 1,
    backgroundColor: "transparent",
  },
  layout: { height: "100vh", display: "flex", backgroundColor: "#ccc" },
  sider: {
    textAlign: "center",
    lineHeight: "120px",
    color: "#000",
    width: "100px",
    height: "100%",
    backgroundColor: "transparent",
    // backgroundColor: "white",
  },
};

const App = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [siderWidth, setSiderWidth] = useState(400);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (placeData) => {
    console.log("[DEBUG] :: ", { placeData });
    setSelectedPlace(placeData);
  };

  const handleUserLocationErr = (error) => {
    const errorCode = error.code;
    switch (errorCode) {
      case error.PERMISSION_DENIED:
        console.log("[ERROR] :: User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("[ERROR] :: Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("[ERROR] :: The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("[ERROR] :: An unknown error occurred.");
        break;
      default:
        console.log("[ERROR] :: Something went wrong.");
        break;
    }
  };

  const handleCurrentPosition = (position) => {
    console.log("[DEBUG]:: ", { position });
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const getUserCurrentLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleCurrentPosition);
      } else {
        console.log("[DEBUG] :: Geolocation is not supported by this browser.");
      }
    } catch (err) {
      handleUserLocationErr(err);
    }
  };

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  return (
    <Layout style={styles.layout} hasSider>
      <Form onSelect={handlePlaceSelect} />
      <Layout style={styles.contentContainer}>
        <Content style={styles.content}>
          <Map
            center={{
              lat: userLocation.lat,
              lng: userLocation.lng,
            }}
            selectedPlace={selectedPlace}
          />
        </Content>
      </Layout>
    </Layout>
    // <div className="container">
    //   <div className="form-container">
    //     <Form />
    //   </div>
    //   <div className="map-container">
    //     <Map
    //       center={{
    //         lat: userLocation.lat,
    //         lng: userLocation.lng,
    //       }}
    //      selectedPlace={selectedPlace}
    //     />
    //   </div>
    // </div>
  );
};

export default App;
