import axios from "axios";
import { City, ObjectForSelect, SignUpData, State } from "../models";

const AUTH_CONFIG = {
  headers: {
    Accept: "application/json",
    "api-token":
      // TODO: this should be as env variable. Leaving it here so it is easier to test the project quickly
      "PgUwFYMHPPLyuzT2aUDL0nhUv-GfhZZ5zjDmwES0vlJapf0RRdxQIVhCI8sQjJSvdYc",
    "user-email": "david.paleyy@gmail.com",
  },
};
const UNIVERSAL_TUTORIAL_API = "https://www.universal-tutorial.com/api";
const AUTH_TOKEN_URL = `${UNIVERSAL_TUTORIAL_API}/getaccesstoken`;
const STATES_URL = `${UNIVERSAL_TUTORIAL_API}/states/United States`;

export const getAuthToken = async () => {
  const authToken = await axios.get<{ auth_token: string }>(
    AUTH_TOKEN_URL,
    AUTH_CONFIG
  );

  // TODO: We should have a way to update the auth token when it expires. As this one
  // expires every 24 hours, I didn't focus on this. But a complete version of this app,
  // should have axios interceptors, to update the token if it fails.
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${authToken.data.auth_token}`;
  axios.defaults.headers.common["Accept"] = "application/json";

  return authToken;
};

export const getStates = async (): Promise<ObjectForSelect[]> => {
  const response = await axios.get<State[]>(STATES_URL);
  const states = response.data.map(({ state_name }) => ({
    label: state_name,
    value: state_name,
  }));
  return states;
};

export const getCities = async (
  stateSelected: string
): Promise<ObjectForSelect[]> => {
  const response = await axios.get<City[]>(
    `${UNIVERSAL_TUTORIAL_API}/cities/${stateSelected}`
  );
  const cities = response.data.map(({ city_name }) => ({
    label: city_name,
    value: city_name,
  }));
  return cities;
};

export const sendData = async (body: SignUpData) => {
  console.log({ body });
  // TODO: make the post
};
