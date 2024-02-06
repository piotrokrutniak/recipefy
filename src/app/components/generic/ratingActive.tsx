import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RatingActive({
  rating = 0,
  starClassName,
  className = ""
}: {
  rating?: number | undefined | void;
  starClassName?: string;
  className?: string;
}) {
  const [tempRating, setTempRating] = useState<number | undefined>();
  const [usedRating, setUsedRating] = useState<number>(rating);
  const ratings: React.JSX.Element[] = [];

  useEffect(() => {
    setUsedRating(tempRating ?? rating);
    processRating(usedRating);
  }, [tempRating, rating]);

  processRating(usedRating);

  function processRating(usedRating: number) {
    for (let i: number = 1; i <= 5; i++) {
      usedRating >= 1
        ? ratings.push(
            <Star
              className={starClassName}
              filled={true}
              onMouseEnter={() => {
                setTempRating(i);
              }}
            />
          )
        : ratings.push(
            usedRating >= 0.5 ? (
              <HalfStar
                className={starClassName}
                onMouseEnter={() => {
                  setTempRating(i);
                }}
              />
            ) : (
              <Star
                className={starClassName}
                filled={false}
                onMouseEnter={() => {
                  setTempRating(i);
                }}
              />
            )
          );
      usedRating -= 1;
    }
  }

  return (
    <div
      onMouseLeave={() => {
        setTempRating(undefined);
      }}
      className={`${className} flex gap-1 items-center !shrink-0 text-white/60`}
    >
      {ratings}
    </div>
  );
}

function Star({
  filled = false,
  className = "",
  onMouseEnter
}: {
  filled: boolean;
  className?: string;
  onMouseEnter: () => void;
}) {
  return (
    <div onMouseEnter={onMouseEnter}>
      {filled ? (
        <FaStar className={`${className ?? ""} w-auto fill-amber-400 aspect-square`} />
      ) : (
        <FaRegStar className={`${className ?? ""} w-auto aspect-square`} />
      )}
    </div>
  );
}

function HalfStar({
  className = "",
  onMouseEnter
}: {
  className?: string;
  onMouseEnter: () => void;
}) {
  return (
    <div onMouseEnter={onMouseEnter}>
      <FaStarHalfAlt
        className={`${className ?? ""} w-auto fill-amber-400 aspect-square`}
        onMouseEnter={onMouseEnter}
      />
    </div>
  );
}
