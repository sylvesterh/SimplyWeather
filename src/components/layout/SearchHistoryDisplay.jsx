import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Flex } from "antd";
import { SearchOutlined, DeleteFilled } from '@ant-design/icons';
import { fetchWeather } from "@/utils/weather";
import { formatDateTime } from "@/utils/datetime";

const SearchHistoryDisplay = ({ searchHistory, clearSearchHistory, onWeatherData, addSearchHistory }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteItem = (cityName) => {
    clearSearchHistory(cityName);
  };

  const handleSearchItem = async (historyItem) => {
    const searchQuery = `${historyItem.name}, ${historyItem.country}`;

    try {
      setIsLoading(true);
      const weatherData = await fetchWeather(searchQuery.trim(), import.meta.env.VITE_WEATHER_API_KEY);
      onWeatherData({ 
        data: weatherData, 
        loading: false, 
        error: null 
      });
      addSearchHistory({ 
        name: weatherData.name, 
        country: weatherData.sys.country, 
        datetime: Math.floor(Date.now() / 1000)
      });
    } catch (error) {
      onWeatherData({ 
        data: null, 
        loading: false, 
        error: error.message 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex className="search-history" gap="large" vertical>
      <p>Search History</p>
      {searchHistory.length > 0 ? 
        searchHistory.map((historyItem) => (
          <Flex 
            key={`${historyItem.name}-${historyItem.datetime}`} 
            className="search-history-item" 
            align="center" 
            justify="space-between" 
            data-name={historyItem.name}
          >
            <p className="hide-for-small-only">
              {`${historyItem.name}, ${historyItem.country}`}
            </p>
            <Flex className="item-details show-for-small-only" gap="small" vertical>
              <p>{`${historyItem.name}, ${historyItem.country}`}</p>
              <p>{formatDateTime(historyItem.datetime)}</p>
            </Flex>
            <Flex className="button-group" align="center" gap="small">
              <p className="hide-for-small-only">
                {formatDateTime(historyItem.datetime)}
              </p>
              <Button 
                onClick={() => handleSearchItem(historyItem)} 
                icon={<SearchOutlined />} 
                loading={isLoading} 
              />
              <Button 
                onClick={() => handleDeleteItem(historyItem.name)} 
                icon={<DeleteFilled />} 
              />
            </Flex>
          </Flex>
        ))
        : null}
    </Flex>
  );
};

SearchHistoryDisplay.propTypes = {
  searchHistory: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      datetime: PropTypes.number.isRequired
    })
  ).isRequired,
  clearSearchHistory: PropTypes.func.isRequired,
  onWeatherData: PropTypes.func.isRequired,
  addSearchHistory: PropTypes.func.isRequired
};

export default SearchHistoryDisplay;
