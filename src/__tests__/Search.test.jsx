import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '@/components/layout/Search';
import { fetchWeather } from '@/utils/weather';

vi.mock('@/utils/weather', () => ({
  fetchWeather: vi.fn()
}));

describe('Search Component', () => {
  const mockOnWeatherData = vi.fn();
  const mockAddSearchHistory = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(input.value).toBe('London');
  });

  it('calls fetchWeather with correct parameters on form submission', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      dt: 1234567890
    };

    fetchWeather.mockResolvedValueOnce(mockWeatherData);

    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchWeather).toHaveBeenCalledWith('London', import.meta.env.VITE_WEATHER_API_KEY);
    });
  });

  it('handles successful weather data fetch', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      dt: 1234567890
    };

    fetchWeather.mockResolvedValueOnce(mockWeatherData);

    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnWeatherData).toHaveBeenCalledWith({
        data: mockWeatherData,
        loading: false,
        error: null
      });

      expect(mockAddSearchHistory).toHaveBeenCalledWith({
        name: 'London',
        country: 'GB',
        datetime: 1234567890
      });
    });
  });

  it('handles API errors correctly', async () => {
    const errorMessage = 'City not found';
    fetchWeather.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'NonExistentCity' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnWeatherData).toHaveBeenCalledWith({
        data: null,
        loading: false,
        error: errorMessage
      });
      expect(mockAddSearchHistory).not.toHaveBeenCalled();
    });
  });

  it('prevents submission with empty input', async () => {
    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(fetchWeather).not.toHaveBeenCalled();
    expect(mockOnWeatherData).not.toHaveBeenCalled();
    expect(mockAddSearchHistory).not.toHaveBeenCalled();
  });

  it('shows active floating label when input is focused', () => {
    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Country or City');
    
    expect(label).toHaveClass('inactive');
    
    fireEvent.focus(input);
    expect(label).toHaveClass('active');
    
    fireEvent.blur(input);
    expect(label).toHaveClass('inactive');
  });

  it('maintains active floating label when input has value and loses focus', () => {
    render(
      <Search 
        onWeatherData={mockOnWeatherData} 
        addSearchHistory={mockAddSearchHistory} 
      />
    );

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Country or City');

    fireEvent.change(input, { target: { value: 'London' } });

    fireEvent.focus(input);
    expect(label).toHaveClass('active');

    fireEvent.blur(input);
    expect(label).toHaveClass('inactive');
  });
});
