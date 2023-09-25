import { useEffect, useState } from "react";
import { getAuthToken } from "../../services";
import { Loading } from "../Loading";
import { SingUpForm } from "../SignUpForm";

export const SignUpFormWrapper = () => {
  const [authToken, setAuthToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleAuthTokenState = async () => {
      const authTokenResponse = await getAuthToken();
      setIsLoading(false);
      setAuthToken(authTokenResponse.data.auth_token);
    };
    setIsLoading(true);
    handleAuthTokenState();
  }, []);
  if (isLoading) return <Loading />;

  return <SingUpForm authToken={authToken} />;
};
