import { withAuth } from "next-auth/middleware"
export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            return !!token;
        }
    },
    pages: {
        signIn: '/login',
    }
})

export const config = {
    matcher: [
        "/trips/:path*",
        "/reminder/:path*",
        "/plans/:path*",
        "/todos/:path*",
        "/chat-ai/:path*",
        "/notes/:path*",
        "/calendar/:path*",
        "/telegram/:path*",
        "/we-talk/:path*",
        "/404",
        "/403"
    ]
}
