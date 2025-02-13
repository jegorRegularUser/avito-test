import { useNavigate } from "react-router-dom";
import "./AdCard.css";
import Button from "../../../../common/Button/Button";
import { AdBase} from "../../../../../services/types";
interface AdCardProps extends AdBase {
  className?: string;
}

const AdCard = ({ id, name, location, type, price, className = "" }: AdCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={`adCard ${className}`}>
      <div className="details">
        <h3 className="name">{name}</h3>
        <p className="location">{location}</p>
        <p className="type">{type}</p>
        {price !== undefined && <p className="price">{price.toLocaleString()} ₽</p>}
      </div>
      <Button onClick={() => navigate(`/item/${id}`)}>Открыть</Button>
    </div>
  );
};

export default AdCard;
