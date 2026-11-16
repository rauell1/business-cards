import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

// Serve prerendered pages from cache instead of rendering them on every
// request: Workers KV holds them (filled at deploy), and the Cloudflare cache
// in each data center keeps a copy close to visitors.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),
  enableCacheInterception: true,
});
