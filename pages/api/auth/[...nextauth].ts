import NextAuth from "next-auth";
import { signIn } from "next-auth/client";
import Providers from "next-auth/providers";
import { createUser } from "../entities/user/create-user";
import { getUserByGoogleId } from "../entities/user/get-user";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === "google") {
        const user = await getUserByGoogleId(account.id);
        if (!user) await createUser({ googleId: account.id });
        return true;
      }
      return false;
    },
  },

  // database: process.env.MONGODB_URI,
});
