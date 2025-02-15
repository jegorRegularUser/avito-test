import React, { useState, useEffect } from "react";
import "./AdListPage.css";
import { Search, Filter, Pagination, Loader, Button } from "../../common";
import AdCard from "./components/AdCard/AdCard";
import { getAds } from "../../../services/api";
import { Ad } from "../../../services/types";
import { useNavigate } from "react-router-dom";

const AdListPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const adsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAds()
      .then((data) => {
        setAds(data);
        setFilteredAds(data);
      })
      .catch((e) => {
        console.error("Ошибка загрузки объявлений:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const applyFilters = (ads: Ad[], filters: Record<string, any>) => {
      return ads.filter((ad) => {
        return Object.keys(filters).every((key) => {
          if (filters[key] && Array.isArray(filters[key])) {
            const [min, max] = filters[key];
            const minValue = min !== "" ? min : 0;
            const maxValue = max !== "" ? max : ad[key];
            return ad[key] >= minValue && ad[key] <= maxValue;
          } else if (filters[key]) {
            return ad[key] === filters[key];
          }
          return true;
        });
      });
    };

    let updatedAds = [...ads];

    if (searchQuery) {
      updatedAds = updatedAds.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    updatedAds = applyFilters(updatedAds, filters);

    setFilteredAds(updatedAds);
    setCurrentPage(1);
  }, [searchQuery, filters, ads]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="container">
      <h1>Список объявлений</h1>

      <div className="topControls">
        <Search onSearch={setSearchQuery} />
        <Filter onFilterChange={setFilters} />
        {token ? (
          <>
            <Button
              variant="success"
              size="medium"
              rounded="medium"
              onClick={() => navigate("/form")}
              className="addAdBtn"
            >
              Разместить объявление
            </Button>
            <Button
              variant="danger"
              size="medium"
              rounded="medium"
              onClick={handleLogout}
              className="logoutBtn"
            >
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="medium"
              rounded="medium"
              onClick={() => navigate("/login")}
              className="loginBtn"
            >
              Вход
            </Button>
            <Button
              variant="secondary"
              size="medium"
              rounded="medium"
              onClick={() => navigate("/register")}
              className="registerBtn"
            >
              Регистрация
            </Button>
          </>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="adList">
            {currentAds.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAds.length / adsPerPage)}
            onPageChange={setCurrentPage}
            disabled={filteredAds.length === 0}
          />
        </>
      )}
    </div>
  );
};

export default AdListPage;
