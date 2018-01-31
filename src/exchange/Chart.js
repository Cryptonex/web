import React, { Component } from 'react';
import Highcharts from "highcharts/highstock";
import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);

class Chart extends Component {
  state = {
    firstRender: false,
  };

  componentDidMount() {
    const state = { ...this.state };
    state.firstRender = true;
    this.setState(state);
    this.chart = Highcharts.stockChart(this.divChart, {
      rangeSelector: {
        enabled: false
      },
      series: [{
        type: 'candlestick',
        name: 'CNX/BTC',
        data: [],
      }],
      yAxis: {
        labels: {
          x: 10,
          align: 'left'
        }
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const state = { ...this.state };
    const charts = this.props.charts;

    if (!charts.processing && charts.processing !== prevProps.charts.processing) {
      this.chart.series[0].name=this.props.pair;
      this.chart.series[0].setData(charts.data, true);
      this.chart.redraw();
    }
  }


  render() {
   const style = {
     height: '400px',
     width: '100%'
   };

   const state = { ...this.state };
   return (
     <div className="row">
       <div className="col-md-12">
         <div
           ref={ref => this.divChart = ref}
           id="chartdiv"
           style={style}
         ></div>
       </div>
     </div>
   )
  }
}

export default Chart;


