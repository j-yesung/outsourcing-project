import React from 'react';

const SelectDropdown = ({ value, onChange, options, placeholder }) => {
  return (
    <div>
      <select value={value} onChange={onChange}>
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
