import React, { useEffect, useRef, useState } from "react";
import { SciChartSurface, NumericAxis, Rect } from "scichart";
import Graph from "../Graph";
import "./parentChart.css";
import { getCoins } from "../../../../services/coinService";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { EHorizontalAnchorPoint } from "scichart/types/AnchorPoint";
import { EVerticalAnchorPoint } from "scichart/types/AnchorPoint";

const ParentChart = ({ coinId }) => {
  const chartRef = useRef(null);
  const [subChartContext, setSubChartContext] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      const coinsData = await getCoins();
      console.log(coinsData);
      const coin = coinsData.find((coin) => coin.id === coinId);
      setSelectedCoin(coin);
    };
    fetchCoin();
  }, [coinId]);

  useEffect(() => {
    const initParentChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        chartRef.current
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
        tickTextBrush: "#6495ED",
        upBandSeriesFillColor: "white",
        upBandSeriesLineColor: "white",
        upBodyBrush: "#6495EDA0",
        upWickColor: "#6495ED",
      };

      sciChartSurface.applyTheme(customTheme);

      // Add axes to the main chart
      const xAxis = new NumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);
      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);
      xAxis.isVisible = false;
      yAxis.isVisible = false;

      // Create the sub-chart on the main surface
      const subChartSurface = sciChartSurface.addSubChart({
        position: new Rect(0.05, 0.45, 0.5, 0.5),
      });

      // Add axes to the sub-chart
      subChartSurface.xAxes.add(new NumericAxis(wasmContext));
      subChartSurface.yAxes.add(new NumericAxis(wasmContext));

      subChartSurface.xAxes.get(0).isVisible = false;
      subChartSurface.yAxes.get(0).isVisible = false;

      setSubChartContext({ subChartSurface, wasmContext });

      sciChartSurface.annotations.add(
        new TextAnnotation({
          x1: 0.15,
          y1: 0.1,
          xCoordinateMode: ECoordinateMode.Relative,
          yCoordinateMode: ECoordinateMode.Relative,
          textColor: "yellow",
          fontSize: 24,
          fontFamily: "Arial",
          text: selectedCoin.name,
        })
      );
      sciChartSurface.annotations.add(
        new TextAnnotation({
          x1: 0.8,
          y1: 0.1,
          xCoordinateMode: ECoordinateMode.Relative,
          yCoordinateMode: ECoordinateMode.Relative,
          textColor: "yellow",
          fontSize: 24,
          fontFamily: "Arial",
          text: selectedCoin.symbol,
        })
      );

      sciChartSurface.annotations.add(
        new TextAnnotation({
          x1: 0.5,
          y1: 0.1,
          xCoordinateMode: ECoordinateMode.Relative,
          yCoordinateMode: ECoordinateMode.Relative,
          textColor: "yellow",
          fontSize: 24,
          fontFamily: "Arial",
          text: `USD ${selectedCoin.current_price}`,
        })
      );

      sciChartSurface.annotations.add(
        new TextAnnotation({
          x1: 0.8,
          y1: 0.9,
          xCoordinateMode: ECoordinateMode.Relative,
          yCoordinateMode: ECoordinateMode.Relative,
          textColor: "yellow",
          fontSize: 24,
          fontFamily: "Arial",
          text: selectedCoin.price_change_percentage_24h,
        })
      );
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
