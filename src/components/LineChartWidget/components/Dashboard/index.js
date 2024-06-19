import React, { useEffect } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import "./Dashboard.css";
import LineChartWidget from "../..";

const Dashboard = () => {
  const widgets = [
    { id: "bitcoin", x: 0, y: 0, width: 4, height: 3 },
    { id: "ethereum", x: 4, y: 0, width: 4, height: 3 },
    // Add more widgets as needed
  ];

  useEffect(() => {
    var grid = GridStack.init();
  });

  return (
    <div className="dashboard">
      <div className="grid-stack">
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">
            <LineChartWidget coinId="solana" />
          </div>
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">
            <LineChartWidget coinId="ethereum" />
          </div>
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">
            <LineChartWidget coinId="bitcoin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
