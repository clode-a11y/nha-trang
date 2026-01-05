import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check fallback admin first
          if (
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: 'admin',
              email: process.env.ADMIN_EMAIL,
              name: 'Admin',
              role: 'admin',
            }
          }

          if (!prisma) {
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch {
          // Fallback admin user when database is not available
          if (
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: 'admin',
              email: process.env.ADMIN_EMAIL,
              name: 'Admin',
              role: 'admin',
            }
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
