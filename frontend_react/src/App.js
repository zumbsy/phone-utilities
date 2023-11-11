import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from './pages/Navigation';
import Homepage from "./pages/Homepage";
import Search from './pages/Search';
import Card from './pages/Card';
import MapTracker from './pages/MapTracker';
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    const disableZoom = (event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", disableZoom, { passive: false });
    window.addEventListener("touchmove", disableZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", disableZoom);
      window.removeEventListener("touchmove", disableZoom);
    };
  }, []);

  return (
    <ChakraProvider>
      <Box h="100vh" position="relative">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/card" element={<Card />} />
            <Route path="/map" element={<MapTracker />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
