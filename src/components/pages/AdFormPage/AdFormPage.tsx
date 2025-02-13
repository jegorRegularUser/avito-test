import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdFormStepGeneral from "./AdFormStepGeneral/AdFormStepGeneral";
import AdFormStepDetails from "./AdFormStepDetails/AdFormStepDetails";
import AdFormStepReview from "./AdFormStepReview/AdFormStepReview";
import AdFormNavigation from "./AdFormNavigation/AdFormNavigation";
import { createAd, getAdById, updateAd } from "../../../services/api";
import { AdType, Ad } from "../../../services/types";
import Loader from "../../common/Loader/Loader";
import "./AdFormPage.css";
import { useNavigate } from "react-router-dom";

const AdFormPage = ({ mode }: { mode: "create" | "edit" }) => {
  const { id: adId } = useParams<{ id: string }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Ad>>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && adId) {
      getAdById(adId).then((data) => {
        setFormData(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [mode, adId]);

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (formData) {
      if (mode === "edit" && adId) {
        updateAd(adId, formData)
          .then((res) => {
            console.log(res);
            alert("Объявление успешно обновлено!");
            navigate("/list");
          })
          .catch(() => {
            alert("Ошибка при обновлении объявления!");
          });
      } else {
        createAd(formData)
          .then((res) => {
            console.log(res);
            alert("Объявление успешно создано!");
            navigate("/list");
          })
          .catch(() => {
            alert("Ошибка при создании объявления!");
          });
      }
    } else {
      alert("Форма не заполнена!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="ad-form">
      {step === 1 && <AdFormStepGeneral data={formData} onNext={handleNext} />}
      {step === 2 && formData && (
        <AdFormStepDetails
          data={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <AdFormStepReview
          data={formData}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
      <AdFormNavigation step={step} onBack={handleBack} />
    </div>
  );
};

export default AdFormPage;
