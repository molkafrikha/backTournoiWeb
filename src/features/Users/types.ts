export interface Data {
  Role: "USER" | "ADMIN";
  name: string;
  id: string;
  email: string;
  password: string;
}
export interface User {
  status: string;
  data: Data;
  accessToken: string;
}

export interface OneUser {
  user: Pick<Data, "id" | "name">;
}
