import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../../src/components/common/Button/Button";
import React from "react";

describe("Button", () => {
  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });
});
