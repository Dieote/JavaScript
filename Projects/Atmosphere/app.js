const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const elements = {
  cityInput: document.querySelector("#city-input"),
  searchForm: document.querySelector("#search-form"),
  searchButton: document.querySelector("#search-button"),
  locationButton: document.querySelector("#location-button"),
  statusMessage: document.querySelector("#status-message"),
  currentCity: document.querySelector("#current-city"),
  currentDate: document.querySelector("#current-date"),
  currentIcon: document.querySelector("#current-icon"),
  currentTemp: document.querySelector("#current-temp"),
  currentDescription: document.querySelector("#current-description"),
  feelsLike: document.querySelector("#feels-like"),
  humidity: document.querySelector("#humidity"),
  wind: document.querySelector("#wind"),
  pressure: document.querySelector("#pressure"),
  forecastList: document.querySelector("#forecast-list"),
  mapLocation: document.querySelector("#map-location"),
};

let map;
let marker;

elements.searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = elements.cityInput.value.trim();

  if (!city) {
    showStatus("Escribe el nombre de una ciudad para buscarla.", "error");
    return;
  }

  try {
    setLoading(true);
    await loadWeather(city);
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
});

elements.locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showStatus("Tu navegador no permite obtener la ubicación. Puedes buscar una ciudad manualmente.", "error");
    return;
  }

  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        await loadWeather(`${coords.latitude},${coords.longitude}`);
      } catch (error) {
        showStatus(error.message, "error");
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      setLoading(false);
      const message =
        error.code === error.PERMISSION_DENIED
          ? "No se concedió permiso para acceder a la ubicación. Puedes buscar una ciudad manualmente."
          : "No se pudo obtener tu ubicación. Comprueba los permisos e inténtalo de nuevo.";
      showStatus(message, "error");
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
  );
});

async function loadWeather(locationQuery) {
  const location = await resolveLocation(locationQuery);
  const query = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "5",
    wind_speed_unit: "ms",
  });
  const weather = await fetchJson(`${FORECAST_URL}?${query}`);

  renderCurrentWeather(weather, location);
  renderForecast(weather.daily);
  updateMap(location.latitude, location.longitude, location.name);
  showStatus("", "success");
}

async function resolveLocation(locationQuery) {
  const coordinates = locationQuery.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (coordinates) {
    return {
      latitude: Number(coordinates[1]),
      longitude: Number(coordinates[2]),
      name: "Ubicación actual",
    };
  }

  const query = new URLSearchParams({ name: locationQuery, count: "1", language: "es", format: "json" });
  const data = await fetchJson(`${GEOCODING_URL}?${query}`);
  const result = data.results?.[0];
  if (!result) {
    throw new Error("No se encontró esa ubicación. Comprueba el nombre e inténtalo de nuevo.");
  }

  return {
    latitude: result.latitude,
    longitude: result.longitude,
    name: [result.name, result.country].filter(Boolean).join(", "),
  };
}

async function fetchJson(url) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("No se pudo conectar con el servicio del tiempo. Comprueba tu conexión e inténtalo de nuevo.");
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("El servicio del tiempo devolvió una respuesta no válida. Inténtalo de nuevo.");
  }

  if (!response.ok) {
    throw new Error(data.reason || "No se pudieron cargar los datos del tiempo. Inténtalo de nuevo.");
  }

  return data;
}

function renderCurrentWeather(weather, location) {
  const { current } = weather;
  const [date, time] = current.time.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const dateForFormatting = new Date(Date.UTC(year, month - 1, day, 12));
  const description = weatherDescription(current.weather_code);
  elements.currentCity.textContent = location.name;
  elements.currentDate.textContent = `${new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(dateForFormatting)} · ${time}`;
  elements.currentTemp.textContent = Math.round(current.temperature_2m);
  elements.currentDescription.textContent = description;
  elements.feelsLike.textContent = `${Math.round(current.apparent_temperature)}°`;
  elements.humidity.innerHTML = `${current.relative_humidity_2m}<span class="metric-unit">%</span>`;
  elements.wind.innerHTML = `${Math.round(current.wind_speed_10m * 10) / 10}<span class="metric-unit"> m/s</span>`;
  elements.pressure.innerHTML = `${Math.round(current.surface_pressure)}<span class="metric-unit"> hPa</span>`;
  setWeatherIcon(elements.currentIcon, current.weather_code, current.is_day);
}

function renderForecast(daily) {
  elements.forecastList.replaceChildren();

  daily.time.forEach((day, index) => {
    const row = document.createElement("div");
    row.className = "forecast-row";

    const dayName = document.createElement("span");
    dayName.className = "forecast-day";
    const [year, month, date] = day.split("-").map(Number);
    const forecastDate = new Date(Date.UTC(year, month - 1, date, 12));
    dayName.textContent =
      index === 0
        ? "Hoy"
        : new Intl.DateTimeFormat("es-ES", { weekday: "short" })
            .format(forecastDate)
            .replace(".", "");

    const icon = document.createElement("span");
    icon.className = "forecast-icon";
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", weatherDescription(daily.weather_code[index]));
    icon.textContent = weatherIcon(daily.weather_code[index]);

    const temperature = document.createElement("span");
    temperature.className = "forecast-temperature";
    temperature.textContent = `${Math.round(daily.temperature_2m_max[index])}° / ${Math.round(daily.temperature_2m_min[index])}°`;

    row.append(dayName, icon, temperature);
    elements.forecastList.append(row);
  });
}

function setWeatherIcon(container, code, isDay) {
  container.textContent = weatherIcon(code, isDay);
}

function weatherDescription(code) {
  const descriptions = {
    0: "Despejado",
    1: "Principalmente despejado",
    2: "Parcialmente nublado",
    3: "Cubierto",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    56: "Llovizna helada ligera",
    57: "Llovizna helada intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    66: "Lluvia helada ligera",
    67: "Lluvia helada intensa",
    71: "Nevada ligera",
    73: "Nevada moderada",
    75: "Nevada intensa",
    77: "Granizo menudo",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos intensos",
    85: "Chubascos de nieve ligeros",
    86: "Chubascos de nieve intensos",
    95: "Tormenta",
    96: "Tormenta con granizo ligero",
    99: "Tormenta con granizo intenso",
  };
  return descriptions[code] || "Condiciones desconocidas";
}

function weatherIcon(code, isDay = 1) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 2) return isDay ? "🌤️" : "☁️";
  if (code === 3 || code === 45 || code === 48) return "☁️";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "❄️";
  if (code >= 95) return "⛈️";
  return "🌧️";
}

function updateMap(latitude, longitude, name) {
  if (!map) {
    map = L.map("map", { scrollWheelZoom: false }).setView([latitude, longitude], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    marker = L.marker([latitude, longitude]).addTo(map);
  } else {
    map.setView([latitude, longitude], 10);
    marker.setLatLng([latitude, longitude]);
  }

  marker.bindPopup(name);
  elements.mapLocation.textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  window.setTimeout(() => map.invalidateSize(), 0);
}

function setLoading(isLoading) {
  elements.searchButton.disabled = isLoading;
  elements.locationButton.disabled = isLoading;
  elements.searchButton.textContent = isLoading ? "Buscando…" : "Buscar";
  elements.locationButton.setAttribute("aria-busy", String(isLoading));
}

function showStatus(message, type) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message status-message--${type}`;
  elements.statusMessage.hidden = !message;
}
