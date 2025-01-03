/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as army from "../army.js";
import type * as auth from "../auth.js";
import type * as clandata from "../clandata.js";
import type * as http from "../http.js";
import type * as layout from "../layout.js";
import type * as memberRole from "../memberRole.js";
import type * as reserve from "../reserve.js";
import type * as secondaryClanData from "../secondaryClanData.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  army: typeof army;
  auth: typeof auth;
  clandata: typeof clandata;
  http: typeof http;
  layout: typeof layout;
  memberRole: typeof memberRole;
  reserve: typeof reserve;
  secondaryClanData: typeof secondaryClanData;
  upload: typeof upload;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
