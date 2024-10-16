// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Introduction from "./components/Introduction";
import Functions from "./components/Functions";
import Reviews from "./components/Reviews";
import Support from "./components/Support";
import Afterburner from "./components/Afterburner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/function" element={<Functions />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/support" element={<Support />} />
        <Route path="/afterburner" element={<Afterburner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
