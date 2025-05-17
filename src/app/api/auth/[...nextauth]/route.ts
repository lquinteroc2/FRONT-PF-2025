import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      sub: string; // <--- ahora sub existe
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
 callbacks: {
  async jwt({ token, account, profile }) {
    if (account && profile) {
      token.sub = profile.sub;
    }
    return token;
  },

    // Añade `sub` del token a la sesión
  async session({ session, token }) {
    if (session.user && token.sub) {
      session.user.sub = token.sub as string; // 👈 esto asegura que sub pase al frontend
    }
    console.log("📦 Session Callback Triggered:");
    console.log("🪪 Token:", token);
    console.log("👤 Session:", session);
    return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };