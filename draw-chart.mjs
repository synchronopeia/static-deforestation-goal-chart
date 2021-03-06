import debugFn from 'debug';
import { JSDOM } from 'jsdom';
import * as d3 from 'd3';

import extractArray from './lib/extract-array.mjs';

const debug = debugFn('lib:draw-chart');

const [width, height] = [720, 540];
// const [width, height] = [960, 720];

const margin = ({top: 60, right: 20, bottom: 100, left: 80});

const endYear = 2020;

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

const symbolGenerator = d3.symbol('diamond', 32);
	// .size(100);

const drawChart = (props) => {
    const {
        jurisdictionDef,
        recs,
    } = props;
    
    // note that recs stores array indexes as strings so we use Number() to get the integer year instead 
    const deforestationRateArray = extractArray(recs, 'deforestation-rate').map(pair => [Number(pair[0]), pair[1]]);

    const referenceItem = extractArray(recs, 'deforestation-rate-reference').map(pair => [Number(pair[0]), pair[1]])[0];

    const goalItem = extractArray(recs, 'deforestation-rate-goal').map(pair => [Number(pair[0]), pair[1]])[0];

    const n = deforestationRateArray.length;
    
    const outerSvg = d3.select(dom.window.document.body).append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);
    
    const svg = outerSvg.append('g')
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round');

    const [x0, x1] = [deforestationRateArray[0][0], endYear];

    let [y0, y1] = d3.extent(deforestationRateArray.map(pair => pair[1]));
    
    [y0, y1] = [d3.min([y0, 0]), y1];

    const x = d3.scaleLinear()
        .domain([x0, x1])
        .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
        .domain([y0, y1])
        .range([height - margin.bottom, margin.top])
        .nice();

    const xAxis = (g) => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(t => String(t)))
    
    const yAxis = (g) => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call(g => g.select('.domain').remove())

    const line = d3.line()
        .curve(d3.curveCatmullRom)
        .defined(d => (d[1] !== null))
        .x(d => x(d[0]))
        .y(d => y(d[1]));

    // const referenceLine = d3.line()
    //     // .defined(d => (d[1] !== null))
    //     .x(d => x(d[0]))
    //     .y(d => y(d[1]));

    // const regressionLine = d3.line()
    //     .curve(d3.curveCatmullRom)
    //     .x(d => x(d[0]))
    //     .y(d => y(d[1]));

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#ffffff')

    svg.append('g').call(xAxis);
    
    svg.append('g').call(yAxis);

    svg.append('line')
        .attr('x1', x(referenceItem[0]))
        .attr('y1', y(referenceItem[1]))
        .attr('x2', x(deforestationRateArray[0][0]))
        .attr('y2', y(referenceItem[1]))
        .style('stroke', 'steelblue')
        .style('stroke-width', 2);

    svg.append('line')
        .attr('x1', x(referenceItem[0]))
        .attr('y1', y(referenceItem[1]))
        .attr('x2', x(goalItem[0]))
        .attr('y2', y(goalItem[1]))
        .style('stroke', 'green')
        .style('stroke-width', 2);

    svg.append('path')
      .datum(deforestationRateArray)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
    //   .attr('stroke-dasharray', `0,${l}`)
      .attr('d', line)

      svg.append('g')
        // .attr('stroke', 'steelblue')
        // .attr('stroke-width', 1.5)
        .attr('fill', '#ffffff')
        .selectAll('circle')
        .data(deforestationRateArray.filter(d => d[1] !== null))
        .join('circle')
            .attr('cx', d => x(d[0]))
            .attr('cy', d => y(d[1]))
            .attr('r', 8);

    svg.append('g')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .selectAll('circle')
        .data(deforestationRateArray.filter(d => d[1] !== null))
        .join('circle')
            .attr('cx', d => x(d[0]))
            .attr('cy', d => y(d[1]))
            .attr('r', 4);

    svg.append('path')
        .attr('transform', `translate(${x(goalItem[0])},${y(goalItem[1])})`)
        .attr('d', `${d3.symbol(d3.symbolDiamond, 250)()}`)
        .attr('fill', '#ffffff')

    svg.append('path')
        .attr('transform', `translate(${x(goalItem[0])},${y(goalItem[1])})`)
        .attr('d', `${d3.symbol(d3.symbolDiamond, 150)()}`)
        .attr('fill', '#33cc33')

    //     // .join('path')
    //     .attr('d', symbolGenerator.type('symbolDiamond'))

    // debug(d3.symbols[0])
    return outerSvg.node().outerHTML;
};

export default drawChart;
