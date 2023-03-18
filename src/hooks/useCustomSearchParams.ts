import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../interface";

export const useCustomSearchParams = () => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(
    new URLSearchParams(search)
  ) as QueryParams;

  return {
    searchAsObject,
    setSearch
  };
};