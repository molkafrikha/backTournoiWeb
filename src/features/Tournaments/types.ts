import { Data } from "../Users/types";

export interface Tournament {
  id: string;
  name: string;
  game: string;
  numberOfTeams: number;
  cost: number;
  ownerId: string;
  updatedAt: Date;
  createdAt: Date;
  startTime: Date;
  owner: Data;
}
export interface tournaments {
  tournaments: Tournament[];
}

export interface SearchResults {
  status: string;
  data: {
    tournaments: Tournament[];
    users: Data[];
  };
}

export interface Participants {
  status: string;
  participants: {
    id: string;
    tournamentId: string;
    userId: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }[];
}
export interface SingleTournament {
  status: string;
  data: {
    owner: {
      name: string;
    };
    tournament: Omit<Tournament, "owner">;
  };
}
