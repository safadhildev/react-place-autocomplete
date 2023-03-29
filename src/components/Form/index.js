import { RightOutlined } from "@ant-design/icons";
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
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesRequest } from "../../providers/actions/Place";
import React, { useState } from "react";
import styles from "./styles";

const Form = ({ onSelect }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const [showOptions, setShowOptions] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { placesData, loading, error, message } = useSelector((state) => {
    return {
      placesData: state.placeReducer.places.data,
      loading: state.placeReducer.places.loading,
      error: state.placeReducer.places.error,
      message: state.placeReducer.places.message,
    };
  });

  const handleSelect = (id) => {
    const placeData = placesData?.find((item) => item?.place_id === id);
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
    dispatch(getPlacesRequest({ input: value, radius: 500 }));
  };

  const handleGetMyLocation = () => {};

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

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
            options={value && placesData}
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
              loading={loading}
            />
          </AutoComplete>
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
