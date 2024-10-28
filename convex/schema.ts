/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    clanDada: defineTable({
        userId: v.id("users"),
        data: v.record(v.string(), v.any())
    })
});

export default schema