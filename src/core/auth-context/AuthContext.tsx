import { Dispatch, SetStateAction, createContext } from "react";

export type Token = string | undefined;
export type SetToken = Dispatch<SetStateAction<Token>> | undefined;

export const AuthContext = createContext({
  token: undefined as Token,
  setToken: undefined as SetToken,
});
