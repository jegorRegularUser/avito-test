import React, { useState, useEffect } from "react";
import "./AdPage.css";
import SearchBar from "../../common/Search/Search";
import Filter from "../../common/Filter/Filter";
import AdCard from "./components/AdCard/AdCard";
import Pagination from "../../common/Pagination/Pagination";
import Loader from "../../common/Loader/Loader";
import Button from "../../common/Button/Button"; 

interface Ad {
  id: string;
  name: string;
  location: string;
  type: "Недвижимость" | "Авто" | "Услуги";
  price?: number;
}

const AdListPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const adsPerPage = 5;

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        // Заглушка
        const response = await fetch("/api/items");
        const data = await response.json();
        setAds(data);
        setFilteredAds(data);
      } catch (error) {
        console.error("Ошибка загрузки объявлений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Фильтрация и поиск
  useEffect(() => {
    let updatedAds = [...ads];

    if (searchQuery) {
      updatedAds = updatedAds.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type) {
      updatedAds = updatedAds.filter((ad) => ad.type === filters.type);
    }

    setFilteredAds(updatedAds);
    setCurrentPage(1);
  }, [searchQuery, filters, ads]);

  // Логика пагинации
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="container">
      <h1>Список объявлений</h1>

      <div className="topControls">
        <SearchBar onSearch={setSearchQuery} />
        <Filter onFilterChange={setFilters} />
        <Button variant="primary" size="medium" rounded="medium">Разместить объявление</Button>
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
          />
        </>
      )}
    </div>
  );
};

export default AdListPage;
