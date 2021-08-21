import { connectToDatabase } from "@/config/mongodb";

export async function users() {
  return (await connectToDatabase()).db.collection("users");
}
