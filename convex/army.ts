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

        const army = await ctx.db.insert("army", {
            userId,
            data: args.data
        });

        return army;
    }
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        /* const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        }; */

        const armyCollection = await ctx.db
            .query("army")
            .collect();

        if (!armyCollection) {
            return [];
        };

        const data = [...armyCollection]

        return data;
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