import debugFn from 'debug';
import { JSDOM } from 'jsdom';
import * as d3 from "d3";

import extractArray from './lib/extract-array.mjs';

const debug = debugFn('lib:draw-chart');

const [width, height] = [720, 540];
// const [width, height] = [960, 720];

const margin = ({top: 20, right: 20, bottom: 30, left: 40});

const endYear = 2020;

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

const drawChart = (props) => {
    const {
        jurisdictionDef,
        recs,
    } = props;
    
    // note that recs stores array indexes as strings so we use Number() to get the integer year instead 
    const deforestationRateArray = extractArray(recs, 'deforestation-rate').map(pair => [Number(pair[0]), pair[1]]);

    const n = deforestationRateArray.length;
    
    const outerSvg = d3.select(dom.window.document.body).append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", width)
        .attr("height", height)
        .attr('viewBox', [0, 0, width, height]);
    
    const svg = outerSvg.append("g")
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round');

    const [x0, x1] = [deforestationRateArray[0][0], endYear];

    const [y0, y1] = d3.extent(deforestationRateArray.map(pair => pair[1]));

    const x = d3.scaleLinear()
        .domain([x0, x1])
        .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
        .domain([d3.min([y0, 0]), y1])
        .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(t => String(t)))
    
    const yAxis = (g) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        // .call(g => g.select(".domain").remove())

    svg.append('rect')
        .attr("width", width)
        .attr("height", height)
        .attr('fill', '#ffffff')

    svg.append("g").call(xAxis);
    
    svg.append("g").call(yAxis);

    svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(deforestationRateArray)
        .join("circle")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 3);

    return outerSvg.node().outerHTML;
};

export default drawChart;
