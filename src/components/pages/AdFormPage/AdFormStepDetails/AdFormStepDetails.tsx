import { useState, useEffect } from "react";
import { Button, Dropdown } from "../../../common";
import "./AdFormStepDetails.css";
import React from "react";
const AdFormStepDetails = ({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: (data: any) => void }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({
    propertyType: false,
    area: false,
    rooms: false,
    price: false,
    brand: false,
    model: false,
    year: false,
    serviceType: false,
    experience: false,
    cost: false,
  });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleDropdownChange = (key: string, value: string | null) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: false });
  };

  const handleNext = () => {
    const newErrors = {
      propertyType: formData.type === "Недвижимость" && !formData.propertyType,
      area: formData.type === "Недвижимость" && !formData.area,
      rooms: formData.type === "Недвижимость" && !formData.rooms,
      price: formData.type === "Недвижимость" && !formData.price,
      brand: formData.type === "Авто" && !formData.brand,
      model: formData.type === "Авто" && !formData.model,
      year: formData.type === "Авто" && !formData.year,
      serviceType: formData.type === "Услуги" && !formData.serviceType,
      experience: formData.type === "Услуги" && !formData.experience,
      cost: formData.type === "Услуги" && !formData.cost,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      onNext(formData);
    }
  };

  const handleBack = () => {
    onBack(formData);
  };

  return (
    <div className="ad-form-step">
      <h2>Детали объявления</h2>
      {formData.type === "Недвижимость" && (
        <>
          <Dropdown
            options={[
              { value: "Квартира", label: "Квартира" },
              { value: "Дом", label: "Дом" },
              { value: "Коттедж", label: "Коттедж" },
            ]}
            placeholder="Выберите тип недвижимости"
            selected={formData.propertyType}
            onSelect={(value) => handleDropdownChange("propertyType", value)}
            error={errors.propertyType}
            customStyles={{ width: "100%", textAlign: "left" }}
          />
          <input
            type="number"
            name="area"
            placeholder="Площадь (м²)"
            value={formData.area}
            onChange={handleChange}
            className={errors.area ? "error" : ""}
          />
          <input
            type="number"
            name="rooms"
            placeholder="Количество комнат"
            value={formData.rooms}
            onChange={handleChange}
            className={errors.rooms ? "error" : ""}
          />
          <input
            type="number"
            name="price"
            placeholder="Цена"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "error" : ""}
          />
        </>
      )}
      {formData.type === "Авто" && (
        <>
          <Dropdown
            options={[
              { value: "Toyota", label: "Toyota" },
              { value: "BMW", label: "BMW" },
              { value: "Mercedes", label: "Mercedes" },
            ]}
            placeholder="Выберите марку машины"
            selected={formData.brand}
            onSelect={(value) => handleDropdownChange("brand", value)}
            error={errors.brand}
            customStyles={{ width: "100%", textAlign: "left" }}
          />
          <input
            type="text"
            name="model"
            placeholder="Модель"
            value={formData.model}
            onChange={handleChange}
            className={errors.model ? "error" : ""}
          />
          <input
            type="number"
            name="year"
            placeholder="Год выпуска"
            value={formData.year}
            onChange={handleChange}
            className={errors.year ? "error" : ""}
          />
          <input
            type="number"
            name="mileage"
            placeholder="Пробег"
            value={formData.mileage}
            onChange={handleChange}
          />
        </>
      )}
      {formData.type === "Услуги" && (
        <>
          <Dropdown
            options={[
              { value: "Ремонт", label: "Ремонт" },
              { value: "Уборка", label: "Уборка" },
              { value: "Доставка", label: "Доставка" },
            ]}
            placeholder="Выберите тип услуги"
            selected={formData.serviceType}
            onSelect={(value) => handleDropdownChange("serviceType", value)}
            error={errors.serviceType}
            customStyles={{ width: "100%", textAlign: "left" }}
          />
          <input
            type="number"
            name="experience"
            placeholder="Опыт (лет)"
            value={formData.experience}
            onChange={handleChange}
            className={errors.experience ? "error" : ""}
          />
          <input
            type="number"
            name="cost"
            placeholder="Стоимость"
            value={formData.cost}
            onChange={handleChange}
            className={errors.cost ? "error" : ""}
          />
          <input
            type="text"
            name="workSchedule"
            placeholder="График работы"
            value={formData.workSchedule}
            onChange={handleChange}
          />
        </>
      )}
      <Button onClick={handleBack}>Назад</Button>
      <Button onClick={handleNext}>Далее</Button>
    </div>
  );
};

export default AdFormStepDetails;
