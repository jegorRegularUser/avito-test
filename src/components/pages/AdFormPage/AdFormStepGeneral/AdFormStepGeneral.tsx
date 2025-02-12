import { useState } from "react";
import Dropdown from "../../../common/DropDown/DropDown";
import Button from "../../../common/Button/Button";
import "./AdFormStepGeneral.css";
import { useNavigate } from "react-router-dom";

const AdFormStepGeneral = ({ onNext }: { onNext: (data: any) => void }) => {
  const [data, setData] = useState({ name: "", description: "", location: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value: string) => setData({ ...data, type: value });

  return (
    <div className="ad-form-step">
      <h2>Общие сведения</h2>
      <input type="text" name="name" placeholder="Название" value={data.name} onChange={handleChange} />
      <textarea name="description" placeholder="Описание" value={data.description} onChange={handleChange} />
      <input type="text" name="location" placeholder="Локация" value={data.location} onChange={handleChange} />
      <Dropdown options={[
        { value: "Недвижимость", label: "Недвижимость" },
        { value: "Авто", label: "Авто" },
        { value: "Услуги", label: "Услуги" }
      ]} onSelect={handleTypeChange} />
      <Button onClick={() => onNext(data)}>Далее</Button>
      <button onClick={() => navigate("/list")}>Вернуться назад</button>
    </div>
  );
};

export default AdFormStepGeneral;
