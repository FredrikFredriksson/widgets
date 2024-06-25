// src/App.js
import React from "react";
import "./App.css";
import LineChartWidget from "./components/LineChartWidget";
import Dashboard from "./components/Dashboard";
import Graph from "./components/LineChartWidget/components/Graph";
import ParentChart from "./components/LineChartWidget/components/ParentChart";
function App() {
  return (
    <div className="App">
      <main>
        <ParentChart coinId="bitcoin" />
        <LineChartWidget coinId="bitcoin" />
      </main>
    </div>
  );
}

export default App;
