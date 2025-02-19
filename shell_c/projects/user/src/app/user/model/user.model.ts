export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export interface GetUsersResponse {
  users: User[];
}

export interface GetRentedBikeResponse {
  hostname: string;
  rented_bikes: any[];
}
