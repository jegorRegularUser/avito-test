import { Ad } from "../../../../../services/types";
import "./AdInfo.css";

const AdInfo = ({ ad }: { ad: Ad }) => {
  return (
    <div className="ad-info">
      {ad.image && ad.image != 'null' ? (
        <img src={ad.image} alt={ad.name} className="ad-info__image" />
      ) : (
        <div className="ad-info__image-placeholder">Нет фотографии</div>
      )}
      <div className="ad-info__details">
        <p><span>Адрес:</span> {ad.location}</p>
        <p><span>Категория:</span> {ad.type}</p>
        
        {ad.type === "Недвижимость" && (
          <>
            <p><span>Тип недвижимости:</span> {ad.propertyType}</p>
            <p><span>Площадь:</span> {ad.area} м²</p>
            <p><span>Комнат:</span> {ad.rooms}</p>
            <p><span>Цена:</span> {ad.price} ₽</p>
          </>
        )}
        
        {ad.type === "Авто" && (
          <>
            <p><span>Марка:</span> {ad.brand}</p>
            <p><span>Модель:</span> {ad.model}</p>
            <p><span>Год выпуска:</span> {ad.year}</p>
            {ad.mileage && <p><span>Пробег:</span> {ad.mileage} км</p>}
          </>
        )}
        
        {ad.type === "Услуги" && (
          <>
            <p><span>Тип услуги:</span> {ad.serviceType}</p>
            <p><span>Опыт:</span> {ad.experience} лет</p>
            <p><span>Стоимость:</span> {ad.cost} ₽</p>
            {ad.workSchedule && <p><span>График работы:</span> {ad.workSchedule}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default AdInfo;
