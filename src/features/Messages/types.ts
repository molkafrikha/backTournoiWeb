import { Data as User } from "../Users/types";
export interface Conversations {
  id: string;
  recieverId: string;
  userId: string;
  user: User;
}
export interface Data {
  status: string;
  conversations: Conversations[];
}
