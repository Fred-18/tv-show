import React, { useEffect, useState } from "react";
import "./global.css";
import s from "./style.module.css";
import { TVSshowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVshowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/Images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TVShowCast } from "./components/TVShowCast/TVShowCast";

export const App = () => {
  const [currentTVShow, setCurrentTVshow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);
  const [castingList, setCastingList] = useState([]);

  const fetchPopulars = async () => {
    try {
      const populars = await TVSshowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVshow(populars[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires" + error.message);
    }
  };

  const fetchRecommendations = async (tvShowId) => {
    try {
      const recommendations = await TVSshowAPI.fetchRecommendation(tvShowId);
      if (recommendations.length > 0) {
        setRecommendationList(recommendations.slice(0, 10));
      }
    } catch (error) {
      alert("Erreur durant la recherche des recommendations" + error.message);
    }
  };

  const fetchCredit = async (tvShowId) => {
    try {
      const casting = await TVSshowAPI.fetchCredit(tvShowId);
      if (casting.length > 0) {
        setCastingList(casting);
      }
    } catch (error) {
      alert("Erreur durant la recherche du castimg");
    }
  };
  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
      // fetchCredit(currentTVShow.id);
    }
  }, [currentTVShow]);

  useEffect(() => {
    if (currentTVShow) {
      fetchCredit(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTvShow(tvShowName) {
    try {
      const searchResponse = await TVSshowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVshow(searchResponse[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche de titre de la série" + error.message);
    }
  }

  return (
    <>
      <div
        className={s.main_container}
        style={{
          background: currentTVShow
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
            : "black"
        }}
      >
        <div className={s.header}>
          <div className="row">
            <div className="col-4">
              <Logo
                image={logo}
                title="Watowatch"
                subtitle="Find a show you may like"
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <SearchBar onSubmit={searchTvShow} />
            </div>
          </div>
        </div>
        <div></div>

        <div className={s.tv_show_detail}>
          {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
        </div>
        <TVShowCast castingListProps={castingList} tvShow={{ currentTVShow }} />

        <div className={s.recommendations}>
          {recommendationList && recommendationList.length > 0 && (
            <TVShowList
              onClickItem={setCurrentTVshow}
              TVShowList={recommendationList}
            />
          )}
        </div>
      </div>
    </>
  );
};
