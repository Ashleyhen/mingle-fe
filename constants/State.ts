import { useAutoDiscovery } from "expo-auth-session";
import { issuer } from "./env";

export type Mode = "new" | "edit" | "display";
