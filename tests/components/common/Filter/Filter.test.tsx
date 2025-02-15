import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../../../../src/components/common/Filter/Filter";
import React from "react";

describe("Filter", () => {
  it("should call onFilterChange with correct values", () => {
    const onFilterChange = jest.fn();
    render(<Filter onFilterChange={onFilterChange} />);

    fireEvent.click(screen.getByText("Выберите категорию"));
    fireEvent.click(screen.getByText("Недвижимость"));

    expect(onFilterChange).toHaveBeenCalledWith({ type: "Недвижимость" });
  });
});
