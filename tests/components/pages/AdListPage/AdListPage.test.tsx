import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdListPage from "../../../../src/components/pages/AdListPage/AdListPage";
import { getAds } from "../../../../src/services/api";
import { Ad } from "../../../../src/services/types";
import React from "react";

jest.mock("../../../../src/services/api");

const mockAds: Ad[] = [
  {
    id: "1",
    name: "Ad 1",
    title: "Ad 1",
    description: "Description 1",
    type: "Услуги",
    serviceType: "cleaning",
    experience: 5,
    cost: 100,
    location: "New York",
  },
  {
    id: "2",
    name: "Ad 1",
    title: "Ad 1",
    description: "Description 1",
    type: "Услуги",
    serviceType: "cleaning",
    experience: 5,
    cost: 100,
    location: "New York",
    images: ["image2.jpg"],
  },
];

describe("AdListPage", () => {
  beforeEach(() => {
    (getAds as jest.Mock).mockResolvedValue(mockAds);
  });

  it("should render ads", async () => {
    render(
      <MemoryRouter>
        <AdListPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByText(mockAds[0].name).length).toBeGreaterThan(0);
    });
  });

  it("should show loader while fetching ads", () => {
    render(
      <MemoryRouter>
        <AdListPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render a list of ads", async () => {
    render(
      <MemoryRouter>
        <AdListPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      mockAds.forEach(ad => {
        expect(screen.getAllByText(ad.name).length).toBeGreaterThan(0);
      });
    });
  });

  it("should render the correct number of ads", async () => {
    render(
      <MemoryRouter>
        <AdListPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const adElements = screen.getAllByTestId("ad-card");
      expect(adElements.length).toBe(mockAds.length);
    });
  });
});
