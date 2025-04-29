export type Action = {
  id: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  phone: string;
  type: string;
  createdAt: string;
  appointmentDate?: string;
  assignmentDate?: string;
  endAssignmentDate?: string;
  saleDate?: string;
  price?: number;
  commission?: number;
  agent?: { id: string; name: string };
};
