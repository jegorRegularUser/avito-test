import { Ad } from "../../../../../services/types";
import "./AdInfo.css";

const AdInfo = ({ ad }: { ad: Ad }) => {
  return (
    <div className="ad-info">
      {ad.image ? (
        <img src={ad.image} alt={ad.name} className="ad-info__image" />
      ) : (
        <div className="ad-info__image-placeholder">No Image</div>
      )}
      <p><strong>Локация:</strong> {ad.location}</p>
      <p><strong>Тип:</strong> {ad.type}</p>
      
      {ad.type === "Недвижимость" && (
        <>
          <p><strong>Тип недвижимости:</strong> {ad.propertyType}</p>
          <p><strong>Площадь:</strong> {ad.area} м²</p>
          <p><strong>Комнат:</strong> {ad.rooms}</p>
          <p><strong>Цена:</strong> {ad.price} ₽</p>
        </>
      )}
      
      {ad.type === "Авто" && (
        <>
          <p><strong>Марка:</strong> {ad.brand}</p>
          <p><strong>Модель:</strong> {ad.model}</p>
          <p><strong>Год выпуска:</strong> {ad.year}</p>
          {ad.mileage && <p><strong>Пробег:</strong> {ad.mileage} км</p>}
        </>
      )}
      
      {ad.type === "Услуги" && (
        <>
          <p><strong>Тип услуги:</strong> {ad.serviceType}</p>
          <p><strong>Опыт:</strong> {ad.experience} лет</p>
          <p><strong>Стоимость:</strong> {ad.cost} ₽</p>
          {ad.workSchedule && <p><strong>График работы:</strong> {ad.workSchedule}</p>}
        </>
      )}
    </div>
  );
};

export default AdInfo;
