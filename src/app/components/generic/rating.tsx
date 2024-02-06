import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating({
  rating = 0,
  starClassName,
  className = ""
}: {
  rating?: number | undefined | void;
  starClassName?: string;
  className?: string;
}) {
  const defaultRating: boolean[] = [false, false, false, false, false];

  const initRating: number = rating;

  const ratings: React.JSX.Element[] = [];

  for (let i: number = 0; i < 5; i++) {
    rating >= 1
      ? ratings.push(<Star className={starClassName} filled={true} />)
      : ratings.push(
          rating >= 0.5 ? (
            <HalfStar className={starClassName} />
          ) : (
            <Star className={starClassName} filled={false} />
          )
        );
    rating -= 1;
  }

  return (
    <div className={`${className} flex gap-1 items-center !shrink-0 text-white/60`}>{ratings}</div>
  );
}

function Star({
  filled = false,
  className = "",
  index
}: {
  filled: boolean;
  className?: string;
  index?: number;
}) {
  return filled ? (
    <FaStar className={`${className ?? ""} w-auto fill-amber-400 aspect-square`} />
  ) : (
    <FaRegStar className={`${className ?? ""} w-auto aspect-square`} />
  );
}

function HalfStar({ className = "", index }: { className?: string; index?: number }) {
  return <FaStarHalfAlt className={`${className ?? ""} w-auto fill-amber-400 aspect-square`} />;
}
