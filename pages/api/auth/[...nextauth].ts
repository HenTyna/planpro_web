import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import * as process from "node:process";
import { authService } from "@/service/auth.service";
import { AuthRequest } from "@/lib/types/auth";
import { PasswordUtils } from "@/utils/PasswordUtils";

export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
    if (user) {
        token.token = user.data.access_token
        token.accessTokenExpires = user.data.expires_in
    }
    return token;
};

export const session = ({ session, token }: { session: Session; token: JWT }): Promise<Session> => {
    try {
        if (Date.now() / 1000 > token?.accessTokenExpires) {
            throw new Error("Refresh token has expired. Please log in again to get a new refresh token.");
        }

        const tokenPart = token.token?.split(".")?.at(1);
        if (!tokenPart) {
            throw new Error("Invalid token format.");
        }

        const accessTokenData = JSON.parse(atob(tokenPart));
        session.user = accessTokenData;
        token.accessTokenExpires = accessTokenData.exp;
        session.token = token?.token;

        return Promise.resolve(session);
    } catch (error) {
        console.error('Session callback error:', error);
        return Promise.reject(error);
    }
};


export const authOption: NextAuthOptions = ({
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user_name: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.user_name || !credentials?.password) {
                        throw new Error("Username and password are required");
                    }

                    const authRequest: AuthRequest = {
                        user_name: credentials.user_name,
                        password: PasswordUtils.encrypt(credentials.password),
                    }

                    const response = await authService.login(authRequest);

                    if (response.status === 200) {
                        return response.data;
                    }

                    throw new Error(response?.data?.message || "Invalid username or password");
                } catch (error: any) {
                    console.error('Authorization error:', error);
                    throw new Error(error?.message || "Login failed. Please try again.");
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours
    },
    callbacks: {
        jwt,
        session
    },
    pages: {
        signIn: '/login'
    }
})

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        refreshTokenExpires?: number;
        accessTokenExpires?: string;
        refreshToken?: string;
        token?: string;
        error?: string;
        user?: User;
    }

    interface User {
        status: {
            code: number;
            message: string;
        };
        data: {
            access_token: string;
            token_type: string;
            expires_in: number;
        };
        sub: string;
        scope: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        refreshTokenExpires?: number;
        accessTokenExpires: number;
        refreshToken?: string;
        token: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

export default NextAuth(authOption);