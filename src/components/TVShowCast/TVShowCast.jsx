import React from "react";
import s from "./style.module.css";
import { SMALL_IMG_ACTORS_LINK } from "../../config";


export const TVShowCast = ({ castingListProps, tvShow }) => {
  
  return (
    <>
      <div className={s.title}>Cast</div>
      <div className={s.container}>
        <div className={s.listContainer}>
          {castingListProps.map((actor) => {
            return (
              <span key={actor.id}>
                <div>
                  <div className={s.list}>{actor.name}</div>
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
