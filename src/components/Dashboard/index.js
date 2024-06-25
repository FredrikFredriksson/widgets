import React, { useEffect } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import "./Dashboard.css";
import LineChartWidget from "../LineChartWidget";
import BitcoinSearchVolumeChart from "../SearchVolumeChart";
import BitcoinDominanceChart from "../DominanceChart";
import ParentChart from "../LineChartWidget/components/ParentChart";

const Dashboard = () => {
  useEffect(() => {
    const grid = GridStack.init();
  }, []);

  return (
    <div className="dashboard">
      <div className="grid-stack">
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
          data-gs-resizable="true"
        >
          <div className="grid-stack-item-content">
            <ParentChart coinId="bitcoin" />
          </div>
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
          data-gs-resizable="true"
        >
          {/* <div className="grid-stack-item-content">
            <BitcoinDominanceChart />
          </div> */}
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
          data-gs-resizable="true"
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
