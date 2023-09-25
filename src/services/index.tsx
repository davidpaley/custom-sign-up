import axios from "axios";
import { City, ObjectForSelect, State } from "../models";

const AUTH_CONFIG = {
  headers: {
    Accept: "application/json",
    "api-token":
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

  return authToken;
};

export const getStates = async (
  authToken: string
): Promise<ObjectForSelect[]> => {
  const response = await axios.get<State[]>(STATES_URL, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
  });
  const states = response.data.map(({ state_name }) => ({
    label: state_name,
    value: state_name,
  }));
  return states;
};

export const getCities = async (
  authToken: string,
  stateSelected: string
): Promise<ObjectForSelect[]> => {
  const response = await axios.get<City[]>(
    `${UNIVERSAL_TUTORIAL_API}/cities/${stateSelected}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    }
  );
  console.log({ response });
  const cities = response.data.map(({ city_name }) => ({
    label: city_name,
    value: city_name,
  }));
  return cities;
};
