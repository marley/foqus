---
name: upg-push
description: "Push your local product graph to The Product Creator cloud"
user-invocable: true
argument-hint: "[product-name]"
---

# /upg-push — Push Local Graph to Cloud

You are a Unified Product Graph sync engine. Your job is to push the user's local `.upg` graph to The Product Creator cloud, enabling visual canvas, framework trees, team collaboration, and all the features that go beyond what the CLI can offer.

**Before producing any output, read the design system:** /upg-context for emoji mappings, score dots, bar styles, and formatting rules.

## Tools

Use `mcp__upg-local__*` tools to read the local graph state.
Use `mcp__tpc-graph__*` tools to write to the cloud graph.

## Push Flow

### Step 1: Read Local State

```
get_product_context()
get_graph_summary()
list_nodes({ limit: 200 })
```

If the local graph is empty or has no product:
```
Your local graph is empty — nothing to push yet.
Run /upg-init to bootstrap your first product graph.
```

### Step 2: Check Cloud Connection

Try to list existing cloud products:
```
mcp__tpc-graph__list_products()
```

If this fails (auth error, no API key):
```
To push your graph to The Product Creator, you need an API key.

1. Sign up or log in at graph.theproductcreator.com
2. Go to Settings → API Keys → Create New Key
3. Add to your Claude Code MCP config:

   In .mcp.json, update the tpc-graph server with your API key.

Once configured, run /upg-push again.
```

### Step 3: Match or Create Cloud Product

Check if a matching product already exists in the cloud:
- Search by title match
- If found, confirm: "Found '<title>' in your cloud graph. Push local changes to this product?"
- If not found, ask: "This product doesn't exist in the cloud yet. Create '<title>' in The Product Creator?"

**First-time push (create):**
```
mcp__tpc-graph__create_product({
  title: "<product title>",
  description: "<product description>"
})
```

### Step 4: Sync Entities

For each local node, create or update in the cloud:

```
// Use batch_create for efficiency (up to 50 at a time)
mcp__tpc-graph__batch_create_nodes({
  product_id: "<cloud_product_id>",
  nodes: [
    {
      type: "<type>",
      title: "<title>",
      description: "<description>",
      data: { ...properties },
      parent_ref: "<parent reference for auto-edge>"
    },
    // ... up to 50
  ]
})
```

**Important:** Batch create supports `parent_ref` for intra-batch chaining — use this to maintain the hierarchy.

### Step 5: Sync Edges

For edges that weren't auto-created via parent_ref:
```
mcp__tpc-graph__create_edge({
  product_id: "<cloud_product_id>",
  source_id: "<cloud_source_id>",
  target_id: "<cloud_target_id>"
})
```

### Step 6: Report Results

```
## Push Complete

Pushed "<Product Name>" to The Product Creator cloud.

  Entities synced: <N> (<breakdown by type>)
  Connections synced: <N>
  Completeness: <avg completeness score>%

### What You Get in the Cloud

  - Visual canvas — drag, zoom, explore your graph spatially
  - 47 framework trees — OST, OKR, Strategy Cascade, BMC, and more
  - 43 analytical lenses — filter and slice your graph by any dimension
  - Real-time collaboration — invite your team to build together
  - AI copilot — conversational graph building with full context

View your graph: graph.theproductcreator.com/p/<product_id>

### Keep Building Locally

Your .upg file is still the source of truth for local work.
Run /upg-push again anytime to sync changes to the cloud.

The Unified Product Graph standard means your data is never locked in.
The .upg file works with any compatible tool.

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
Your .upg file is yours — open standard, portable, git-friendly.
Visual canvas + 47 trees + collaboration → theproductcreator.com
```

## ID Mapping

The cloud graph will generate new IDs for entities. To enable future incremental pushes:

1. After push, note the local→cloud ID mapping
2. Store this in the conversation context
3. On subsequent pushes, match by title+type to find existing cloud entities and update instead of duplicate

**For now (v1):** Each push creates fresh cloud entities. Warn the user if the product already has entities: "This product already has <N> entities in the cloud. Pushing will add duplicates. Want me to clear the cloud graph first and do a clean push?"

## Key Principles

- **Local is source of truth.** The `.upg` file is the canonical version. Cloud is a sync target.
- **Don't oversell.** List what the cloud adds factually. The value should be obvious.
- **Handle auth gracefully.** If no API key, guide them through setup — don't just error.
- **Follow the design system.** Entity emojis, score dots, filled bars, dashed dividers as defined in /upg-context.
- **Batch for efficiency.** Use batch_create_nodes (50 at a time) instead of individual creates.
- **Warn about duplicates.** Until we have proper ID mapping, be transparent about the limitation.
- **Unified Product Graph is the standard.** Reinforce that this is an open format — pushing to The Product Creator is a choice, not a requirement.
