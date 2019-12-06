import React from "react";

const Geolocation = props => {
  const handleOnClick = () => {
    const success = function(position) {
      props.userLocationUpdate({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    const error = console.log;

    navigator.geolocation.getCurrentPosition(success, error);
  };

  if ("geolocation" in navigator) {
    return (
      <button className="button-geolocation" onClick={handleOnClick}>
        {props.children}
      </button>
    );
  }

  return (
    <p>
      I'm sorry, but geolocation services are not supported by your browser.
    </p>
  );
};

export default Geolocation;
