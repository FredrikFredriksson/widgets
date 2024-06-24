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
import Papa from "papaparse";

const BitcoinSearchVolumeChart = () => {
  const [data, setData] = useState([]);
  const [sciChartSurface, setSciChartSurface] = useState(null);
  const [xyDataSeries, setXyDataSeries] = useState(null);

  useEffect(() => {
    fetch("/Bitcoin_search_volume.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
        }).data;
        setData(
          parsedData.map((item) => ({
            date: new Date(item.date),
            value: item.Bitcoin,
          }))
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    const initSciChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        "search-volume-chart"
      );

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
        tickTextBrush: "gray", // Change xAxis and yAxis label color to gray
        upBandSeriesFillColor: "white",
        upBandSeriesLineColor: "white",
        upBodyBrush: "#6495EDA0",
        upWickColor: "#6495ED",
      };

      sciChartSurface.applyTheme(customTheme);

      const startDate = new Date(2014, 0, 1).getTime(); // January 1, 2014
      const endDate = Date.now();

      // X-Axis: DateTimeNumericAxis to show years
      const xAxis = new DateTimeNumericAxis(wasmContext);
      xAxis.visibleRange = new NumberRange(startDate, endDate);
      xAxis.labelProvider.formatLabel = (date) => {
        const d = new Date(date);
        return d.getFullYear().toString();
      };
      xAxis.labelStyle.color = "gray"; // Set xAxis label color to gray

      // Y-Axis: NumericAxis to show percentages
      const yAxis = new NumericAxis(wasmContext);
      yAxis.labelProvider.formatLabel = (value) => `${value}%`;
      yAxis.autoRange = EAutoRange.Never;
      yAxis.visibleRange = new NumberRange(0, 100);
      yAxis.majorDelta = 20; // Set the majorDelta to 20
      yAxis.axisAlignment = EAxisAlignment.Left;
      yAxis.labelStyle.color = "gray"; // Set yAxis label color to gray
      yAxis.majorGridLineStyle = {
        stroke: "#052144", // Set the dotted line color
        strokeThickness: 1,
        strokeDasharray: [2, 2], // Create a dotted line
      };

      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      const xyDataSeries = new XyDataSeries(wasmContext);
      const lineSeries = new FastLineRenderableSeries(wasmContext, {
        stroke: "#2884F1",
        strokeThickness: 2,
        dataSeries: xyDataSeries,
      });
      sciChartSurface.renderableSeries.add(lineSeries);

      // Add interactivity modifiers
      sciChartSurface.chartModifiers.add(new ZoomPanModifier());
      sciChartSurface.chartModifiers.add(new RolloverModifier());

      setSciChartSurface(sciChartSurface);
      setXyDataSeries(xyDataSeries);
    };

    initSciChart();

    return () => {
      sciChartSurface?.delete();
    };
  }, [data]);

  useEffect(() => {
    if (xyDataSeries) {
      xyDataSeries.clear();
      data.forEach((item) => {
        xyDataSeries.append(item.date.getTime(), item.value);
      });
    }
  }, [data, xyDataSeries]);

  return (
    <div
      id="search-volume-chart"
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
};

export default BitcoinSearchVolumeChart;
