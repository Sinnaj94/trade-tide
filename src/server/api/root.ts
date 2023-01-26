import { createTRPCRouter } from "./trpc";
import { categoryRouter } from "./routers/category";
import { itemRouter } from "./routers/item";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  item: itemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
