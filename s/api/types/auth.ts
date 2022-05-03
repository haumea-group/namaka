import * as dbmage from "dbmage";
import { AppDatabase } from "./schema.js";

export interface User {
  userId: string;
  profile: Profile;
  permissions: {
    canPost: boolean;
    canBanUsers: boolean;
    canDeleteAnyComment: boolean;
  };
}

export interface UserIntegration extends Omit<User, "userId"> {
  userId: dbmage.Id;
}

export interface Profile {
  nickname: string;
  avatar: string;
  joinedTime: number;
}

export interface MockMeta {
  user?: User;
}

export interface Auth {
  user: User | undefined;
  rando: dbmage.Rando;
  database: AppDatabase;
}
