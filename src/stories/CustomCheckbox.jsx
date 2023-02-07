import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import './customCheckbox.css';

/**
 * Primary UI component for user interaction
 */
export const CustomCheckbox = ({ label, checked, onChange, ...props}) => {
  return (<Checkbox onChange={onChange} checked={checked} {...props}>{label}</Checkbox>);
};

CustomCheckbox.propTypes = {
  /**
   * Is this the principal call to action on the page?
   * Checkbox contents
   */
  label: PropTypes.oneOfType([PropTypes.string,PropTypes.node]).isRequired,
  /**
   * Optional click handler
   */
  onChange: PropTypes.func,
  /**
   * Checkbox status
   */
  checked: PropTypes.bool,
};

CustomCheckbox.defaultProps = {
  label: '',
  checked: false,
  onChange: undefined,
};
