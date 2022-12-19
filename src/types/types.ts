export type Bidder = {
  id: string;
  hisTurn: boolean;
  parameters: string;
  boostStandards: boolean;
  timeToExecute: number;
  warranty: number;
  payment: number;
  price: number;
};

export type Room = {
  id: string;
  timerId: NodeJS.Timer | undefined;
  timer: number;
  currentTime: number;
  bidders: Bidder[];
  currentBidder: number;
};
