import { useState } from "react";
import Button from "../../../common/Button/Button";
import "./AdFormStepDetails.css";

const AdFormStepDetails = ({ type, onNext, onBack }: { type: string; onNext: (data: any) => void; onBack: () => void }) => {
  const [data, setData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="ad-form-step">
      <h2>Детали объявления</h2>
      {type === "Недвижимость" && (
        <>
          <input type="text" name="propertyType" placeholder="Тип недвижимости" onChange={handleChange} />
          <input type="number" name="area" placeholder="Площадь (м²)" onChange={handleChange} />
          <input type="number" name="rooms" placeholder="Количество комнат" onChange={handleChange} />
          <input type="number" name="price" placeholder="Цена" onChange={handleChange} />
        </>
      )}
      {type === "Авто" && (
        <>
          <input type="text" name="brand" placeholder="Марка" onChange={handleChange} />
          <input type="text" name="model" placeholder="Модель" onChange={handleChange} />
          <input type="number" name="year" placeholder="Год выпуска" onChange={handleChange} />
          <input type="number" name="mileage" placeholder="Пробег" onChange={handleChange} />
        </>
      )}
      {type === "Услуги" && (
        <>
          <input type="text" name="serviceType" placeholder="Тип услуги" onChange={handleChange} />
          <input type="number" name="experience" placeholder="Опыт (лет)" onChange={handleChange} />
          <input type="number" name="cost" placeholder="Стоимость" onChange={handleChange} />
          <input type="text" name="workSchedule" placeholder="График работы" onChange={handleChange} />
        </>
      )}
      <Button onClick={onBack}>Назад</Button>
      <Button onClick={() => onNext(data)}>Далее</Button>
    </div>
  );
};

export default AdFormStepDetails;
