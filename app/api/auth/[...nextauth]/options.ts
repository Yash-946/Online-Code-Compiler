import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/dbConnect";

// Function to create or find a user
async function findOrCreateUser(email: string, name: string) {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  return user;
}

// Extend the session and JWT types to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
  
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("No user found or incorrect credentials.");
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
          throw new Error("Incorrect password.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      async profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      
      console.log("signin",user, account, profile);

      if (profile && typeof profile === 'object') {
        const email = profile.email || "";
        const name = profile.name || "";
        
        const dbUser = await findOrCreateUser(email, name);
        if (dbUser) {
          user.id = dbUser.id; 
          user.email = dbUser.email;
          user.name = dbUser.name;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log("jwt", token, user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session", session, token);
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
