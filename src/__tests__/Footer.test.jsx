import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

vi.mock('@/components/icons', () => ({
  Light: () => <div data-testid="light-icon">Light</div>,
  Dark: () => <div data-testid="dark-icon">Dark</div>
}));

describe('Footer Component', () => {
  const mockSwitchMode = vi.fn();

  it('renders footer with theme switcher', () => {
    render(
      <Footer isDarkMode={false} switchMode={mockSwitchMode} />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
  });

  it('displays correct theme mode when light theme is active', () => {
    render(
      <Footer isDarkMode={false} switchMode={mockSwitchMode} />
    );

    const segmentedControl = screen.getByRole('radiogroup');
    const selectedButton = segmentedControl.querySelector('.ant-segmented-item-selected');

    expect(selectedButton).toHaveTextContent('Light');
  });

  it('displays correct theme mode when dark theme is active', () => {
    render(
      <Footer isDarkMode={true} switchMode={mockSwitchMode} />
    );

    const segmentedControl = screen.getByRole('radiogroup');
    const selectedButton = segmentedControl.querySelector('.ant-segmented-item-selected');

    expect(selectedButton).toHaveTextContent('Dark');
  });

  it('calls switchMode with correct value when theme is changed to dark', () => {
    render(
      <Footer isDarkMode={false} switchMode={mockSwitchMode} />
    );

    const darkThemeButton = screen.getByRole('radio', { name: /dark/i });
    fireEvent.click(darkThemeButton.closest('.ant-segmented-item'));

    expect(mockSwitchMode).toHaveBeenCalledWith('dark');
  });

  it('calls switchMode with correct value when theme is changed to light', () => {
    render(
      <Footer isDarkMode={true} switchMode={mockSwitchMode} />
    );

    const lightThemeButton = screen.getByRole('radio', { name: /light/i });
    fireEvent.click(lightThemeButton.closest('.ant-segmented-item'));

    expect(mockSwitchMode).toHaveBeenCalledWith('light');
  });

  it('renders with default props', () => {
    render(
      <Footer />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <Footer isDarkMode={false} switchMode={mockSwitchMode} />
    );

    expect(container.querySelector('.main-footer')).toBeInTheDocument();
    expect(container.querySelector('.footer-content')).toBeInTheDocument();
  });
});
