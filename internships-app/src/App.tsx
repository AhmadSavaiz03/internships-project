import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./layouts/Navbar-Footer/Navbar";
import { Footer } from "./layouts/Navbar-Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
