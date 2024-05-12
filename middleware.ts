import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/api/uploadthing"]);

// export default clerkMiddleware((auth, req) => {
//     // if (!isPublicRoute(req)) auth().protect();
// });
export default clerkMiddleware();

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
