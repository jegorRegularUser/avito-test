import { useState } from "react";
import "./Filter.css";
import Dropdown from "../DropDown/DropDown";
import Button from "../Button/Button";

interface FilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
  showSearchButton?: boolean;
  searchButtonText?: string;
  className?: string;
}

const Filter = ({
  onFilterChange,
  showSearchButton = true,
  searchButtonText = "Найти",
  className = "",
}: FilterProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setFilters({});
    onFilterChange({});
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={`filter ${className}`}>
      <Dropdown
        options={[
          { value: "real_estate", label: "Недвижимость" },
          { value: "auto", label: "Авто" },
          { value: "services", label: "Услуги" },
        ]}
        placeholder="Выберите категорию"
        onSelect={handleCategoryChange}
      />

      {category === "real_estate" && (
        <>
          <Dropdown
            options={[
              { value: "apartment", label: "Квартира" },
              { value: "house", label: "Дом" },
              { value: "cottage", label: "Коттедж" },
            ]}
            placeholder="Тип недвижимости"
            onSelect={(value) => handleFilterChange("propertyType", value)}
          />
          <input
            type="number"
            placeholder="Площадь (м²)"
            onChange={(e) => handleFilterChange("area", e.target.value)}
          />
          <input
            type="number"
            placeholder="Количество комнат"
            onChange={(e) => handleFilterChange("rooms", e.target.value)}
          />
        </>
      )}

      {category === "auto" && (
        <>
          <Dropdown
            options={[
              { value: "toyota", label: "Toyota" },
              { value: "bmw", label: "BMW" },
              { value: "mercedes", label: "Mercedes" },
            ]}
            placeholder="Марка"
            onSelect={(value) => handleFilterChange("brand", value)}
          />
          <input
            type="text"
            placeholder="Модель"
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
          <input
            type="number"
            placeholder="Год выпуска"
            onChange={(e) => handleFilterChange("year", e.target.value)}
          />
        </>
      )}

      {category === "services" && (
        <>
          <Dropdown
            options={[
              { value: "repair", label: "Ремонт" },
              { value: "cleaning", label: "Уборка" },
              { value: "delivery", label: "Доставка" },
            ]}
            placeholder="Тип услуги"
            onSelect={(value) => handleFilterChange("serviceType", value)}
          />
          <input
            type="number"
            placeholder="Опыт (лет)"
            onChange={(e) => handleFilterChange("experience", e.target.value)}
          />
        </>
      )}

      {showSearchButton && (
        <Button onClick={() => onFilterChange(filters)}>
          {searchButtonText}
        </Button>
      )}
    </div>
  );
};

export default Filter;
