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
    args: {
        paginationOpts: paginationOptsValidator,
        layoutCv: v.optional(v.string()),
        layoutType: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        /*    const userId = await auth.getUserId(ctx);
   
           if (!userId) {
               return [];
           }; */

        const layouts = await ctx.db
            .query("layout")
            .filter((q) => q.eq(q.field("layoutCv"), args.layoutCv))
            .filter((q) => q.eq(q.field("layoutType"), args.layoutType))
            .order("desc")
            .paginate(args.paginationOpts)

        if (!layouts) {
            return [];
        };

        /*  let data = [] as any;
         for (let i = 0; layouts.length > i; i++) {
             let imageLink = await ctx.storage.getUrl(layouts[i].image as Id<"_storage">);
 
             data.push({ ...layouts[i], imageLink })
         } */

        return {
            ...layouts,
            page: (
                await Promise.all(
                    layouts.page.map(async (layout) => {

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

