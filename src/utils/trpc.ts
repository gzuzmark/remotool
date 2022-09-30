// src/utils/trpc.ts
import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '../server/router/app.router';

export const trpc = createReactQueryHooks<AppRouter>();

/**
 * These are helper types to infer the input and output of query resolvers
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type InferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type InferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type InferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type InferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;
