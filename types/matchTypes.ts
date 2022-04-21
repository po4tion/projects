import { Key } from "react";

export interface matchType {
  id: Key | null | undefined;
  color: string;
  iconUrl: string;
  rankUrl: string;
  score: number;
  scoreChange: number;
  arenaRankUrl: string;
  arenaScore: number;
  arenaScoreChange: number;
  damage: number | undefined;
  kill: number;
  recordDate: string;
}

export interface rankAvatarType {
  gameMode: string;
  rankUrl: string;
  score: number;
  scoreChange: number;
}

export interface iconAvatarType {
  iconUrl: string;
}

export interface combatType {
  damage: number | undefined;
  kill: number;
}
