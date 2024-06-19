// src/App.js
import React from "react";
import "./App.css";
import SciChartComponent from "./components/SciChartComponent";
import LineChartWidget from "./components/LineChartWidget";
import Dashboard from "./components/LineChartWidget/components/Dashboard";
function App() {
  return (
    <div className="App">
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
