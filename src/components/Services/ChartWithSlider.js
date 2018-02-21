import 'babel-polyfill'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import Slider from 'rc-slider'
import * as R from 'ramda'
import { Panel } from 'react-bootstrap'
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

class ChartWithSlider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      minYear: null,
      maxYear: null,
      minValue: null,
      maxValue: null,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { chartConfig: { xAxis: { categories } } } = nextProps
    const minYear = Number(R.head(categories)) || null
    const maxYear = Number(R.last(categories)) || null

    this.setState({
      minYear,
      maxYear,
      minValue: minYear,
      maxValue: maxYear,
    })
  }

  changeYearsRange = (values) => {
    this.setState({
      minValue: values[0],
      maxValue: values[1],
    })
  }

  render () {
    const { chartConfig } = this.props
    const { minYear, maxYear, minValue, maxValue } = this.state

    const newChartConfig = R.compose(
      R.assocPath(['xAxis', 'max'], maxValue - minYear),
      R.assocPath(['xAxis', 'min'], minValue - minYear),
    )(chartConfig)

    return (
      <Panel bsStyle='warning'>
        <ReactHighcharts config={newChartConfig} />
        {minYear && maxYear &&
          <div>
            <strong>{`Choose range of years for chart. Current range: [${minValue}, ${maxValue}]`}</strong>
            <Range
              min={minYear}
              max={maxYear}
              value={[minValue, maxValue]}
              onChange={this.changeYearsRange}
              dots
              dotStyle={{ borderColor: '#ef7500', backgroundColor: '#fcf8e3', height: 12, width: 12, marginBottom: -3 }}
              trackStyle={[{ backgroundColor: '#ef7500', height: 6 }, { backgroundColor: 'ef7500', height: 6 }]}
              railStyle={{ backgroundColor: '#fcf6b4', height: 6 }}
              handleStyle={[
                {
                  borderColor: '#ef7500',
                  height: 16,
                  width: 16,
                  backgroundColor: '#fcf8e3',
                },
                {
                  borderColor: '#ef7500',
                  height: 16,
                  width: 16,
                  backgroundColor: '#fcf8e3',
                },
              ]}
            />
          </div>
        }
      </Panel>
    )
  }
}

export default ChartWithSlider
