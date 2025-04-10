/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
    args: {
        layoutId: v.id("layout"),
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

        const existingLayout = await ctx.db
            .query("favoriteLayouts")
            .filter((q) => q.eq(q.field("layoutId"), args.layoutId))
            .unique();
        if (existingLayout) {
            throw new Error("Layout already exists");
        };

        const layoutId = await ctx.db.insert("favoriteLayouts", {
            userId,
            layoutId: args.layoutId,
            layoutLink: args.layoutLink,
            layoutCv: args.layoutCv,
            layoutType: args.layoutType,
            image: args.image,
        });

        return layoutId;
    }
});

export const remove = mutation({
    args: {
        id: v.id("layout"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return [];
        };

        const id = await ctx.db.query("favoriteLayouts")
            .filter((q) => q.eq(q.field("layoutId"), args.id))
            .unique();

        if (id) {
            await ctx.db.delete(id._id);
        };

        return id;
    },
});

export const get = query({
    args: {
        paginationOpts: paginationOptsValidator,
        layoutCv: v.optional(v.string()),
        layoutType: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return [];
        };

        const favoriteLayouts = await ctx.db
            .query("favoriteLayouts")
            .order("desc")
            .filter((q) => q.eq(q.field("layoutCv"), args.layoutCv))
            .filter((q) => q.eq(q.field("layoutType"), args.layoutType))
            .filter(q => q.eq(q.field("userId"), userId))
            .paginate(args.paginationOpts)

        if (!favoriteLayouts) {
            return [];
        };

        return {
            ...favoriteLayouts,
            page: (
                await Promise.all(
                    favoriteLayouts.page.map(async (layout) => {

                        const image = await ctx.storage.getUrl(layout.image);

                        return {
                            ...layout,
                            image,
                            layoutCv: layout.layoutCv,
                            layoutLink: layout.layoutLink,
                            layoutType: layout.layoutType
                        }
                    })
                )
            )
        };
    }
});

export const getAll = query({
    args: {
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return [];
        };

        const favoriteLayouts = await ctx.db
            .query("favoriteLayouts")
            .order("desc")
            .collect();


        if (!favoriteLayouts) {
            return [];
        };


        return {
            ids: await Promise.all(favoriteLayouts.map(async (layout) => {
                return {
                    layoutId: layout.layoutId,
                }
            }
            ))
        }
    }
});

