import Button from "../../../common/Button/Button";
import "./AdFormStepReview.css";

const AdFormStepReview = ({
  data,
  onBack,
  onSubmit,
}: {
  data: any;
  onBack: (data: any) => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="ad-form-step">
      <h2>Подтверждение</h2>
      <div className="ad-info">
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
        <div className="ad-info__details">
          <p><span>Название:</span> {data.name}</p>
          <p><span>Описание:</span> {data.description}</p>
          <p><span>Локация:</span> {data.location}</p>
          <p><span>Категория:</span> {data.type}</p>
          
          {data.type === "Недвижимость" && (
            <>
              <p><span>Тип недвижимости:</span> {data.propertyType}</p>
              <p><span>Площадь:</span> {data.area} м²</p>
              <p><span>Количество комнат:</span> {data.rooms}</p>
              <p><span>Цена:</span> {data.price} ₽</p>
            </>
          )}
          
          {data.type === "Авто" && (
            <>
              <p><span>Марка:</span> {data.brand}</p>
              <p><span>Модель:</span> {data.model}</p>
              <p><span>Год выпуска:</span> {data.year}</p>
              {data.mileage && <p><span>Пробег:</span> {data.mileage} км</p>}
            </>
          )}
          
          {data.type === "Услуги" && (
            <>
              <p><span>Тип услуги:</span> {data.serviceType}</p>
              <p><span>Опыт:</span> {data.experience} лет</p>
              <p><span>Стоимость:</span> {data.cost} ₽</p>
              {data.workSchedule && <p><span>График работы:</span> {data.workSchedule}</p>}
            </>
          )}
        </div>
      </div>
      <Button onClick={() => onBack(data)}>Назад</Button>
      <Button onClick={onSubmit}>Отправить</Button>
    </div>
  );
};

export default AdFormStepReview;
