import React from 'react'
import PropTypes from 'prop-types'

const CheckboxGroup = (props) => (
  <div>
    <div className='col-3'>
      <label className='form-label'>{props.title}</label>
    </div>
    <div className='col-9'>
      <div className='checkbox-group'>
        {props.options.map(option => {
          return (
            <label key={option} className='form-checkbox'>
              <input
                name={props.setName}
                onChange={props.controlFunc}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type='checkbox' />
              <i className='form-icon' />
              {option}
            </label>
          )
        })}
      </div>
    </div>
  </div>
)

CheckboxGroup.propTypes = {
  title: PropTypes.string.isRequired,
  setName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  controlFunc: PropTypes.func.isRequired,
}

export default CheckboxGroup
