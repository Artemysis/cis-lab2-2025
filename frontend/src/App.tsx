import { useState, useEffect } from 'react'
import './App.css'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}
function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Определяем URL бэкенда:
  // В production (Docker) используем относительный путь через nginx proxy
  // В development используем переменную окружения или localhost
  const API_URL = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/api/WeatherForecast`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных')
      console.error('Error fetching weather data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast App</h1>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>

        <div className="weather-section">
          <h2>Weather Forecast</h2>
          <button onClick={fetchWeatherData} disabled={loading}>
            {loading ? 'Загрузка...' : 'Обновить данные'}
          </button>

          {error && (
            <div className="error">
              <p>❌ Ошибка: {error}</p>
              <p style={{ fontSize: '0.9em', color: '#999' }}>
                API URL: {API_URL}/api/WeatherForecast
              </p>
            </div>
          )}

          {loading && !error && <p>Загрузка данных о погоде...</p>}

          {!loading && !error && weather.length > 0 && (
            <div className="weather-grid">
              {weather.map((forecast, index) => (
                <div key={index} className="weather-card">
                  <div className="date">{new Date(forecast.date).toLocaleDateString('ru-RU')}</div>
                  <div className="temperature">
                    {forecast.temperatureC}°C / {forecast.temperatureF}°F
                  </div>
                  <div className="summary">{forecast.summary}</div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && weather.length === 0 && (
            <p>Нет данных о погоде</p>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
