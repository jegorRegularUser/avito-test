import React, { useState } from "react";
import "./DropDown.css";

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
}
 const Dropdown  = ({
  options,
  onSelect,
  placeholder = "Выберите...",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected ? options.find((o) => o.value === selected)?.label : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
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