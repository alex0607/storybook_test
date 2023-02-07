import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './customSearchField.css';

const SearchIcon = ({ className = '' }) => (
  <svg className={className} width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d={
      `M13.255 11.255H12.465L12.185 10.985C13.165 9.845 13.755 8.365 13.755 6.755C13.755 3.165 10.845 0.255005 7.255
       0.255005C3.665 0.255005 0.755005 3.165 0.755005 6.755C0.755005 10.345 3.665 13.255 7.255 13.255C8.865
        13.255 10.345 12.665 11.485 11.685L11.755 11.965V12.755L16.755 17.745L18.245 16.255L13.255 11.255ZM7.255
         11.255C4.76501 11.255 2.755 9.245 2.755 6.755C2.755 4.26501 4.76501 2.255 7.255 2.255C9.745 2.255 11.755
          4.26501 11.755 6.755C11.755 9.245 9.745 11.255 7.255 11.255Z`
      }
      fill="#C1C7D0"
    />
  </svg>
);

/**
 * Primary UI component for user interaction
 */
export const CustomSearchField = ({ placeholder, size, onChange, value, ...props }) => {
  return (
    <Input
      className="custom-search-field"
      size={size}
      placeholder={placeholder}
      prefix={<SearchIcon className="custom-search-field__icon" />}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

CustomSearchField.propTypes = {
  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * How large should the input be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Input value
   */
  value: PropTypes.string.isRequired,
  /**
   * Optional change handler
   */
  onChange: PropTypes.func,
};

CustomSearchField.defaultProps = {
  value: '',
  placeholder: '',
  size: 'large',
  onChange: undefined,
};
