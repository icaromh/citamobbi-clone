import React from "react";

import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import { GOOGLE_API_KEY } from "../contants";

const mapStyles = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0
};

const MapContainer = props => {
  let path = [];

  if (props.polyline) {
    path = props.google.maps.geometry.encoding.decodePath(props.polyline);
  }

  return (
    <Map
      className="map"
      google={props.google}
      zoom={14}
      disableDefaultUI={true}
      style={mapStyles}
      initialCenter={{
        lat: -30.031178,
        lng: -51.227894
      }}
    >
      {!!props.markers && props.markers.map(props => <Marker {...props} />)}

      {!!props.polyline && (
        <Polyline
          key="poly"
          path={path}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
  libraries: ["geometry"]
})(MapContainer);
