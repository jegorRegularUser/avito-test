import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../../../../src/components/common/DropDown/DropDown";
import React from "react";

describe("Dropdown", () => {
  it("should display selected option", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    render(<Dropdown options={options} onSelect={jest.fn()} />);

    fireEvent.click(screen.getByText("Выберите..."));
    fireEvent.click(screen.getByText("Option 1"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("should call onSelect with correct value", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    const onSelect = jest.fn();
    render(<Dropdown options={options} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Выберите..."));
    fireEvent.click(screen.getByText("Option 1"));

    expect(onSelect).toHaveBeenCalledWith("option1");
  });
});
