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
        "/reminders",
        "/plans",
        "/todos",
        "/chat-ai",
        "/notes",
        "/calendar",
        "/telegram",
        "/404",
        "/403"
    ]
}
