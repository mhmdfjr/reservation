import { db } from "./db";
import initialReservations from "@/app/data/reservasions.json"; // Adjust the path as needed

export async function seedDatabase() {
  const count = await db.reservations.count();
  if (count === 0) {
    await db.reservations.bulkAdd(initialReservations);
  }
}
