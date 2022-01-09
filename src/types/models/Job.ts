export interface Job {
  id?: string;
  title?: string;
  description?: string;
  skills?: Array<string>;
  market?: string;
  type?: string;
  country?: string;
  planet?: string;
  isBroadcasted?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
