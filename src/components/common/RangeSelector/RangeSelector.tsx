import React, { useState } from "react";
import "./RangeSelector.css";

interface RangeSelectorProps {
  placeholder?: string;
  onRangeChange: (range: [number, number]) => void;
  width?: string;
}

const RangeSelector = ({ placeholder, onRangeChange, width = "100px" }: RangeSelectorProps) => {
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : "";
    setMin(value);
    onRangeChange([value as number, max as number]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : "";
    setMax(value);
    onRangeChange([min as number, value as number]);
  };

  return (
    <div className="range-selector" style={{ width }}>
      <input
        type="number"
        placeholder={`${placeholder} от`}
        value={min}
        onChange={handleMinChange}
        style={{ width: `calc(${width} / 2 - 5px)` }}
      />
      <input
        type="number"
        placeholder={`${placeholder} до`}
        value={max}
        onChange={handleMaxChange}
        style={{ width: `calc(${width} / 2 - 5px)` }}
      />
    </div>
  );
};

export default RangeSelector;
