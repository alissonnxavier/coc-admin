/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const create = mutation({
    args: {
        data: v.record(v.string(), v.any())
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        };

        const clanData = await ctx.db.insert("secondaryClanData", {
            userId,
            data: args.data
        });

        return clanData;
    }
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {
       /*  const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        }; */

        const clanData = await ctx.db
            .query("secondaryClanData")
            .collect();

        if (!clanData) {
            return [];
        }

        return clanData;
    }
});

export const update = mutation({
    args: {
        id: v.id("secondaryClanData"),
        data: v.record(v.string(), v.any())
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        };

        const updateClanData = ctx.db.patch(args.id, {
            userId,
            data: args.data,
        })

        return updateClanData;
    }
});