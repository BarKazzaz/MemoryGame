import * as React from "react";
import * as d3 from "d3";

export const SimplePieChart = (props) => {
  const data = setData(props.data);
  const height = 400;
  const width = 400;

  let pie = d3.pie()(data);

  function setData(data) {
    if(!data) return [props.games, props.victories]
    let countriesCount = {};
    let arr = [];
    for (let entry of data) {
      if (countriesCount.hasOwnProperty(entry.country)) countriesCount[entry.country]++
      else countriesCount[entry.country] = 1
    }
    arr = []
    for (let v of Object.keys(countriesCount)){
      arr.push(countriesCount[v])
  }
    return arr;
  }

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <Slice pie={pie} />
      </g>
    </svg>
  );
};

const Slice = props => {
  let { pie } = props;

  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);

  let interpolate = d3.interpolateRgb("#1f2dea", "#2dbc10");

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));

    return <path d={arc(slice)} fill={sliceColor} />;
  });
};
