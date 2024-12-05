import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth", "/marketing", "/layout/list"]);

export default convexAuthNextjsMiddleware((request) => {
    if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/marketing");
    }

    if (!isAuthenticatedNextjs) {
        return nextjsMiddlewareRedirect(request, "/marketing");
    }

    console.log("console in middleware", request.nextUrl.pathname)

    if (isPublicPage(request) && isAuthenticatedNextjs() && request.nextUrl.pathname === "/auth") {
        return nextjsMiddlewareRedirect(request, "/");
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};