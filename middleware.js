import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname);
        console.log(req.nextauth.token.role);

        if (
            req.nextUrl.pathname.startsWith("/CreateUser") &&
            req.nextauth.token.role != "admin"
        ) {
            return NextResponse.rewrite(new URL("ClientMember/Denied", req.url));
        }
        if (req.nextUrl.pathname.startsWith("/Public") && req.nextauth.token.role !== "manager") {
            return NextResponse.rewrite(new URL("ClientMember/Denied", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,   //this will check if token exsist or not if not than immediately they will be redirected to /signin also check the token is valid or not . 
        },
    }
);

export const config = { matcher: ["/CreateUser", "/Public"] };   //so this matcher is very important the reason behind is that all the path which are given here if they are tried to access than person should be logged in else it will be redirected automatically to /signin page this is an effecient way as now we dont have to explicitly configure the auth process just like we did in one of the client page and server page .