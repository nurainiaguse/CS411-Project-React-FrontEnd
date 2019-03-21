import React, {Component} from "react";
import "react-vis/dist/style.css";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  RadialChart,
} from 'react-vis';

const greenData = [{x: 'Risk 1', y: 10}, {x: 'Risk 2', y: 5}, {x: 'Risk 3', y: 15}];

const blueData = [{x: 'Risk 1', y: 12}, {x: 'Risk 2', y: 2}, {x: 'Risk 3', y: 11}];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y)
}));
const myData = [{label:"Risk 1", angle: 1}, { label: "Risk 2", angle: 5}, {label: "Risk 3", angle: 2}]

export default function Zipcodevis(props) {

	const BarSeries = VerticalBarSeries;
	return (
		<RadialChart
		showLabels
  data={myData}
  width={300}
  height={300} />
		// <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
  //         <VerticalGridLines />
  //         <HorizontalGridLines />
  //         <XAxis />
  //         <YAxis />
  //         <BarSeries className="vertical-bar-series-example" data={greenData} />
  //         <BarSeries data={blueData} />
  //         <LabelSeries data={labelData} getLabel={d => d.x} />
  //   </XYPlot>
	)
}