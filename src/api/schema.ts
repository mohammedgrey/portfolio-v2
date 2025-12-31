/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from "./generated-types";

/** --- Utils --- **/

// Extract JSON body type from requestBody
export type RequestBodyJSON<T> = T extends { requestBody?: any }
  ? NonNullable<NonNullable<T["requestBody"]>["content"]>[keyof NonNullable<
      NonNullable<T["requestBody"]>["content"]
    >]
  : never;

// Extract 200 response JSON type
export type Response200<T> = T extends { responses?: any }
  ? NonNullable<NonNullable<T["responses"]>>["200"] extends { content?: any }
    ? NonNullable<
        NonNullable<NonNullable<T["responses"]>>["200"]["content"]
      >[keyof NonNullable<
        NonNullable<NonNullable<T["responses"]>>["200"]["content"]
      >]
    : NonNullable<NonNullable<T["responses"]>>["200"]
  : never;

// Extract path params
export type PathParams<T> = T extends { parameters?: any }
  ? NonNullable<NonNullable<T["parameters"]>["path"]>
  : never;

// Extract query params
export type QueryParams<T> = T extends { parameters?: any }
  ? NonNullable<NonNullable<T["parameters"]>["query"]>
  : never;

// Extract header params
export type HeaderParams<T> = T extends { parameters?: any }
  ? NonNullable<NonNullable<T["parameters"]>["header"]>
  : never;

/** --- Request schema for endpoint --- **/
/** --- Request schema for endpoint --- **/
type RequestSchema<T> = {
  // Only include body if it exists
  [K in "body"]: RequestBodyJSON<T> extends never ? never : RequestBodyJSON<T>;
} & {
  [K in "pathParams"]: keyof PathParams<T> extends never
    ? never
    : PathParams<T>;
} & {
  [K in "queryParams"]: keyof QueryParams<T> extends never
    ? never
    : QueryParams<T>;
} & {
  headers?: HeaderParams<T>;
};

// Filter out properties that are never
type CleanRequestSchema<T> = {
  [K in keyof RequestSchema<T> as RequestSchema<T>[K] extends never
    ? never
    : K]: RequestSchema<T>[K];
};
/** --- Method schema --- **/
type MethodSchema<Method> = {
  request: CleanRequestSchema<Method>;
  response: Response200<Method>;
};

/** --- Transform paths into method-first schema --- **/
export type APISchemaByMethod = {
  GET: {
    [E in keyof paths as paths[E]["get"] extends undefined
      ? never
      : E]: MethodSchema<paths[E]["get"]>;
  };
  POST: {
    [E in keyof paths as paths[E]["post"] extends undefined
      ? never
      : E]: MethodSchema<paths[E]["post"]>;
  };
  PUT: {
    [E in keyof paths as paths[E]["put"] extends undefined
      ? never
      : E]: MethodSchema<paths[E]["put"]>;
  };
  PATCH: {
    [E in keyof paths as paths[E]["patch"] extends undefined
      ? never
      : E]: MethodSchema<paths[E]["patch"]>;
  };
  DELETE: {
    [E in keyof paths as paths[E]["delete"] extends undefined
      ? never
      : E]: MethodSchema<paths[E]["delete"]>;
  };
};
