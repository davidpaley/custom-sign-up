import { useEffect, useState } from "react";
import { getAuthToken } from "../../services";
import { Loading } from "../Loading";
import { SingUpForm } from "../SignUpForm";

export const SignUpFormWrapper = () => {
  const [authToken, setAuthToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let didCancel = false;
    const handleAuthTokenState = async () => {
      const authTokenResponse = await getAuthToken();
      if (!didCancel) {
        setIsLoading(false);
        setAuthToken(authTokenResponse.data.auth_token);
      }
    };
    setIsLoading(true);
    handleAuthTokenState();
    return () => {
      didCancel = true;
    };
  }, []);
  if (isLoading) return <Loading />;

  return <SingUpForm authToken={authToken} />;
};
