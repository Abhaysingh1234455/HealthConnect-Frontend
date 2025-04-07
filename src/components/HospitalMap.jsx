/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./HospitalCards.css"

const GOOGLE_API_KEY = "AIzaSyBXJrAiZu4ee7hYREDhXYUCYsvuqMbGtx0";
const MAP_ID = "a99b7f93c9be9003";
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const HospitalMap = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Location access denied.");
          console.error(error);
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const fetchNearbyHospitals = useCallback(async () => {
    if (!location) return;
    try {
      const response = await fetch(
        `https://health-connect-pfqv.onrender.com/api/nearby-hospitals?lat=${location.lat}&lng=${location.lng}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setHospitals(data.results.slice(0, 6)); // ✅ First 6 hospitals
      } else {
        setError("No hospitals found.");
      }
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError("Failed to fetch hospitals.");
    }
  }, [location]);

  useEffect(() => {
    if (isLoaded && location) {
      fetchNearbyHospitals();
    }
  }, [isLoaded, location, fetchNearbyHospitals]);

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (window.google?.maps?.marker && location) {
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: location,
        title: "You are here",
      });
    }

    if (window.google?.maps?.marker && hospitals.length > 0) {
      hospitals.forEach((hospital) => {
        new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: hospital.geometry.location,
          title: hospital.name,
        });
      });
    }
  };

  return isLoaded ? (
    <div style={{ padding: "20px" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={14}
        mapId={MAP_ID}
        onLoad={handleMapLoad}
      />

      {/* 🏥 Hospital Cards */}
      <div className="container">
        {hospitals.map((hospital, index) => (
          <div
            key={index}
            className="card"
          >
            <h3 className="card-title">{hospital.name}</h3>
            <p className="card-rating"><strong>Rating:</strong> {hospital.rating || "Not available"} ⭐</p>
            <p className="card-address"><strong>Address:</strong> {hospital.vicinity}</p>
            <button
              onClick={() => alert(`Details for ${hospital.name}`)}
              className="card-button"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default HospitalMap;
