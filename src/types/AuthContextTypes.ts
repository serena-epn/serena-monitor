export interface IAuth {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }
  export type AuthContextType = {
    Auths: IAuth[];
    saveAuth: (Auth: IAuth) => void;
    updateAuth: (id: number) => void;
  };