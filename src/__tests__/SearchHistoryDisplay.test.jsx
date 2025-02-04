import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchHistoryDisplay from '@/components/layout/SearchHistoryDisplay';
import { fetchWeather } from '@/utils/weather';

vi.mock('@/utils/weather', () => ({
  fetchWeather: vi.fn()
}));

describe('SearchHistoryDisplay', () => {
  const mockSearchHistory = [
    { name: 'London', country: 'GB', datetime: 1707062400 }, // Feb 4, 2024
    { name: 'Paris', country: 'FR', datetime: 1707148800 }   // Feb 5, 2024
  ];

  const mockProps = {
    searchHistory: mockSearchHistory,
    clearSearchHistory: vi.fn(),
    onWeatherData: vi.fn(),
    addSearchHistory: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search history items correctly', async () => {
    render(<SearchHistoryDisplay {...mockProps} />);

    expect(screen.getAllByText('London, GB')).toHaveLength(2);
    expect(screen.getAllByText('Paris, FR')).toHaveLength(2);

    const dates = await screen.findAllByText(/[45]-2-2024 12:00:00 AM/i);
    expect(dates).toHaveLength(2);
  });

  it('displays "Search History" text', () => {
    render(<SearchHistoryDisplay {...mockProps} />);
    expect(screen.getByText('Search History')).toBeInTheDocument();
  });

  it('renders nothing when search history is empty', () => {
    render(
      <SearchHistoryDisplay
        {...mockProps}
        searchHistory={[]}
      />
    );

    expect(screen.queryByText('London, GB')).not.toBeInTheDocument();
  });

  it('calls clearSearchHistory when delete button is clicked', () => {
    render(<SearchHistoryDisplay {...mockProps} />);

    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[1]);

    expect(mockProps.clearSearchHistory).toHaveBeenCalledWith('London');
  });

  it('handles search item click correctly', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      dt: 1707062400
    };

    fetchWeather.mockResolvedValueOnce(mockWeatherData);

    render(<SearchHistoryDisplay {...mockProps} />);

    const searchButtons = screen.getAllByRole('button');
    fireEvent.click(searchButtons[0]);

    await waitFor(() => {
      expect(fetchWeather).toHaveBeenCalledWith(
        'London, GB',
        import.meta.env.VITE_WEATHER_API_KEY
      );
      expect(mockProps.onWeatherData).toHaveBeenCalledWith({
        data: mockWeatherData,
        loading: false,
        error: null
      });
      expect(mockProps.addSearchHistory).toHaveBeenCalledWith({
        name: mockWeatherData.name,
        country: mockWeatherData.sys.country,
        datetime: Math.floor(Date.now() / 1000)
      });
    });
  });

  it('handles search error correctly', async () => {
    const error = new Error('Failed to fetch weather data');
    fetchWeather.mockRejectedValueOnce(error);

    render(<SearchHistoryDisplay {...mockProps} />);

    const searchButtons = screen.getAllByRole('button');
    fireEvent.click(searchButtons[0]);

    await waitFor(() => {
      expect(mockProps.onWeatherData).toHaveBeenCalledWith({
        data: null,
        loading: false,
        error: error.message
      });
    });
  });
});
