export type plansType = "Free" | "Pro" | "Enterprise";
export interface UserInterface {
  name: string;
  id: string;
  _id?: string;
  email: string;
  username: string;
  createdAt?: any;
  subscriptionPlan: plansType;
}
export interface SignUpInputValue {
  email: string;
  password: string;
  username: string;
}