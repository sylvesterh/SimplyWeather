import PropTypes from 'prop-types';
import { useState } from 'react';
import { Input, Button, Card, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchWeather } from '@/utils/weather';

const Search = ({ onWeatherData, addSearchHistory }) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    try {
      setIsLoading(true);
      const weatherData = await fetchWeather(trimmedQuery, import.meta.env.VITE_WEATHER_API_KEY);
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
    <div className="search-container">
      <Card bordered={false} className="search-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <form onSubmit={handleSubmit} className="search-form">
            <label className={`floating-label ${focused ? "active" : "inactive"}`}>
              Country or City
            </label>
            <Input
              placeholder="Enter city or country (e.g., London or Japan or Melbourne, AU)"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ flex: 1 }}
              variant="borderless"
            />
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={handleSubmit}
              loading={isLoading}
            >
            </Button>
          </form>
        </Space>
      </Card>
    </div>
  );
};

Search.propTypes = {
  onWeatherData: PropTypes.func.isRequired,
  addSearchHistory: PropTypes.func.isRequired
};

export default Search;
