import React, {Component} from "react";
import "react-vis/dist/style.css";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from 'react-vis';

export default function Example(props) {
  console.log("the graph is visible", props.visible)

  if (props.visible){
  	const axisStyle = {
    ticks: {
      fontSize: '14px',
      color: '#333'
    },
    title: {
      fontSize: '16px',
      color: '#333'
    }
  };

  const dataArr = props.data.map((d)=> {
        return {x: d.year, 
        y: d.count}
    });
  	return (
    <XYPlot width={300} height={300} xType="ordinal">
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        hideLine
        title="X"
        labelFormat={v => `Value is ${v}`}
        labelValues={[2]}
        style={axisStyle}
      />
      <YAxis hideTicks />
      <LineSeries data={[
          {x: 'Apples', y: 12},
          {x: 'Bananas', y: 2},
          {x: 'Cranberries', y: 11}
        ]}/>
    </XYPlot>
  );
  }
  else{
  	return (<h3>Search your fav restaurant!</h3>)
  }
  
}