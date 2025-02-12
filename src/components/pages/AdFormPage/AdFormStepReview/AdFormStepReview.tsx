import Button from "../../../common/Button/Button";
import "./AdFormStepReview.css";

const AdFormStepReview = ({ data, onBack, onSubmit }: { data: any; onBack: () => void; onSubmit: () => void }) => {
  return (
    <div className="ad-form-step">
      <h2>Подтверждение</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={onBack}>Назад</Button>
      <Button onClick={onSubmit}>Отправить</Button>
    </div>
  );
};

export default AdFormStepReview;
