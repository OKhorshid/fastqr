"use client";

import { useState, useEffect } from "react";
import GoogleMapsLoader from "../../components/googleMapsLoader";
import type { googlePosition } from "@ts/global";

export const Geoloco: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [loco, setLoco] = useState<googlePosition>();

  locations: [
    { latitude: 30.0444, longitude: 31.2357 },
    { latitude: 30.0561, longitude: 31.2396 },
    { latitude: 30.0616, longitude: 31.2195 },
    { latitude: 30.0731, longitude: 31.2278 },
    { latitude: 30.0569, longitude: 31.2461 },
    { latitude: 30.05, longitude: 31.2234 },
    { latitude: 30.0763, longitude: 31.2083 },
    { latitude: 30.0788, longitude: 31.2132 },
    { latitude: 30.0458, longitude: 31.2462 },
    { latitude: 30.0627, longitude: 31.2498 },
    { latitude: 30.0483, longitude: 31.2423 },
    { latitude: 30.039, longitude: 31.2192 },
    { latitude: 30.0744, longitude: 31.2051 },
    { latitude: 30.0542, longitude: 31.2319 },
    { latitude: 30.0673, longitude: 31.2656 },
    { latitude: 30.0555, longitude: 31.2232 },
    { latitude: 30.0402, longitude: 31.2137 },
    { latitude: 30.0653, longitude: 31.2465 },
    { latitude: 30.0602, longitude: 31.2491 },
    { latitude: 30.0521, longitude: 31.2158 },
  ];

  useEffect(() => {
    // Update the document title using the browser API
    getLocation;
  }, [loco]);

  function getLocation() {
    "use client";
    const x = window.document.getElementById("demo");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x!.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showError(error: GeolocationPositionError) {
    let x = window.document.getElementById("demo");
    if (x) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out.";
          break;
        case error.code:
          x.innerHTML = "An unknown error occurred.";
          break;
      }
    }
  }

  function showPosition(position: any) {
    "use client";
    const x = window.document.getElementById("demo");
    if (x) {
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;
    }
    setLoco((loco) => (loco = position.coords));
    console.log(loco);
  }

  function reRenderMap() {}

  const toggleAnimate = () => {
    setAnimate((animate) => !animate);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <GoogleMapsLoader
          apiKey={"AIzaSyAu5P-H0-nusq8SVNePR6IlwWi9qQufXjM"}
          loco={loco}
        />
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
        <button
          className={`border border-red-300 p-5 border-r-4 border-b-4 rounded-md ${
            animate ? "scale-up-center" : ""
          }`}
          onClick={() => {
            getLocation();
            toggleAnimate();
          }}
        >
          Get Geo Location
        </button>

        <div id="demo" className="w-20 h-20"></div>
      </div>
    </>
  );
};

export default Geoloco;
