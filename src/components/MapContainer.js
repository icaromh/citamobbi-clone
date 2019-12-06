import React from "react";

import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import { GOOGLE_API_KEY, DEFAULT_MAP_POSITION } from "../contants";
import MY_LOCATION from "../images/my-location.png";

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

  const MY_LOCATION_IMAGE = {
    url: MY_LOCATION,
    // This marker is 20 pixels wide by 32 pixels high.
    size: new props.google.maps.Size(30, 30),
    // The origin for this image is (0, 0).
    origin: new props.google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new props.google.maps.Point(15, 15)
  };

  return (
    <Map
      className="map"
      google={props.google}
      zoom={14}
      disableDefaultUI={true}
      style={mapStyles}
      initialCenter={DEFAULT_MAP_POSITION}
      center={props.location}
    >
      <Marker
        title="minha posição"
        icon={MY_LOCATION_IMAGE}
        position={props.location}
      />

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
