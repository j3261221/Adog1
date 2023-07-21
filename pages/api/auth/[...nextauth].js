import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import GoogleProvider from 'next-auth/providers/google';
import { toast } from "react-toastify";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let db = (await connectDB).db('adog');
        if (!credentials?.email || !credentials.password) {
          console.log('이메일과 비밀번호를 입력하세요');
          return null
        }

        let user = await db.collection('user_cred').findOne({ email: credentials.email })
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }

        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool'
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },


  callbacks: {

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signIn",
  },
};
export default NextAuth(authOptions)
