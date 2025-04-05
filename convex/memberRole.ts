/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const create = mutation({
    args: {
        email: v.string(),
        role: v.union(v.literal("admin"), v.literal("member")),
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
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        };

        const memberRole = await ctx.db
            .query("memberRole")
            .filter((q) => q.eq(q.field("userId"), userId))
            .unique();

        if (!memberRole) {
            return null;
        }

        return memberRole;
    }
});
