import { PrivateAnimationType } from "@/graphql/gql/graphql";
import Dexie from "dexie";

const db = new Dexie("offline-lottie");

db.version(1).stores({
  animations: "++id, name, url, likes, tags, comments, isSynced, updatedAt",
  requests: "++id, query, operationName, variables, timestamps",
});

type OfflineRequest = {
  id: string;
  query: string;
  variables: Record<string, unknown>;
  timestamps: string;
};

export const animationsStore = db.table<PrivateAnimationType>("animations");
export const requestsStore = db.table<OfflineRequest>("requests");
