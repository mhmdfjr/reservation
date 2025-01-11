import Dexie, { Table } from "dexie";

export interface ReservationType {
  id: number;
  customerName: string;
  roomType: string;
  roomNumber: number;
  startDate: string;
  endDate: string;
  serviceType: string;
  status: string;
}

// Initialize Dexie database
class ReservationsDatabase extends Dexie {
  reservations!: Table<ReservationType, number>; // Define a table with `id` as the primary key

  constructor() {
    super("ReservationsDatabase");
    this.version(1).stores({
      reservations: "++id, customerName, roomType, roomNumber, startDate, endDate, serviceType, status", // Define the schema
    });
  }
}

export const db = new ReservationsDatabase();
