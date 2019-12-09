export const GOOGLE_API_KEY = "AIzaSyCLIECCQRXMRe4UcjtlolUJjgnUdV7V8jc";
export const HOST_API = "https://api.cittamobi.com.br/m3p/js";

// expects serviceId
export const API_VEHICLES_SERVICE = `${HOST_API}/vehicles/service`;

// expects serviceId
export const API_STOPS_SERVICE = `${HOST_API}/stops/service/v2/`;

// expects q={value}&lat{lat}&lng={lng}
export const API_SEARCH = `${HOST_API}/search/q?a=729,598`;

export const API_UPDATE_TIME = 20 * 1000; // 20 seconds

export const DEFAULT_MAP_POSITION = {
  lat: -30.031178,
  lng: -51.227894
};
