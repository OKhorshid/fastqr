import { useEffect } from "react";
import type { GoogleMapsLoaderProps, googlePosition } from "@ts/global";

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({
  apiKey,
  version = "weekly",
  loco,
}) => {
  useEffect(() => {
    const scriptId = "google-maps-script";

    window.initMap = () => {
      const mapElement = document.getElementById("map") as HTMLElement;
      const eiffelTower = { lat: 48.8584, lng: 2.2945 };
      const defaultLoco = { lat: 30.0630435, lng: 30.9362801 };
      let userLocation = eiffelTower;

      if (loco) {
        let { latitude, longitude } = loco;
        userLocation = { lat: latitude, lng: longitude };
      }

      const map = new google.maps.Map(mapElement, {
        center: userLocation,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Eiffel Tower",
      });

      console.log("Google Maps loaded successfully");
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup the script when component unmounts
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      // Clean up the global initMap to avoid memory leaks
      delete window.initMap;
    };
  }, [apiKey, version, loco]); // Dependencies on apiKey and version

  return null; // This component does not render anything.
};

export default GoogleMapsLoader;
