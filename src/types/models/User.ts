export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
  password?: string;
  planet?: string;
  dob?: string;
  role?: string;
  verifiedemail?: boolean;
  validatePassword?: Function;
  active?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
