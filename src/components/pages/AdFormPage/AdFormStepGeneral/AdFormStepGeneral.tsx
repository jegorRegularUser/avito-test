import { useState, useEffect } from "react";
import { Dropdown, Button } from "../../../common";
import "./AdFormStepGeneral.css";
import { useNavigate } from "react-router-dom";

const AdFormStepGeneral = ({ data, onNext }: { data: any; onNext: (data: any) => void }) => {
  const [formData, setFormData] = useState(data || {
    name: "",
    description: "",
    location: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value: string  | null) => {
    setFormData({ ...formData, type: value, propertyType: "", area: "", rooms: "", price: "", brand: "", model: "", year: "", mileage: "", serviceType: "", experience: "", cost: "", workSchedule: "" });
  };

  return (
    <div className="ad-form-step">
      <h2>Общие сведения</h2>
      <input type="text" name="name" placeholder="Название" value={formData.name} onChange={handleChange} />
      <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
      <input type="text" name="location" placeholder="Локация" value={formData.location} onChange={handleChange} />
      <Dropdown options={[
        { value: "Недвижимость", label: "Недвижимость" },
        { value: "Авто", label: "Авто" },
        { value: "Услуги", label: "Услуги" }
      ]} selected={formData.type} onSelect={handleTypeChange} />
      <Button onClick={() => onNext(formData)}>Далее</Button>
      <button onClick={() => navigate("/list")}>Вернуться назад</button>
    </div>
  );
};

export default AdFormStepGeneral;
