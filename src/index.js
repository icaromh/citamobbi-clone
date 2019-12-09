import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";

import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import Title from "./components/Title";
import GeolocationButton from "./components/GeolocationButton";
import Navbar from "./components/Navbar";

import GlobalStyles from "./styles/global";

import {
  API_VEHICLES_SERVICE,
  API_STOPS_SERVICE,
  API_SEARCH,
  API_UPDATE_TIME,
  DEFAULT_MAP_POSITION
} from "./contants";

import BUS_IMAGE from "./images/bus.png";
import STOP_IMAGE from "./images/bus-stop.png";

function App() {
  const [results, setResults] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState([]);
  const [polyline, setPolyline] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [activeIntervalId, setIntervalId] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  const handleClear = () => {
    clearInterval(activeIntervalId);

    setResults([]);
    setVehicles([]);
    setStops([]);
    setPolyline(false);
    setActiveService({});
    activeIntervalId(false);
  };

  const updateBusPosition = service => {
    setLoading(true);
    fetch(`${API_VEHICLES_SERVICE}/${service.id}`)
      .then(res => res.json())
      .then(data => {
        const buses = data.map(m => ({
          icon: BUS_IMAGE,
          title: m.prefix,
          position: {
            lat: m.lat,
            lng: m.lng
          }
        }));
        setVehicles(buses);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });
  };

  const handleSelectService = service => {
    setResults([]);
    setActiveService(service);
    updateBusPosition(service);

    const intervalId = setInterval(() => {
      updateBusPosition(service);
    }, API_UPDATE_TIME);
    setIntervalId(intervalId);

    fetch(`${API_STOPS_SERVICE}/${service.id}`)
      .then(res => res.json())
      .then(data => {
        const stopsMarkers = data.stops.map(stop => ({
          icon: STOP_IMAGE,
          title: stop.mnemonic,
          position: stop.location
        }));

        setPolyline(data.polyline);
        setStops(stopsMarkers);
      });
  };

  const handleSearch = value => {
    if (value === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchLocation =
      Object.getOwnPropertyNames(userLocation).length === 0
        ? `lat=${DEFAULT_MAP_POSITION.lat}&lng=${DEFAULT_MAP_POSITION.lng}`
        : `lat=${userLocation.lat}&lng=${userLocation.lng}`;

    setLoading(true);
    fetch(`${API_SEARCH}&q=${value}&${searchLocation}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  };

  const handleUpdatePos = position => {
    setUserLocation(position);
  };

  const markers = stops.concat(vehicles);
  const shouldShowTitle = !!activeService.id;

  return (
    <Fragment>
      <GlobalStyles />
      <Navbar>
        {(shouldShowTitle && (
          <Title
            isLoading={isLoading}
            onClear={handleClear}
            data={activeService}
          />
        )) || (
          <SearchBar
            isLoading={isLoading}
            onChange={debounce(handleSearch, 300)}
            renderResults={() => {
              if (results.length === 0) return;
              return (
                <SearchResult
                  data={results}
                  handleSelectService={handleSelectService}
                />
              );
            }}
          />
        )}
      </Navbar>
      <main>
        <GeolocationButton userLocationUpdate={handleUpdatePos}>
          {(Object.getOwnPropertyNames(userLocation).length === 0 &&
            "Habilitar GPS") ||
            "Centralizar"}
        </GeolocationButton>

        <Map location={userLocation} polyline={polyline} markers={markers} />
      </main>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
