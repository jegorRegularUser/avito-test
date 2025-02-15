import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ImageUpload from "../../../../src/components/common/ImageUpload/ImageUpload";
import React from "react";

describe("ImageUpload", () => {
  beforeAll(() => {
    window.URL.createObjectURL = jest.fn(() => "mocked-url");
  });

  it("should display uploaded image", () => {
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    const onImageUpload = jest.fn();
    render(<ImageUpload onImageUpload={onImageUpload} />);

    const input = screen.getByLabelText("Выберите файл");
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByAltText("Preview")).toBeInTheDocument();
    expect(onImageUpload).toHaveBeenCalledWith(file);
  });

  it("should call onImageUpload with null when image is removed", () => {
    const onImageUpload = jest.fn();
    render(<ImageUpload onImageUpload={onImageUpload} initialImage="test.png" />);

    fireEvent.click(screen.getByText("Удалить"));
    expect(onImageUpload).toHaveBeenCalledWith(null);
    expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
  });
});
