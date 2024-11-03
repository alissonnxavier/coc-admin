/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    clanDada: defineTable({
        userId: v.id("users"),
        data: v.record(v.string(), v.any())
    }),
    secondaryClanData: defineTable({
        userId: v.id("users"),
        data: v.record(v.string(), v.any())
    }),
    memberRole: defineTable({
        userId: v.id("users"),
        email: v.string(),
        role: v.string()
    }),
    layout: defineTable({
        userId: v.id("users"),
        layoutLink: v.string(),
        layoutCv: v.string(),
        image: v.id("_storage"),
    })
});

export default schema