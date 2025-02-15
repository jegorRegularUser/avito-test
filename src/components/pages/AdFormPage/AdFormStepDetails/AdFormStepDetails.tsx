import { useState, useEffect } from "react";
import { Button } from "../../../common";
import "./AdFormStepDetails.css";

const AdFormStepDetails = ({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "type") {
      setFormData({ type: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="ad-form-step">
      <h2>Детали объявления</h2>
      <input type="text" name="type" placeholder="Тип" value={formData.type} onChange={handleChange} />
      {formData.type === "Недвижимость" && (
        <>
          <input type="text" name="propertyType" placeholder="Тип недвижимости" value={formData.propertyType} onChange={handleChange} />
          <input type="number" name="area" placeholder="Площадь (м²)" value={formData.area} onChange={handleChange} />
          <input type="number" name="rooms" placeholder="Количество комнат" value={formData.rooms} onChange={handleChange} />
          <input type="number" name="price" placeholder="Цена" value={formData.price} onChange={handleChange} />
        </>
      )}
      {formData.type === "Авто" && (
        <>
          <input type="text" name="brand" placeholder="Марка" value={formData.brand} onChange={handleChange} />
          <input type="text" name="model" placeholder="Модель" value={formData.model} onChange={handleChange} />
          <input type="number" name="year" placeholder="Год выпуска" value={formData.year} onChange={handleChange} />
          <input type="number" name="mileage" placeholder="Пробег" value={formData.mileage} onChange={handleChange} />
        </>
      )}
      {formData.type === "Услуги" && (
        <>
          <input type="text" name="serviceType" placeholder="Тип услуги" value={formData.serviceType} onChange={handleChange} />
          <input type="number" name="experience" placeholder="Опыт (лет)" value={formData.experience} onChange={handleChange} />
          <input type="number" name="cost" placeholder="Стоимость" value={formData.cost} onChange={handleChange} />
          <input type="text" name="workSchedule" placeholder="График работы" value={formData.workSchedule} onChange={handleChange} />
        </>
      )}
      <Button onClick={onBack}>Назад</Button>
      <Button onClick={() => onNext(formData)}>Далее</Button>
    </div>
  );
};

export default AdFormStepDetails;
