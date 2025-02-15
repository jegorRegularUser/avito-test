import { useState, useEffect } from "react";
import { Button } from "../../../common";
import "./AdFormStepDetails.css";

const AdFormStepDetails = ({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({
    propertyType: false,
    area: false,
    rooms: false,
    price: false,
    brand: false,
    model: false,
    year: false,
    mileage: false,
    serviceType: false,
    experience: false,
    cost: false,
    workSchedule: false,
  });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
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
      mileage: formData.type === "Авто" && !formData.mileage,
      serviceType: formData.type === "Услуги" && !formData.serviceType,
      experience: formData.type === "Услуги" && !formData.experience,
      cost: formData.type === "Услуги" && !formData.cost,
      workSchedule: formData.type === "Услуги" && !formData.workSchedule,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      onNext(formData);
    }
  };

  return (
    <div className="ad-form-step">
      <h2>Детали объявления</h2>
      {formData.type === "Недвижимость" && (
        <>
          <input
            type="text"
            name="propertyType"
            placeholder="Тип недвижимости"
            value={formData.propertyType}
            onChange={handleChange}
            className={errors.propertyType ? "error" : ""}
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
          <input
            type="text"
            name="brand"
            placeholder="Марка"
            value={formData.brand}
            onChange={handleChange}
            className={errors.brand ? "error" : ""}
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
            className={errors.mileage ? "error" : ""}
          />
        </>
      )}
      {formData.type === "Услуги" && (
        <>
          <input
            type="text"
            name="serviceType"
            placeholder="Тип услуги"
            value={formData.serviceType}
            onChange={handleChange}
            className={errors.serviceType ? "error" : ""}
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
            className={errors.workSchedule ? "error" : ""}
          />
        </>
      )}
      <Button onClick={onBack}>Назад</Button>
      <Button onClick={handleNext}>Далее</Button>
    </div>
  );
};

export default AdFormStepDetails;
