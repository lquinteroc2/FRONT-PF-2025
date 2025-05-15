import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
 callbacks: {
   async session({ session, token }) {
  console.log("📦 Session Callback Triggered:");
  console.log("🪪 Token:", token);
  console.log("👤 Session:", session);
  return session;
}
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

