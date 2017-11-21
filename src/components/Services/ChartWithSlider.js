import 'babel-polyfill'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import Slider from 'rc-slider'
import * as R from 'ramda'
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
      <div>
        <ReactHighcharts config={newChartConfig} />
        {minYear && maxYear &&
          <Range min={minYear} max={maxYear} defaultValue={[minYear, maxYear]} onAfterChange={this.changeYearsRange} />}
      </div>
    )
  }
}

export default ChartWithSlider
