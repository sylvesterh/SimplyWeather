import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WeatherDisplay from "@/components/layout/WeatherDisplay";

vi.mock("../../assets/cloud.png", () => "cloud.png");
vi.mock("../../assets/sun.png", () => "sun.png");

describe("WeatherDisplay Component", () => {
  const mockWeatherData = {
    name: "New York",
    dt: 1697049600, // Timestamp for October 11, 2023
    sys: { country: "US" },
    main: {
      temp: 20,
      humidity: 65,
      temp_min: 15,
      temp_max: 25,
    },
    weather: [{ main: "Clouds" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when loading is true", () => {
    render(<WeatherDisplay loading={true} />);
    const spinner = screen.getByLabelText("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders weather data correctly when loading is false", async () => {
    render(<WeatherDisplay weatherData={mockWeatherData} loading={false} />);

    const weatherImage = screen.getByAltText("weather-image");
    expect(weatherImage).toHaveAttribute("src", "/src/assets/cloud.png");
    expect(screen.getByText("20°")).toBeInTheDocument();
    expect(screen.getByText("H: 25°")).toBeInTheDocument();
    expect(screen.getByText("L: 15°")).toBeInTheDocument();
    expect(screen.getByText("New York, US")).toBeInTheDocument();
    expect(screen.getAllByText('Humidity: 65%')).toHaveLength(2);
    expect(screen.getAllByText('Clouds')).toHaveLength(2);
    const dates = await screen.findAllByText(/12-10-2023 2:40:00 AM/i);
    expect(dates).toHaveLength(2);
  });

  it('renders the correct weather icon based on the weather condition', () => {
    render(<WeatherDisplay weatherData={mockWeatherData} loading={false} />);

    const weatherIcon = screen.getByAltText('weather-image');
    expect(weatherIcon).toHaveAttribute('src', '/src/assets/cloud.png');
  });

  it('renders the sun icon when the weather is clear', () => {
    const clearWeatherData = {
      ...mockWeatherData,
      weather: [{ main: 'Clear' }],
    };

    render(<WeatherDisplay weatherData={clearWeatherData} loading={false} />);

    const weatherIcon = screen.getByAltText('weather-image');
    expect(weatherIcon).toHaveAttribute('src', '/src/assets/sun.png');
  });
});