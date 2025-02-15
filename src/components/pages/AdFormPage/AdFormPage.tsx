import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdFormStepGeneral from "./AdFormStepGeneral/AdFormStepGeneral";
import AdFormStepDetails from "./AdFormStepDetails/AdFormStepDetails";
import AdFormStepReview from "./AdFormStepReview/AdFormStepReview";
import { createAd, getAdById, updateAd } from "../../../services/api";
import { Ad } from "../../../services/types";
import { Loader, Button } from "../../common";
import { showAlert } from "../../../App";
import "./AdFormPage.css";

const AdFormPage = ({ mode }: { mode: "create" | "edit" }) => {
  const { id: adId } = useParams<{ id: string }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Ad>>({});
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

  const handleBack = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (formData) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key]) {
            formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key] as string);
        }
      });

      if (mode === "edit" && adId) {
        updateAd(adId, formDataToSend)
          .then((res) => {
            showAlert("Объявление успешно обновлено!", "success");
            navigate("/list");
          })
          .catch(() => {
            showAlert("Ошибка при обновлении объявления!", "error");
          });
      } else {
        createAd(formDataToSend)
          .then((res) => {
            showAlert("Объявление успешно создано!", "success");
            navigate("/list");
          })
          .catch(() => {
            showAlert("Ошибка при создании объявления!", "error");
          });
      }
    } else {
      showAlert("Форма не заполнена!", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="ad-form">
        {step === 1 && (
          <AdFormStepGeneral data={formData} onNext={handleNext} />
        )}
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
      </div>
      <Button className="btn-back" onClick={() => navigate("/list")}>
        Вернуться на лист
      </Button>
    </>
  );
};

export default AdFormPage;
