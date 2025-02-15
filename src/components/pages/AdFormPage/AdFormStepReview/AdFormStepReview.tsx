import Button from "../../../common/Button/Button";
import "./AdFormStepReview.css";

const AdFormStepReview = ({
  data,
  onBack,
  onSubmit,
}: {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="ad-form-step">
      <h2>Подтверждение</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data.image && (
        <div className="image-preview">
          <img
            src={
              data.image instanceof File
                ? URL.createObjectURL(data.image)
                : data.image
            }
            alt="Preview"
          />
        </div>
      )}
      <Button onClick={onBack}>Назад</Button>
      <Button onClick={onSubmit}>Отправить</Button>
    </div>
  );
};

export default AdFormStepReview;
