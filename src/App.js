// src/App.js
import React from "react";
import "./App.css";
import LineChartWidget from "./components/LineChartWidget";
import Dashboard from "./components/Dashboard";
import Graph from "./components/LineChartWidget/components/Graph";
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
