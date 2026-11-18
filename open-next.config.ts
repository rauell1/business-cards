import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

// Serve prerendered pages from cache instead of rendering them on every
// request: an R2 bucket holds them (filled at deploy), and the Cloudflare cache
// in each data center keeps a copy close to visitors.
// Pages are kept in R2 rather than Workers KV: every deploy and every page
// refresh writes to the page cache, and KV's free write allowance ran out
// (deploys failed with code 10048).
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
  enableCacheInterception: true,
});
