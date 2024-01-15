import React from "react";
import s from "./style.module.css";
import { FiveStartRating } from "../FiveStarRating/FiveStartRating";

export const TVShowDetail = ({ tvShow }) => {
  const rating = tvShow.vote_average / 2;
  return (
    <>
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.rating_container}>
        <div className={s.date}>{tvShow.first_air_date}</div>
        <FiveStartRating rating={rating} />
        <div className={s.rating}>{rating}</div>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </>
  );
};
