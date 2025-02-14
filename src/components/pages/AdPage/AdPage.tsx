import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById, deleteAd } from "../../../services/api";
import { Ad } from "../../../services/types";
import AdInfo from "./components/AdInfo/AdInfo";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import Alert from "../../common/Alert/Alert";
import "./AdPage.css";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const data = await getAdById(id!);
        setAd(data);
      } catch (error) {
        setAlert({ message: "Ошибка загрузки объявления", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAd(id!);
      setAlert({ message: "Объявление успешно удалено", type: "success" });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setAlert({ message: "Ошибка удаления объявления", type: "error" });
    }
  };

  if (loading) return <div className="ad"><Loader/></div>;
  if (!ad) return <div className="ad">Объявление не найдено</div>;

  return (
    <div className="ad">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <h1>{ad.name}</h1>
      <AdInfo ad={ad} />
      <div className="ad__actions">
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button onClick={() => navigate(`/form/${id}`, { state: { mode: 'edit', adId: id } })}>Редактировать</Button>
        <Button variant="danger" onClick={handleDelete}>Удалить</Button>
      </div>
    </div>
  );
};

export default AdPage;
