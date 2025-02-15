import React, { useState, useEffect } from "react";
import "./DropDown.css";

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string | null) => void;
  placeholder?: string;
  selected?: string | null;
  customStyles?: React.CSSProperties;
  className?: string;
  error?: boolean;
}

const Dropdown = ({
  options,
  onSelect,
  placeholder = "Выберите...",
  selected: initialSelected,
  customStyles = {},
  className = "",
  error = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(initialSelected || null);

  useEffect(() => {
    setSelected(initialSelected || null);
  }, [initialSelected]);

  const handleSelect = (value: string | null) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`} style={customStyles}>
      <div className={`dropdown-toggle ${error ? "error" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {selected ? options.find((o) => o.value === selected)?.label : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item clear-option" onClick={() => handleSelect(null)}>
            Очистить выбор
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
