import React from "react";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";
import s from "./style.module.css";
export const FiveStartRating = ({ rating }) => {
  const startList = [];

  const starFillCount = Math.floor(rating);
  const hasStarHalf = rating - starFillCount >= 0.5;
  const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);

  for (let i = 1; i <= starFillCount; i++) {
    startList.push(<StarFill key={"star-fill" + i} />);
  }

  if (hasStarHalf) {
    startList.push(<StarHalf key={"star-half"} />);
  }
  for (let i = 1; i <= emptyStarCount; i++) {
    startList.push(<StarEmpty key={"star-empty" + i} />);

    return <>{startList}</>;
  }
};
