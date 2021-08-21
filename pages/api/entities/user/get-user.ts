import { users } from "./collection";
import { User } from "./types";

export async function getUserByGoogleId(
  googleId: string
): Promise<null | User> {
  try {
    const collection = await users();
    const result = await collection.findOne({ googleId });
    if (!result) return null;

    return result as User;
  } catch (err) {
    return null;
  }
}
