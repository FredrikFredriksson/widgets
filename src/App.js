// src/App.js
import React from "react";
import "./App.css";
import ParentChart from "./components/LineChartWidget/components/ParentChart";
function App() {
  return (
    <div className="App">
      <main>
        <ParentChart coinId="bitcoin" />
      </main>
    </div>
  );
}

export default App;
