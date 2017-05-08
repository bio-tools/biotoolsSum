import React from 'react'
import PropTypes from 'prop-types'

const Select = (props) => (
  <div className='form-group'>
    <div className='col-3'>
      <label className='form-label'>{props.title}</label>
    </div>
    <div className='col-9'>
      <select
        name={props.name}
        value={props.selectedOption}
        onChange={props.controlFunc}
        className='form-select'>
        {props.options.map(opt => {
          return (
            <option key={opt} value={opt}>{opt}</option>
          )
        })}
      </select>
    </div>
  </div>
)

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default Select
