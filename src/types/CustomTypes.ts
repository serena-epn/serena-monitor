export type TCoordinate = {
  latitude: number;
  longitude: number;
}

export type TLocation = {
  latitude: Number,
  longitude: Number,
  registeredAt?:Date
}

export interface TMenuItem {
  itemId: number;
  itemTitle: string;
  itemDescription?: string;
  itemIcon: string;
  itemOnClick?: string;
  itemMethodType?: string;
}

export interface THeaderComponentProps {
  headerLogo: string;
  headerText: string;
}

export interface TPatient {
  _id: string;
  name: string;
  lastname: string;
  birthdate: string;
  contactInfo: string;
  idNumber: string;
  deviceId: string;

}

export interface TUser {
  _id: string;
  name: string;
  lastname: string;
  birthdate: string;
  phone: string;
  email: string;
  idNumber: string;
  deviceId: string;
  zone:any;
  patient:any;
  device:any;
  //assignedPatient: TPatient | null;
  access_token: string;
}

export interface TAlert{
  _id:string;
  userId:string;
  latitude:number;
  longitude:number;
  type:number;
  description:string;
  registeredAt:string;
}

export interface TMapConfig{
  isDark:boolean;
}

export interface TAlertsConfig{
  locationEnabled:boolean;
  emergenciesEnabled:boolean;
  batteryEnabled:boolean;
  miscEnabled:boolean;
}

