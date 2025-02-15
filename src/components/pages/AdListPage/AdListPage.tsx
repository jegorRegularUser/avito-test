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
    let updatedAds = [...ads];

    if (searchQuery) {
      updatedAds = updatedAds.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type) {
      console.log(filters);
      updatedAds = updatedAds.filter((ad) => ad.type === filters.type);
    }

    setFilteredAds(updatedAds);
    setCurrentPage(1);
  }, [searchQuery, filters, ads]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="container">
      <h1>Список объявлений</h1>

      <div className="topControls">
       <Search onSearch={setSearchQuery} />
        <Filter onFilterChange={setFilters} />
        <Button
          variant="primary"
          size="medium"
          rounded="medium"
          onClick={() => navigate("/form")}
          className="addAdBtn"
        >
          Разместить объявление
        </Button>
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
