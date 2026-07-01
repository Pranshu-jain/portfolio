import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Only this email may sign in. Everyone else is rejected at the signIn callback,
// so the /admin dashboard is locked to the owner's Google account.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jpranshu36@gmail.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" }, // JWT keeps the proxy/middleware edge-compatible
  pages: { signIn: "/admin/login" },
  callbacks: {
    // Gate: allow only the owner's verified Google email.
    signIn({ profile }) {
      return profile?.email === ADMIN_EMAIL && profile?.email_verified === true;
    },
    // Used by the proxy/middleware to protect matched routes.
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
