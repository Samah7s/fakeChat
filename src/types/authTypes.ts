export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface Message {
  id: string;
  text: string;
  isMy: boolean;
  timestamp: string;
}
