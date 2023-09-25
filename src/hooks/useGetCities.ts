import { useEffect, useState } from "react";
import { ObjectForSelect, State } from "../models";
import { getCities } from "../services";

export const useGetCities = (authToken: string, stateSelected: string) => {
  const [cities, setCities] = useState<ObjectForSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const stringifiedCities = JSON.stringify(cities);
  useEffect(() => {
    if (cities.length && isLoading) {
      setIsLoading(false);
    }
  }, [stringifiedCities, isLoading]);
  useEffect(() => {
    const handleGetCities = async () => {
      const response = await getCities(authToken, stateSelected);
      setCities(response);
    };

    if (!!stateSelected && !cities.length) {
      setIsLoading(true);
      handleGetCities();
    }
  }, [stateSelected]);
  return { isLoading, cities };
};
