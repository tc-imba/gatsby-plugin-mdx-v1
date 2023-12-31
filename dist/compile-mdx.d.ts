/// <reference types="node" />
import type { NodePluginArgs, PluginOptions } from "gatsby";
import type { ProcessorOptions } from "@mdx-js/mdx";
import type { IMdxMetadata } from "./types";
import { IMdxPluginOptions } from "./plugin-options";
export declare function compileMDX({ absolutePath, source }: {
    absolutePath: string;
    source: string | Buffer;
}, options: ProcessorOptions, cache: NodePluginArgs["cache"], reporter: NodePluginArgs["reporter"]): Promise<{
    processedMDX: string;
    metadata: IMdxMetadata;
} | null>;
/**
 * This helper function allows you to inject additional plugins and configuration into the MDX
 * compilation pipeline. Very useful to create your own resolvers that return custom metadata.
 * Internally used to generate the tables of contents and the excerpts.
 */
export declare const compileMDXWithCustomOptions: ({ absolutePath, source }: {
    absolutePath: string;
    source: string | Buffer;
}, { pluginOptions, customOptions, getNode, getNodesByType, pathPrefix, reporter, cache, }: {
    pluginOptions: PluginOptions;
    customOptions: Partial<IMdxPluginOptions>;
    getNode: NodePluginArgs["getNode"];
    getNodesByType: NodePluginArgs["getNodesByType"];
    pathPrefix: string;
    reporter: NodePluginArgs["reporter"];
    cache: NodePluginArgs["cache"];
}) => Promise<{
    processedMDX: string;
    metadata: IMdxMetadata;
} | null>;
