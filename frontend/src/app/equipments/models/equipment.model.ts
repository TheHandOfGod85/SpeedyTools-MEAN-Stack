export interface Equipment {
  _id?: string | null;
  name: string;
  description: string;
  quantity: number;
  serialNumber: string;
  manufacturer: string;
  installationDate: Date;
  powerRequirement: number;
  location: string;
}
