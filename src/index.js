import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";

import MapContainer from "./components/MapContainer";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Title from "./components/Title";

import "./styles.css";

import {
  API_VEHICLES_SERVICE,
  API_STOPS_SERVICE,
  API_SEARCH,
  API_UPDATE_TIME
} from "./contants";

import BUS_IMAGE from "./images/bus.png";
import STOP_IMAGE from "./images/bus-stop.png";

function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState([]);
  const [polyline, setPolyline] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [activeIntervalId, setIntervalId] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleClear = () => {
    setVehicles([]);
    setStops([]);
    setPolyline(false);
    setActiveService({});
    activeIntervalId(false);
  };

  const updateBusPosition = service => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(() => {
        setLoading(true)
      });
  };

  const handleSelectService = service => {
    setShowResults(false);
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
    fetch(`${API_SEARCH}&q=${value}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setShowResults(true);
      });
  };

  const renderNav = () => {
    const shouldShowTitle = !!activeService.id;
    if (shouldShowTitle){
      return <Title isLoading={isLoading} onClear={handleClear} data={activeService} />;
    }
      

    return <SearchBar onChange={debounce(handleSearch, 300)} />;
  };

  const markers = stops.concat(vehicles);
  return (
    <Fragment>
      <nav>{renderNav()}</nav>
      <main>
        {showResults && (
          <SearchResults
            data={results}
            handleSelectService={handleSelectService}
          />
        )}
        <MapContainer polyline={polyline} markers={markers} />
      </main>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
