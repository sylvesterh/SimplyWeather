import PropTypes from "prop-types";
import cloud from "../../assets/cloud.png";
import sun from "../../assets/sun.png";
import { Flex, Image, Spin } from "antd";
import { formatDateTime } from "@/utils/datetime";

const WeatherDisplay = ({ weatherData, loading }) => {
  if (loading) {
    return (
      <Spin aria-label="loading-spinner" />
    );
  }

  const {
    name,
    dt,
    sys: { country },
    main: { temp, humidity, temp_min, temp_max },
    weather: [{ main }]
  } = weatherData;

  return (
    <>
      <Image
        className="weather-image"
        src={main === "Clouds" ? cloud : sun}
        preview={false}
        alt="weather-image"
      />
      <div className="current-weather">
        <p>{`Today's Weather`}</p>
        <h1 className="temperature">{Math.round(temp)}°</h1>
        <Flex gap="small">
          <p>H: {Math.round(temp_max)}°</p>
          <p>L: {Math.round(temp_min)}°</p>
        </Flex>
        <Flex className="additional-details" gap="small" justify="space-between">
          <p>{`${name}, ${country}`}</p>
          <p className="hide-for-small-only">{formatDateTime(dt)}</p>
          <p className="hide-for-small-only">Humidity: {humidity}%</p>
          <p className="hide-for-small-only">{main}</p>
        </Flex>
        <Flex className="additional-details show-for-small-only" gap="small" vertical>
          <p>{main}</p>
          <p>Humidity: {humidity}%</p>
          <p>{formatDateTime(dt)}</p>
        </Flex>
      </div>
    </>
  );
}

WeatherDisplay.propTypes = {
  weatherData: PropTypes.object,
  loading: PropTypes.bool,
};

export default WeatherDisplay;
