/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        layoutLink: v.string(),
        layoutCv: v.string(),
        layoutType: v.string(),
        image: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        };

        const layoutId = await ctx.db.insert("layout", {
            userId,
            layoutLink: args.layoutLink,
            layoutCv: args.layoutCv,
            layoutType: args.layoutType,
            image: args.image,
        });

        return layoutId;
    }
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            return [];
        };

        const layouts = await ctx.db
            .query("layout")
            .collect();

        if (!layouts) {
            return [];
        };

        let data = [] as any;
        for (let i = 0; layouts.length > i; i++) {
            let imageLink = await ctx.storage.getUrl(layouts[i].image as Id<"_storage">);

            data.push({ ...layouts[i], imageLink })
        }

        return data;
    }
});

