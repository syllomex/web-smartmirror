import { users } from "./collection";
import { CreateUserDTO } from "./types";

export async function createUser(data: CreateUserDTO) {
  try {
    const collection = await users();
    const result = await collection.insertOne({ ...data });

    return { success: true, insertedId: result.insertedId };
  } catch (err) {
    return { success: false, error: err };
  }
}
