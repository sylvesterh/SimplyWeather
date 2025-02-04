export const fetchWeather = async (query, apiKey) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found. Please check your input.");
  }

  return await response.json();
};
