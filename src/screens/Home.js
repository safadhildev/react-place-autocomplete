import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Map from "../components/Map";
import styles from "./styles";

const { Content } = Layout;

const Home = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (placeData) => {
    setSelectedPlace(placeData);
  };

  return (
    <Layout style={styles.layout} hasSider>
      <Form onSelect={handlePlaceSelect} />
      <Layout style={styles.contentContainer}>
        <Content style={styles.content}>
          <Map selectedPlace={selectedPlace} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
