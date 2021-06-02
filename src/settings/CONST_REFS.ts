// ? Centralizacion de las instancias.

import { fire, messaging , provider, db, serverTimestamp} from './firebaseConf';

export const FIRE = fire;
export const DB = db;
export const MESSAGING = messaging;
export const PROVIDER = provider;
export const SERVER_TIMESTAMP = serverTimestamp;
