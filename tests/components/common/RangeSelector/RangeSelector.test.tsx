import { render, screen, fireEvent } from "@testing-library/react";
import RangeSelector from "../../../../src/components/common/RangeSelector/RangeSelector";
import React from "react";

describe("RangeSelector", () => {
  it("should call onRangeChange with correct values", () => {
    const onRangeChange = jest.fn();
    render(<RangeSelector onRangeChange={onRangeChange} placeholder="Test" />);
    
    const minInput = screen.getByPlaceholderText("Test от");
    const maxInput = screen.getByPlaceholderText("Test до");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "20" } });

    expect(onRangeChange).toHaveBeenCalledWith([10, 20]);
  });
});
