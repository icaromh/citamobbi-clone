import React from "react";

const SearchResults = ({ data, handleSelectService }) => (
  <div className="search-results">
    <ul>
      {data.services.map(service => (
        <li key={service.id} onClick={() => handleSelectService(service)}>
          <b>{service.routeCode}</b> - {service.serviceMnemonic}
        </li>
      ))}
    </ul>
  </div>
);

export default SearchResults;
