import { it } from "node:test";
import { boolean, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
    getMostRecent: publicProcedure.query(({ ctx }) => {
        const a = ctx.prisma.item.findMany(
            {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10,
                include: {
                    ItemLinks: {
                        include: {
                            link: true
                        }
                    },
                    category: true
                }
            }
        );

        return a
    }),
    voteForItem: publicProcedure.input(z.object({ id: z.string(), positive: z.boolean() })).mutation(({ ctx, input }) => {
        console.log(input.positive)
        const a = ctx.prisma.item.update({
            where: {
                id: input.id
            },
            data: {
                votesFor: {
                    increment: input.positive === true ? 1 : 0
                },
                votesAgainst: {
                    increment: input.positive === false ? 1 : 0
                }
            }
        })

        return a
    }),

});
