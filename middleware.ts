import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth", "/", "/layout/list", "/army/list"]);

export default convexAuthNextjsMiddleware((request) => {
    if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isPublicPage(request) && isAuthenticatedNextjs() && request.nextUrl.pathname === "/auth") {
        return nextjsMiddlewareRedirect(request, "/");
    }
}, { cookieConfig: { maxAge: 60 * 60 * 24 * 30 } });

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};