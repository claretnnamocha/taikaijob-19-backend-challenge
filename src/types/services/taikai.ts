export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  planet: string;
}

export interface CreateJob {
  title: string;
  description: string;
  skills: Array<string>;
  market: string;
  type: string;
  country: string;
  planet: string;
}

export interface SearchJob {
  q: string;
  skills: string;
  market: string;
  type: string;
  country: string;
  planet: string;
  page: number;
  pageSize: number;
}

export interface JobDetails {
  jobId: string;
}

export interface UpdateJob extends CreateJob, JobDetails {}
