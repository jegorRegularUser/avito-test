import { useState } from "react";
import AdFormStepGeneral from "./AdFormStepGeneral/AdFormStepGeneral";
import AdFormStepDetails from "./AdFormStepDetails/AdFormStepDetails";
import AdFormStepReview from "./AdFormStepReview/AdFormStepReview";
import AdFormNavigation from "./AdFormNavigation/AdFormNavigation";
import { createAd } from "../../../services/api";
import { AdType } from "../../../services/types";
import "./AdFormPage.css";
import { useNavigate } from "react-router-dom";

const AdFormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "" as AdType,
  });

  const navigate = useNavigate();

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    createAd(formData)
      .then((res) => {
        console.log(res);
        alert("Объявление успешно создано!");
        navigate("/list");
      })
      .catch(() => {
        alert("Ошибка при создании объявления!");
      });
  };

  return (
    <div className="ad-form">
      {step === 1 && <AdFormStepGeneral onNext={handleNext} />}
      {step === 2 && <AdFormStepDetails type={formData.type} onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <AdFormStepReview data={formData} onBack={handleBack} onSubmit={handleSubmit} />}
      <AdFormNavigation step={step} onBack={handleBack} />
    </div>
  );
};

export default AdFormPage;
