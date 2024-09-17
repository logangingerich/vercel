/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type DeleteProjectRequest = {
  /**
   * The unique project identifier or the project name
   */
  idOrName: string;
  /**
   * The Team identifier to perform the request on behalf of.
   */
  teamId?: string | undefined;
  /**
   * The Team slug to perform the request on behalf of.
   */
  slug?: string | undefined;
};

/** @internal */
export const DeleteProjectRequest$inboundSchema: z.ZodType<
  DeleteProjectRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  idOrName: z.string(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/** @internal */
export type DeleteProjectRequest$Outbound = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

/** @internal */
export const DeleteProjectRequest$outboundSchema: z.ZodType<
  DeleteProjectRequest$Outbound,
  z.ZodTypeDef,
  DeleteProjectRequest
> = z.object({
  idOrName: z.string(),
  teamId: z.string().optional(),
  slug: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace DeleteProjectRequest$ {
  /** @deprecated use `DeleteProjectRequest$inboundSchema` instead. */
  export const inboundSchema = DeleteProjectRequest$inboundSchema;
  /** @deprecated use `DeleteProjectRequest$outboundSchema` instead. */
  export const outboundSchema = DeleteProjectRequest$outboundSchema;
  /** @deprecated use `DeleteProjectRequest$Outbound` instead. */
  export type Outbound = DeleteProjectRequest$Outbound;
}
