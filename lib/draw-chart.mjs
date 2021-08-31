import debugFn from 'debug';

const debug = debugFn('lib:draw-chart');


const drawChart = (props) => {
    const {
        jurisdictionDef,
        recs,
    } = props;

    debug(recs);
};

export default drawChart;
