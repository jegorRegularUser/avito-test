import { useState } from "react";
import "./Filter.css";
import { Dropdown, Button, RangeSelector } from "../../common";

interface FilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
  showSearchButton?: boolean;
  searchButtonText?: string;
  className?: string;
}

const Filter = ({
  onFilterChange,
  showSearchButton = true,
  searchButtonText = "Фильтровать",
  className = "",
}: FilterProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({});

  const handleCategoryChange = (value: string | null) => {
    setCategory(value);
    const newFilters = { ...tempFilters, type: value };
    setTempFilters(newFilters);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...tempFilters, [key]: value };
    setTempFilters(newFilters);
  };

  const handleRangeChange = (key: string, range: [number, number]) => {
    const newFilters = { ...tempFilters, [key]: range };
    setTempFilters(newFilters);
  };

  const handleFilterButtonClick = () => {
    setFilters(tempFilters);
    onFilterChange(tempFilters);
  };

  return (
    <div className={`filter ${className}`}>
      <Dropdown
        options={[
          { value: "Недвижимость", label: "Недвижимость" },
          { value: "Авто", label: "Авто" },
          { value: "Услуги", label: "Услуги" },
        ]}
        placeholder="Выберите категорию"
        onSelect={handleCategoryChange}
      />

      {category === "Недвижимость" && (
        <>
          <Dropdown
            options={[
              { value: "Квартира", label: "Квартира" },
              { value: "Дом", label: "Дом" },
              { value: "Коттедж", label: "Коттедж" },
            ]}
            placeholder="Тип недвижимости"
            onSelect={(value) => handleFilterChange("propertyType", value)}
          />
          <RangeSelector
            placeholder="Площадь"
            onRangeChange={(range) => handleRangeChange("area", range)}
            width="300px"
          />
          <RangeSelector
            placeholder="Кол-во комнат"
            onRangeChange={(range) => handleRangeChange("rooms", range)}
            width="370px"
          />
        </>
      )}

      {category === "Авто" && (
        <>
          <Dropdown
            options={[
              { value: "Toyota", label: "Toyota" },
              { value: "BMW", label: "BMW" },
              { value: "Mercedes", label: "Mercedes" },
            ]}
            placeholder="Марка"
            onSelect={(value) => handleFilterChange("brand", value)}
          />
          <input
            type="text"
            placeholder="Модель"
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
          <RangeSelector
            placeholder="Год выпуска"
            onRangeChange={(range) => handleRangeChange("year", range)}
            width="330px"
          />
        </>
      )}

      {category === "Услуги" && (
        <>
          <Dropdown
            options={[
              { value: "Ремонт", label: "Ремонт" },
              { value: "Уборка", label: "Уборка" },
              { value: "Доставка", label: "Доставка" },
            ]}
            placeholder="Тип услуги"
            onSelect={(value) => handleFilterChange("serviceType", value)}
          />
          <RangeSelector
            placeholder="Опыт (лет)"
            onRangeChange={(range) => handleRangeChange("experience", range)}
            width="310px"
          />
        </>
      )}

      {showSearchButton && (
        <Button onClick={handleFilterButtonClick}>
          {searchButtonText}
        </Button>
      )}
    </div>
  );
};

export default Filter;
