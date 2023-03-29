import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Card,
  Input,
  Layout,
  Space,
  Tag,
  Typography,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Form.css";
import { fetchPlaces } from "../../api";

const styles = {
  input: { flex: 1, fontSize: "16px" },
  button: {
    margin: "0 0 0 10px",
  },
  tag: {
    margin: "30px 0 10px",
  },
  form: {
    container: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 1,
      "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
      "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
      "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
    },
    wrapper: {
      flex: 1,
      backgroundColor: "white",
      width: "400px",
      display: "flex",
      flexDirection: "row",
    },
  },

  result: {
    wrapper: {
      flex: 1,
      backgroundColor: "white",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
    },
    container: {
      position: "absolute",
      top: 90,
      left: 10,
      zIndex: 1,
      "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
      "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
      "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "14px",
      display: "flex",
      flexDirection: "row",
      flexShrink: 1,
    },
    subtitle_bold: {
      fontSize: "14px",
      fontWeight: "bold",
      flexWrap: "wrap",
      flexShrink: 1,
      width: "200px",
      backgroundColor: "red",
    },
  },
};

const Form = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSelect = (id) => {
    const placeData = places.find((item) => item?.place_id === id);
    setValue(placeData?.formatted_address);
    setSelectedPlace(placeData);
    onSelect(placeData);
  };

  // When input value changed (type @ select)
  const handleChange = (data) => {
    setValue(data);
    setSelectedPlace(null);
  };

  // Handle clear input
  const handleClear = () => {
    setValue(null);
    setSelectedPlace(null);
  };

  const handleSearch = async () => {
    try {
      const res = await fetchPlaces({ input: value, radius: 500 });
      console.log("[DEBUG] :: ", { res });
      const { status, data } = res;
      if (status === 200) {
        const formattedPredictions = data?.results?.map((item) => ({
          ...item,
          value: item?.place_id,
          label: item?.formatted_address,
        }));
        setPlaces(formattedPredictions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const onShowOptions = () => {};

  if (minimized) {
    return (
      <Space className="form-container minimized">
        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          size="middle"
          onClick={toggleMinimize}
        />
      </Space>
    );
  }

  const renderPhotos = () => {
    const photos = selectedPlace?.photos;
    if (photos?.length === 0) return null;

    return null;

    // return photos?.map((photo) => <img src={photo} alt="" />);
  };

  const renderOpeningHours = () => {
    const isOpen = selectedPlace?.opening_hours?.open_now;
    const color = isOpen ? "green" : "red";
    const text = isOpen ? "Open" : "Closed";
    return (
      <Space wrap style={styles.tag}>
        <Typography style={styles.result.subtitle}>Hours:</Typography>
        <Tag color={color}>{text}</Tag>
      </Space>
    );
  };

  const renderTypes = () => {
    const types = selectedPlace?.types;

    if (types?.length === 0) return null;

    return (
      <Space wrap size={[0, 8]} style={styles.tag}>
        {types?.map((item) => (
          <Tag>{item}</Tag>
        ))}
      </Space>
    );
  };

  return (
    <>
      <Card style={styles.form.container} size="small">
        <Layout style={styles.form.wrapper}>
          <AutoComplete
            options={value && places}
            style={styles.input}
            onSelect={handleSelect}
            onSearch={handleSearch}
            onChange={handleChange}
            onClear={handleClear}
            value={value}
          >
            <Input.Search
              value={value}
              size="large"
              placeholder="Search"
              allowClear
            />
          </AutoComplete>
          {/* <Button
            style={styles.button}
            type="primary"
            size="large"
            onClick={onShowOptions}
          >
            More
          </Button> */}
        </Layout>

        {showOptions && <Space></Space>}
      </Card>
      {selectedPlace && (
        <Card style={styles.result.container} size="small">
          <Layout style={styles.result.wrapper}>
            <Typography style={styles.result.title}>
              {selectedPlace?.name}
            </Typography>
            <Typography style={styles.result.subtitle}>
              {selectedPlace?.formatted_address}
            </Typography>

            {renderPhotos()}
            {renderOpeningHours()}
            {renderTypes()}
          </Layout>
        </Card>
      )}
    </>
  );
};

Form.propTypes = {
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  options: PropTypes.array.isRequired,
};

Form.defaultProps = {
  onSelect: () => {},
  onSearch: () => {},
  options: [],
};

export default Form;
