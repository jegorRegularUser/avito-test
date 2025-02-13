import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById } from "../../../services/api";
import { Ad } from "../../../services/types";
import AdInfo from "./components/AdInfo/AdInfo";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import "./AdPage.css";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const data = await getAdById(id!);
        setAd(data);
      } catch (error) {
        alert("Ошибка загрузки объявления");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  if (loading) return <div className="ad"><Loader/></div>;
  if (!ad) return <div className="ad">Объявление не найдено</div>;

  return (
    <div className="ad">
      <h1>{ad.name}</h1>
      <AdInfo ad={ad} />
      <div className="ad__actions">
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button onClick={() => navigate(`/form/${id}`, { state: { mode: 'edit', adId: id } })}>Редактировать</Button>
      </div>
    </div>
  );
};

export default AdPage;
