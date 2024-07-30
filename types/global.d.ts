export interface googlePosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GoogleMapsLoaderProps {
  apiKey: string;
  version?: string; // Optional prop for specifying the API version
  loco?: JSON;
}
// Extending the Window interface to include initMap
declare global {
  interface Window {
    initMap?: () => void;
  }
}
