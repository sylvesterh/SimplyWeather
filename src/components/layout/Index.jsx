import { useState } from "react";
import { useLocalStorage } from "@/hooks";
import { Alert, ConfigProvider, Flex, Layout } from "antd";
import { themeConfig } from "./theme";
import Footer from "./Footer";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import SearchHistoryDisplay from "./SearchHistoryDisplay";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  const [searchHistory, setSearchHistory] = useLocalStorage("searchHistory", []);
  const [weatherState, setWeatherState] = useState({
    data: null,
    loading: false,
    error: null
  });

  const switchMode = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const addSearchHistory = (newSearch) => {
    setSearchHistory(prevHistory => {
      const updatedHistory = [
        newSearch, 
        ...prevHistory.filter(item => item.name !== newSearch.name)
      ].slice(0, 5);
      
      return updatedHistory;
    });
  };

  const clearSearchHistory = (searchName) => {
    setSearchHistory(prevHistory => prevHistory.filter(historyItem => historyItem.name !== searchName));
  }

  return (
    <ConfigProvider theme={themeConfig(isDarkMode)}>
      <div
        className={isDarkMode ? "dark-mode" : "light-mode"}
        data-color-mode={isDarkMode ? "dark" : "light"}
      >
        <Layout className="main-content">
          <Layout className="content-wrapper">
            <Header className="main-header">
              <div className="main-header-content">
                <Flex gap="small">
                  <Search onWeatherData={setWeatherState} addSearchHistory={addSearchHistory} />
                </Flex>
              </div>
            </Header>
            <Content>
              {weatherState.data && !weatherState.loading ? (
                <WeatherDisplay weatherData={weatherState.data} loading={weatherState.loading} />
              ) : weatherState.error ? (
                  <Alert
                    className="current-weather error"
                    message="Error"
                    description={weatherState.error}
                    type="error"
                    showIcon
                  />)
                : (
                  ""
                )
              }
              <SearchHistoryDisplay
                searchHistory={searchHistory}
                clearSearchHistory={clearSearchHistory}
                onWeatherData={setWeatherState}
                addSearchHistory={addSearchHistory}
              />
            </Content>
            <Footer
              switchMode={switchMode}
              isDarkMode={isDarkMode}
            />
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
