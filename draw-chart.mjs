import debugFn from 'debug';
import { JSDOM } from 'jsdom';
import * as d3 from "d3";

const debug = debugFn('lib:draw-chart');

const width = 720;
const height = 540

// const width = 960;
// const height = 720;

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

const drawChart = (props) => {
    const {
        jurisdictionDef,
        recs,
    } = props;

    const svg = d3.select(dom.window.document.body).append('svg');

    svg
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr("width", width)
        .attr("height", height)
        .attr('viewBox', [0, 0, width, height]);

    return svg.node().outerHTML;
};

export default drawChart;
