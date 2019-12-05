import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";

import MapContainer from "./components/MapContainer";
import SearchBar from "./components/SearchBar";

import "./styles.css";

import {
  API_VEHICLES_SERVICE,
  API_STOPS_SERVICE,
  API_SEARCH
} from "./contants";

const Results = props => {
  return (
    <div className="search-result">
      <ul>
        {props.data.services.map(bus => {
          return (
            <li key={bus.id} onClick={() => props.handleSelectService(bus)}>
              <b>{bus.routeCode}</b> - {bus.serviceMnemonic}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Title = props => {
  return (
    <div className="title-area">
      <span>
        <b>{props.data.routeCode}</b> - {props.data.serviceMnemonic}
      </span>
      <button onClick={props.onClear}>Limpar</button>
    </div>
  );
};

function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [activeIntervalId, setIntervalId] = useState(false);

  const updateMarkers = service => {
    fetch(`${API_VEHICLES_SERVICE}/${service.id}`)
      .then(res => res.json())
      .then(data => {
        const d = data.map(m => {
          return {
            title: m.prefix,
            position: {
              lat: m.lat,
              lng: m.lng
            }
          };
        });
        setMarkers(d);
      });
  };

  const handleClear = () => {
    setMarkers([]);
    setPolyline(false);
    setActiveService({});
    activeIntervalId(false);
  };

  const handleSelectService = service => {
    setShowResults(false);
    setActiveService(service);

    updateMarkers(service);

    const intervalId = setInterval(() => {
      updateMarkers(service);
    }, 30 * 1000);
    setIntervalId(intervalId);

    fetch(`${API_STOPS_SERVICE}/${service.id}`)
      .then(res => res.json())
      .then(data => {
        setPolyline(data.polyline);
      });
  };

  const performSearch = value => {
    fetch(`${API_SEARCH}&q=${value}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setShowResults(true);
      });
  };

  return (
    <Fragment>
      <nav>
        {(!!activeService.id && (
          <Title onClear={handleClear} data={activeService} />
        )) || <SearchBar onChange={debounce(performSearch, 300)} />}
      </nav>
      <main>
        {showResults && (
          <Results data={results} handleSelectService={handleSelectService} />
        )}
        <MapContainer polyline={polyline} markers={markers} />
      </main>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
