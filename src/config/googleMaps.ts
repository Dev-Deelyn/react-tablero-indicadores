export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: -26.1849,
  lng: -58.1731,
};

export const DEFAULT_ZOOM = 12;

export const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  scrollwheel: true,
  streetViewControl: false,
};