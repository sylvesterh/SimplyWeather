# SimplyWeather

A simple weather application created using Vite.

## 🚀 Features

- ⚡ Built with Vite for fast development
- 🎨 UI powered by Ant Design (AntD)
- 🌙 Dark/ Light Modes
- ✅ Linting with ESLint
- 🧪 Testing with Vitest & Testing Library
- 📂 Aliased imports (`@/` -> `src/`)

## 📦 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/sylvesterh/SimplyWeather.git
cd simply-weather
npm install
```

## 🔍 Prerequisites

- Node.js 18.0 or higher
- OpenWeather API key (get one at https://openweathermap.org/api)

## 🔑 Environment Setup

1. Create a `.env` file in the root directory
2. Add your OpenWeather API key:
```sh
VITE_WEATHER_API_KEY=your_api_key_here
```

## 🔧 Scripts

Run the following commands for different tasks:

- **Start development server:**
  ```sh
  npm run dev
  ```
- **Build for production:**
  ```sh
  npm run build
  ```
- **Preview production build:**
  ```sh
  npm run preview
  ```
- **Run ESLint:**
  ```sh
  npm run lint
  ```
- **Run tests:**
  ```sh
  npm run test
  ```
- **Run test coverage report:**
  ```sh
  npm run coverage
  ```

## 🖼️ Preview
![SimplyWeather Screenshot](./public/screenshot.png)

## 📁 Project Structure

```
├── src/
│   ├── __tests__/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── main.jsx
├── public/
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🔧 Configuration

- **Aliases:** The project supports `@` as an alias for `src/`.
- **Environment Variables:**
  - `import.meta.env.PACKAGE_VERSION`: Contains the project version from `package.json`.
  - `import.meta.env.VITE_WEATHER_API_KEY`: Contains the API key to the `openweatherapi.org`.
