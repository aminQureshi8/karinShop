import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/config/db";
import userModel from "@/models/user";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        await db();

        const user = await userModel
          .findOne({
            $or: [
              { email: credentials.identifier },
              { phone: credentials.identifier },
            ],
          })
          .select("+password");

        if (!user) throw new Error("کاربری با این مشخصات یافت نشد");

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordMatch) throw new Error("رمز عبور اشتباه است");

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/regLogin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
