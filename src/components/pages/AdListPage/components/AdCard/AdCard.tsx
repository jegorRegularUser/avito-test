import { useNavigate } from "react-router-dom";
import "./AdCard.css";
import Button from "../../../../common/Button/Button";
import { AdBase } from "../../../../../services/types";

interface AdCardProps extends AdBase {
  className?: string;
}

const AdCard = ({ id, name, location, type, price, image, className = "" }: AdCardProps) => {
  const navigate = useNavigate();
console.log(image)
  return (
    <div className={`adCard ${className}`}>
      <div className="adCard__image-container">
        {image && image != "null" ? (
          <img src={image} alt={name} className="adCard__image" />
        ) : (
          <div className="adCard__image-placeholder">Нет фотографии</div>
        )}
      </div>
      <div className="adCard__details">
        <h3 className="adCard__name">{name}</h3>
        <p className="adCard__location">{location}</p>
        <p className="adCard__type">{type}</p>
        <Button onClick={() => navigate(`/item/${id}`)}>Открыть</Button>
      </div>
    </div>
  );
};

export default AdCard;
