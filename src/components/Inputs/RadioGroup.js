import React from 'react'
import PropTypes from 'prop-types'

const RadioGroup = (props) => (
  <div className='form-group'>
    <div className='col-3'>
      <label className='form-label'>{props.title}</label>
    </div>
    <div className='col-9'>
      {props.options.map(option => {
        return (
          <label key={option} className='form-radio'>
            <input
              name={props.setName}
              onChange={props.controlFunc}
              value={option}
              checked={props.selectedOptions === option}
              type='radio' />
            <i className='form-icon' />
            {option}
          </label>
        )
      })}
    </div>
  </div>
)

RadioGroup.propTypes = {
  title: PropTypes.string.isRequired,
  setName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
}

export default RadioGroup
