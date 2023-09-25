import { useEffect, useState } from "react";
import { ObjectForSelect } from "../models";
import { getStates } from "../services";

export const useGetStates = (authToken: string) => {
  const [states, setStates] = useState<ObjectForSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const stringifiedStates = JSON.stringify(states);
  useEffect(() => {
    if (states.length && isLoading) {
      setIsLoading(false);
    }
  }, [stringifiedStates, isLoading]);
  useEffect(() => {
    const handleGetStates = async () => {
      const response = await getStates(authToken);
      setStates(response);
    };
    if (!!authToken && !states.length) {
      setIsLoading(true);
      handleGetStates();
    }
  }, [authToken]);
  return { isLoading, states };
};
