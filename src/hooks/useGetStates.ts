import { useEffect, useState } from "react";
import { ObjectForSelect } from "../models";
import { getStates } from "../services";

export const useGetStates = (authToken: string) => {
  const [states, setStates] = useState<ObjectForSelect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (states.length && isLoading) {
      setIsLoading(false);
    }
  }, [states.length, isLoading]);
  useEffect(() => {
    let didCancel = false;
    const handleGetStates = async () => {
      const response = await getStates(authToken);
      if (!didCancel) {
        setStates(response);
      }
    };
    if (!!authToken && !states.length) {
      setIsLoading(true);
      handleGetStates();
    }
    return () => {
      didCancel = true;
    };
  }, [authToken, states.length]);
  return { isLoading, states };
};
