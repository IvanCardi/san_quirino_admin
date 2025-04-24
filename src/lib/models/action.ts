export type Action = {
  id: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  phone: string;
  type: string;
  agent: { id: string; name: string };
};
