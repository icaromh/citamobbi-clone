import React from "react";
import * as S from "./styled";

const GeolocationButton = props => {
  const handleOnClick = () => {
    navigator.geolocation.getCurrentPosition(position => {
      props.userLocationUpdate({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, console.error);
  };

  if ("geolocation" in navigator) {
    return (
      <S.GeolocationButton onClick={handleOnClick}>
        {props.children}
      </S.GeolocationButton>
    );
  }

  return;
};

export default GeolocationButton;
