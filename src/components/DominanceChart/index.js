import React, { useEffect, useState } from "react";
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
  DateTimeNumericAxis,
  EAutoRange,
  NumberRange,
  EAxisAlignment,
  ZoomPanModifier,
  RolloverModifier,
} from "scichart";
import { getCoins, getBitcoinDominance } from "../../services/coinService";// Replace with your actual file path

const BitcoinDominanceChart = () => {
  const [dominanceData, setDominanceData] = useState([]);
  const [sciChartSurface, setSciChartSurface] = useState(null);
  const [xyDataSeries, setXyDataSeries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coins = await getCoins();
        const dominance = await getBitcoinDominance();
        if (dominance !== null) {
          const timestamp = new Date(); // Use the current date for the timestamp
          setDominanceData([{ date: timestamp, value: dominance }]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const initSciChart = async () => {
      SciChartSurface.setRuntimeLicenseKey("YOUR_LICENSE_KEY");

      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        "dominance-chart"
      );

      const xAxis = new DateTimeNumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);
      yAxis.labelProvider.formatLabel = (value) => `${value}%`;

      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      const xyDataSeries = new XyDataSeries(wasmContext);
      const lineSeries = new FastLineRenderableSeries(wasmContext, {
        stroke: "#2884F1",
        strokeThickness: 2,
        dataSeries: xyDataSeries,
      });
      sciChartSurface.renderableSeries.add(lineSeries);

      sciChartSurface.chartModifiers.add(new ZoomPanModifier());
      sciChartSurface.chartModifiers.add(new RolloverModifier());

      setSciChartSurface(sciChartSurface);
      setXyDataSeries(xyDataSeries);
    };

    initSciChart();

    return () => {
      sciChartSurface?.delete();
    };
  }, []);

  useEffect(() => {
    if (xyDataSeries) {
      xyDataSeries.clear();
      dominanceData.forEach((item) => {
        xyDataSeries.append(item.date.getTime(), item.value);
      });
    }
  }, [dominanceData, xyDataSeries]);

  return (
    <div id="dominance-chart" style={{ width: "100%", height: "500px" }}></div>
  );
};

export default BitcoinDominanceChart;
