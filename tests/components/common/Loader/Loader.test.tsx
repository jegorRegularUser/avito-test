import { render, screen } from "@testing-library/react";
import Loader from "../../../../src/components/common/Loader/Loader";
import React from "react";

describe("Loader", () => {
  it("should render loader", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
