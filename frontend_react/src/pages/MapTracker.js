import React, { useState, useEffect } from "react";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const MapTracker = () => {
  const [location, setLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingList, setTrackingList] = useState([]);
  const [time, setTime] = useState(false);
  const [mapCenter, setMapCenter] = useState([49.597, 9.874]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;

          // Hinzufügen der Koordinaten zum trackingList-Array
          setTrackingList((prevList) => [...prevList, [latitude, longitude]]);
          
          setLocation({ latitude, longitude, accuracy });
        },
        (error) => {
          setGeoError(`Fehler bei der Standortabfrage: ${error.message}`);
        }
      );
    } else {
      setGeoError("Geolocation wird nicht unterstützt.");
    }
  };

  useEffect(() => {
    let intervalId;

    // Update the center of the map whenever the location changes
    if (location) {
      setMapCenter([location.latitude, location.longitude]);
    }

    // Start the interval only when tracking is active
    if (isTracking) {
      intervalId = setInterval(() => {
        getLocation();
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clean up when the component is unmounted or when isTracking changes
    return () => {
      clearInterval(intervalId);
    };
  }, [location, isTracking]);

  const handleToggleTracking = () => {
    // Schaltet das Tracking ein oder aus
    setIsTracking((prevTracking) => {
      if (!prevTracking) {
        setTrackingList([]);
        setTime(0);
      }
      return !prevTracking;
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <Container w="100%" centerContent overflowY="scroll">
      <Box 
          p="4" 
          boxShadow="lg" 
          rounded="lg" 
          bg="white"
          mb="1"
          w="90vw"
      >
        <Heading as="h1" size="xl" mb="4">
          Map
        </Heading>
        <Heading as="h2" float="right">{formatTime(time)}</Heading>
        <Button colorScheme={isTracking ? "red" : "teal"} onClick={handleToggleTracking}>
          {isTracking ? "Stop" : "Start"} Tracking
        </Button>
      </Box>
      <Box 
          w="90vw"
          h="55vh"
          overflow="hidden" 
          px="5vw"
          py="2.5vh"
          boxShadow="lg" 
          rounded="lg" 
          bg="white"
          mb="1"
      >
        <MapContainer 
            center={mapCenter} 
            zoom={20} 
            scrollWheelZoom={true}
            style={{ width: "80vw", height: "50vh" }}
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline pathOptions={{ color: 'teal' }} positions={trackingList} />
        </MapContainer>
      </Box>
      <Box 
          p="4" 
          boxShadow="lg" 
          rounded="lg" 
          bg="white"
          mb="1"
          w="90vw"
      >
        {location ? (
          <>
            <Text fontSize="lg" mb="4">
              Latitude: {location.latitude} Longitude: {location.longitude}
            </Text>
            <Text fontSize="lg" mb="4">
              Genauigkeit: {location.accuracy} Meter
            </Text>
          </>
        ) : (
          <Text fontSize="lg" mb="4">
            {geoError ? (
              geoError
            ) : (
              "Tracking nicht aktiviert"
            )}

          </Text>
        )}
      </Box>
      
    </Container>
  );
};

export default MapTracker;

