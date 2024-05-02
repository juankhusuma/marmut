import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
  selected: boolean;
};

type MultiValueDropdownProps = {
  options: Option[];
  selectedOptions: Option[];
  onSelect: (option: Option) => void;
};

const MultiValueDropdown: React.FC<MultiValueDropdownProps> = ({ options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onSelect(option);
  };

  const renderOption = (option: Option, index: number) => (
    <div
      key={index}
      className={`option ${option.selected ? 'selected' : ''}`}
      onClick={() => handleSelect(option)}
    >
      {option.label}
      {option.selected && <span className="checkmark">✓</span>}
    </div>
  );

  return (
    <div className="dropdown">
      <div className="selected-options">
        {selectedOptions.map((option, index) => renderOption(option, index))}
      </div>
      <div className={`options ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => renderOption(option, index))}
      </div>
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className="caret" />
      </div>
    </div>
  );
};

export default MultiValueDropdown;