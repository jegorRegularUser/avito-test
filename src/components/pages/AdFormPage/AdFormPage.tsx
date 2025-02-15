import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdFormStepGeneral from "./AdFormStepGeneral/AdFormStepGeneral";
import AdFormStepDetails from "./AdFormStepDetails/AdFormStepDetails";
import AdFormStepReview from "./AdFormStepReview/AdFormStepReview";
import AdFormNavigation from "./AdFormNavigation/AdFormNavigation";
import { createAd, getAdById, updateAd } from "../../../services/api";
import { AdType, Ad } from "../../../services/types";
import { Loader, Alert } from "../../common";
import "./AdFormPage.css";
import { useNavigate } from "react-router-dom";

const AdFormPage = ({ mode }: { mode: "create" | "edit" }) => {
  const { id: adId } = useParams<{ id: string }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Ad>>();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
            setAlert({ message: "Объявление успешно обновлено!", type: "success" });
            navigate("/list");
          })
          .catch(() => {
            setAlert({ message: "Ошибка при обновлении объявления!", type: "error" });
          });
      } else {
        createAd(formData)
          .then((res) => {
            console.log(res);
            setAlert({ message: "Объявление успешно создано!", type: "success" });
            navigate("/list");
          })
          .catch(() => {
            setAlert({ message: "Ошибка при создании объявления!", type: "error" });
          });
      }
    } else {
      setAlert({ message: "Форма не заполнена!", type: "error" });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="ad-form">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
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
