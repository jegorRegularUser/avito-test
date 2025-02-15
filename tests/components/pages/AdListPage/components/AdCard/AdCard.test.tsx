import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdCard from "../../../../../../src/components/pages/AdListPage/components/AdCard/AdCard";
import { Ad } from "../../../../../../src/services/types";
import React from "react";

const mockAd: Ad = {
  id: "1",
  name: "Ad 1",
  title: "Ad 1",
  description: "Description 1",
  price: 100,
  type: "Недвижимость",
  serviceType: "cleaning",
  experience: 5,
  cost: 100,
  location: "New York",
  propertyType: "Apartment",
  area: 120,
  rooms: 3,
};

describe("AdCard", () => {
  it("should render ad details", () => {
    render(
      <MemoryRouter>
        <AdCard {...mockAd} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockAd.name)).toBeInTheDocument();
    expect(screen.getByText(mockAd.location)).toBeInTheDocument();
    expect(screen.getByText(mockAd.type)).toBeInTheDocument();
  });


  
});
