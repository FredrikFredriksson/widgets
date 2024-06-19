// src/components/SciChartComponent.js
import React from "react";
import { SciChartReact } from "scichart-react";
import { EAxisType, EChart2DModifierType, ESeriesType } from "scichart";

// No license key needed for evaluation mode

const SciChartComponent = () => {
  return (
    <SciChartReact
      style={{ width: "100%", height: "500px" }}
      config={{
        xAxes: [{ type: EAxisType.NumericAxis }],
        yAxes: [{ type: EAxisType.NumericAxis }],
        series: [
          {
            type: ESeriesType.SplineMountainSeries,
            options: {
              fill: "#3ca832",
              stroke: "#eb911c",
              strokeThickness: 4,
              opacity: 0.4,
            },
            xyData: { xValues: [1, 2, 3, 4], yValues: [1, 4, 7, 3] },
          },
        ],
        modifiers: [
          { type: EChart2DModifierType.ZoomPan, options: { enableZoom: true } },
          { type: EChart2DModifierType.MouseWheelZoom },
          { type: EChart2DModifierType.ZoomExtents },
        ],
      }}
    />
  );
};

export default SciChartComponent;
