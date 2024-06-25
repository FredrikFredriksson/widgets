import React, { useEffect, useRef, useState } from "react";
import { SciChartSurface, NumericAxis, Rect } from "scichart";
import Graph from "../Graph";
import "./parentChart.css";

const ParentChart = ({ coinId }) => {
  const chartRef = useRef(null);
  const [subChartContext, setSubChartContext] = useState(null);

  useEffect(() => {
    const initParentChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        chartRef.current
      );

      // Add axes to the main chart
      const xAxis = new NumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);
      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      // Create the sub-chart on the main surface
      const subChartSurface = sciChartSurface.addSubChart({
        position: new Rect(0.1, 0.5, 0.5, 0.5),
      });

      // Add axes to the sub-chart
      subChartSurface.xAxes.add(new NumericAxis(wasmContext));
      subChartSurface.yAxes.add(new NumericAxis(wasmContext));

      setSubChartContext({ subChartSurface, wasmContext });
    };

    initParentChart();
  }, []);

  return (
    <div ref={chartRef} className="parent-chart">
      {subChartContext && (
        <Graph
          coinId={coinId}
          sciChartSurface={subChartContext.subChartSurface}
          wasmContext={subChartContext.wasmContext}
        />
      )}
    </div>
  );
};

export default ParentChart;
