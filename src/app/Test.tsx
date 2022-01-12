import React from "react";
import { useQuery } from "react-query";

export type TypeMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TypeData = {
  success?: boolean;
  status_message?: string;
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: TypeMovie[];
};

const API_KEY = process.env.REACT_APP_KEY;
const BASIC_URL = "https://api.themoviedb.org/3";

export const getData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const movieApis = {
  nowPlaying: () =>
    getData(
      `${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ),

  detail: (id: string) =>
    getData(`${BASIC_URL}/modvie/${id}?api_key=${API_KEY}`),

  search: () => getData(`${BASIC_URL}/`),
};

// search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

const Test = () => {
  const { isLoading, isSuccess, isError, error, data } = useQuery<TypeData>(
    "movies",
    movieApis.nowPlaying
  );
  const e = error as Error;

  if (isError)
    return (
      <div>
        {e.message}
        {e.stack}
      </div>
    );

  if (!data?.success && data?.status_message) {
    return <div>{data.status_message}</div>;
  }

  if (isLoading) return <div>Loading</div>;

  return <div> success</div>;
};

export default Test;
