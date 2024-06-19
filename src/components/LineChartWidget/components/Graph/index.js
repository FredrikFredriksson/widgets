import React, { useEffect, useRef } from "react";
import {
  SciChartSurface,
  NumericAxis,
  XyDataSeries,
  FastMountainRenderableSeries,
  GradientParams,
  Point,
} from "scichart";
import {
  getCoins,
  getHistoricalPrices,
} from "../../../../services/coinService"; // Adjust path as needed
import "./graph.css";

const Graph = ({ coinId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const initLineChart = async () => {
      const historicalPrices = await getHistoricalPrices(coinId);
      const coins = await getCoins();
      const selectedCoin = coins.find((coin) => coin.id === coinId);
      const priceChange24h = selectedCoin
        ? selectedCoin.price_change_percentage_24h
        : "N/A";

      const lineColor = priceChange24h >= 0 ? "#11CABE" : "#FA2256";

      const customTheme = {
        axisBorder: "Transparent",
        axisTitleColor: "#6495ED",
        annotationsGripsBackroundBrush: "white",
        annotationsGripsBorderBrush: "white",
        axis3DBandsFill: "#1F3D6833",
        axisBandsFill: "#191E39",
        axisPlaneBackgroundFill: "Transparent",
        columnFillBrush: "white",
        columnLineColor: "transparent",
        cursorLineBrush: "transparent",
        defaultColorMapBrush: [
          { offset: 0, color: "DarkBlue" },
          { offset: 0.5, color: "CornflowerBlue" },
          { offset: 1, color: "#FF22AA" },
        ],
        downBandSeriesFillColor: "#52CC5490",
        downBandSeriesLineColor: "#E26565FF",
        downBodyBrush: "white",
        downWickColor: "white",
        gridBackgroundBrush: "#191E39",
        gridBorderBrush: "white",
        labelBackgroundBrush: "#6495EDAA",
        labelBorderBrush: "#6495ED",
        labelForegroundBrush: "#EEEEEE",
        legendBackgroundBrush: "#1D2C35",
        lineSeriesColor: "white",
        loadingAnimationBackground: "#0D213A",
        loadingAnimationForeground: "#6495ED",
        majorGridLineBrush: "Transparent",
        minorGridLineBrush: "Transparent",
        mountainAreaBrush: "white",
        mountainLineColor: "white",
        overviewFillBrush: "white",
        planeBorderColor: "white",
        rolloverLineBrush: "#FD9F2533",
        rubberBandFillBrush: "#99999933",
        rubberBandStrokeBrush: "#99999977",
        sciChartBackground: "#191E39",
        scrollbarBackgroundBrush: "white",
        scrollbarBorderBrush: "white",
        scrollbarGripsBackgroundBrush: "white",
        scrollbarViewportBackgroundBrush: "white",
        scrollbarViewportBorderBrush: "white",
        shadowEffectColor: "white",
        textAnnotationBackground: "#6495EDAA",
        textAnnotationForeground: "#EEEEEE",
        tickTextBrush: "#6495ED",
        upBandSeriesFillColor: "white",
        upBandSeriesLineColor: "white",
        upBodyBrush: "#6495EDA0",
        upWickColor: "#6495ED",
      };

      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        chartRef.current
      );
      sciChartSurface.applyTheme(customTheme);

      const xAxis = new NumericAxis(wasmContext);
      xAxis.isVisible = false; // Hide the X axis labels

      const yAxis = new NumericAxis(wasmContext);
      yAxis.isVisible = false; // Hide the Y axis labels

      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      const dataSeries = new XyDataSeries(wasmContext);
      historicalPrices.forEach(([timestamp, price]) => {
        dataSeries.append(new Date(timestamp).getTime(), price);
      });

      const mountainSeries = new FastMountainRenderableSeries(wasmContext, {
        dataSeries,
        stroke: lineColor,
        strokeThickness: 2,
        fillLinearGradient: new GradientParams(
          new Point(0, 0),
          new Point(0, 1),
          [
            { color: lineColor + "77", offset: 0 },
            { color: "Transparent", offset: 1 },
          ]
        ),
      });

      sciChartSurface.renderableSeries.add(mountainSeries);
    };

    initLineChart();
  }, [coinId]);

  return <div ref={chartRef} className="graph" />;
};

export default Graph;
