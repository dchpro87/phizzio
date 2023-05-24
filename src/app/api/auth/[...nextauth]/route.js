import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/userModel';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await dbConnect();
        const user = await User.findOne({ email }).select(
          'name email cellphone password'
        );

        if (!user || !(await user.correctPassword(password, user.password))) {
          throw new Error('Email or password not correct!!');
        }

        user.password = undefined;

        return {
          name: user.name,
          email: user.email,
          id: user.id,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.userId = token.sub;
      // session.user.image = '';
      // console.log('session', { session, token, user });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt', { token, user, account, profile, isNewUser });
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
