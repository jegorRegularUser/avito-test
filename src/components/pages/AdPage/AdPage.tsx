import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById, deleteAd } from "../../../services/api";
import { Ad } from "../../../services/types";
import AdInfo from "./components/AdInfo/AdInfo";
import { Button, Loader, Alert } from "../../common";
import "./AdPage.css";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    getAdById(id!)
      .then((data) => {
        setAd(data);
      })
      .catch(() => {
        setAlert({ message: "Ошибка загрузки объявления", type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    deleteAd(id!)
      .then(() => {
        setAlert({ message: "Объявление успешно удалено", type: "success" });
        setTimeout(() => navigate("/"), 3000);
      })
      .catch(() => {
        setAlert({ message: "Ошибка удаления объявления", type: "error" });
      });
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
