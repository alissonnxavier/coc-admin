/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";


export const create = mutation({
    args: {
        data: v.record(v.string(), v.any())
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        };

        const reserveMember = await ctx.db.insert("clanDada", {
            userId,
            data: args.data
        });

        return reserveMember;
    }
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        };

        const clanData = await ctx.db
            .query("clanDada")
            .collect();

        if (!clanData) {
            return [];
        }

        return clanData;
    }
});

export const update = mutation({
    args: {
        id: v.id("clanDada"),
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