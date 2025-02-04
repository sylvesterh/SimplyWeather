import { App } from "antd";
import Layout from "@/components/layout";
import LandingPage from "@/components/layout/Index";
import './App.css'

const WeatherApp = () => {
  return (
    <App>
      <Layout>
        <LandingPage />
      </Layout>
    </App>
  );
}

export default WeatherApp;
