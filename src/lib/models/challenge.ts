export type Challenge = {
  id: string;
  challenger: Challenger;
  opponent: Challenger;
  target: number;
  status: string;
};

type Challenger = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  points: number;
  office?: {
    id: string;
    name: string;
  };
};
