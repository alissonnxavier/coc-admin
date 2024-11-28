/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const create = mutation({
    args: {
        email: v.string(),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        };

        const memberRole = await ctx.db.insert("memberRole", {
            userId,
            email: args.email,
            role: args.role,
        });

        return memberRole;
    }
});

export const get = query({
    args: {
        email: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        };

        const memberRole = await ctx.db
            .query("memberRole")
            .filter((q) => q.eq(q.field("email"), args.email))
            .unique();

        if (!memberRole) {
            return [];
        }

        return memberRole;
    }
});
