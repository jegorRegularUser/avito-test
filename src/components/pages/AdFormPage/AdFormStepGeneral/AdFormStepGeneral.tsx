import { useState, useEffect } from "react";
import { Dropdown, Button, ImageUpload } from "../../../common";
import "./AdFormStepGeneral.css";

const AdFormStepGeneral = ({ data, onNext }: { data: any; onNext: (data: any) => void }) => {
  const [formData, setFormData] = useState(data || {
    name: "",
    description: "",
    location: "",
    type: "",
    image: null,
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    location: false,
    type: false,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleTypeChange = (value: string | null) => {
    setFormData({ 
      ...formData, 
      type: value, 
      "Тип недвижимости": "", 
      "Площадь": "", 
      "Количество комнат": "", 
      "Марка": "", 
      "Модель": "", 
      "Год выпуска": "", 
      "Тип услуги": "", 
      "Опыт (лет)": "" 
    });
    setErrors({ ...errors, type: false });
  };

  const handleImageUpload = (file: File | null) => {
    setFormData({ ...formData, image: file });
  };

  const handleNext = () => {
    const newErrors = {
      name: !formData.name,
      description: !formData.description,
      location: !formData.location,
      type: !formData.type,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      onNext(formData);
    }
  };

  return (
    <div className="ad-form-step">
      <h2>Общие сведения</h2>
      <input
        type="text"
        name="name"
        placeholder="Название"
        value={formData.name}
        onChange={handleChange}
        className={errors.name ? "error" : ""}
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
        className={errors.description ? "error" : ""}
      />
      <input
        type="text"
        name="location"
        placeholder="Локация"
        value={formData.location}
        onChange={handleChange}
        className={errors.location ? "error" : ""}
      />
      <Dropdown
        options={[
          { value: "Недвижимость", label: "Недвижимость" },
          { value: "Авто", label: "Авто" },
          { value: "Услуги", label: "Услуги" }
        ]}
        selected={formData.type}
        onSelect={handleTypeChange}
        placeholder="Выберите категорию"
        customStyles={{ width: "100%", textAlign: "left" }}
        error={errors.type}
      />
      <ImageUpload
        onImageUpload={handleImageUpload}
        initialImage={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
        isImageLoaded={!!formData.image}
      />
      <Button onClick={handleNext}>Далее</Button>
    </div>
  );
};

export default AdFormStepGeneral;
