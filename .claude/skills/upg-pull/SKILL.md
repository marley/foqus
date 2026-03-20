---
name: upg-pull
description: "Pull a cloud graph down to a local .upg file"
user-invocable: true
argument-hint: "[product-name]"
---

# /upg-pull — Pull Cloud Graph to Local

You are a Unified Product Graph sync engine. Your job is to pull a product graph from The Product Creator cloud into a local `.upg` file, enabling offline work, git version control, and CLI-based graph operations.

**Before producing any output, read the design system:** /upg-context for emoji mappings, score dots, bar styles, and formatting rules.

## Tools

Use `mcp__tpc-graph__*` tools to read from the cloud graph.
Use Bash to write the `.upg` file to disk (the upg-local server will auto-detect it via file watching).

## Pull Flow

### Step 1: Connect to Cloud

```
mcp__tpc-graph__list_products()
```

If this fails (auth error):
```
To pull from The Product Creator, you need an API key configured.

1. Log in at graph.theproductcreator.com
2. Go to Settings → API Keys → Create New Key
3. Add to your .mcp.json config

Once configured, run /upg-pull again.
```

### Step 2: Select Product

If the user specified a product name, search for it. Otherwise, list all products:

```
Your products on The Product Creator:

  1. My SaaS App (42 entities, 38 edges)
  2. Side Project (12 entities, 8 edges)
  3. Client Engagement (67 entities, 55 edges)

Which one do you want to pull down? (number or name)
```

### Step 3: Fetch Full Graph

```
mcp__tpc-graph__get_product_graph({
  product_id: "<selected_product_id>"
})
```

This returns the full graph: product metadata, all nodes, all edges.

### Step 4: Transform to .upg Format

Convert the cloud graph format to the UPG file format:

```json
{
  "upg_version": "0.1.0",
  "exported_at": "<current ISO 8601 timestamp>",
  "source": {
    "tool": "tpc-graph-cloud",
    "tool_version": "1.0.0"
  },
  "product": {
    "id": "<generate new local nanoid or preserve cloud id>",
    "title": "<product title>",
    "description": "<product description>",
    "stage": "<stage if available>"
  },
  "nodes": [
    {
      "id": "n_<nanoid>",
      "type": "<entity type>",
      "title": "<title>",
      "description": "<description>",
      "tags": [],
      "status": "<status>",
      "properties": { ... }
    }
  ],
  "edges": [
    {
      "id": "e_<nanoid>",
      "source": "<source node id>",
      "target": "<target node id>",
      "type": "<edge type>"
    }
  ]
}
```

### Step 5: Write the File

Check if a `.upg` file already exists:
- If yes: "A .upg file already exists (product.upg with <N> entities). Overwrite it, or save as <product-name>.upg?"
- If no: Write to `product.upg` in the current directory

Write the file using the Write tool or Bash:
```bash
# Write the transformed JSON to the .upg file
```

The upg-local MCP server will auto-detect the file change and reload.

### Step 6: Confirm

```
## Pull Complete

Pulled "<Product Name>" from The Product Creator cloud.

  File: product.upg
  Entities: <N> (<breakdown by type>)
  Connections: <N>
  Domains: <N> covered

Your graph is now local. It's a .upg file — portable, git-friendly, yours.

### What You Can Do Now

  /upg-status     — See your graph health dashboard
  /upg-tree       — View through framework lenses (ost, user, validation...)
  /upg-gaps       — Find strategic gaps and get action plans
  /upg-create     — Add new entities locally
  /upg-discover   — Run a guided discovery session

### Version Control

  git add product.upg
  git commit -m "Pull <product name> graph from cloud"

  Now you have full git history of your product thinking.
  Branch, diff, review — your graph is just data.

### Stay in Sync

  Edit locally, then /upg-push to sync back to the cloud.
  The .upg file is your source of truth for local work.
```

## Edge Cases

**Cloud graph is empty:**
```
"<Product Name>" has no entities in the cloud yet.
Build it locally with /upg-init, then /upg-push when ready.
```

**Very large graph (200+ entities):**
```
This is a large graph (<N> entities). The pull may take a moment...
```
Use pagination if needed from the cloud API.

**Node type mapping:**
Cloud uses the same entity types as local (`@upg/core` shared ontology), so types map directly. Cloud stores type-specific data in a `data` JSONB column — map this to `properties` in the `.upg` format.

## Key Principles

- **Cloud to local, not cloud to local lock-in.** The `.upg` file is the user's — portable, open, git-tracked.
- **Preserve fidelity.** Every entity, every edge, every property should survive the round-trip.
- **Handle conflicts.** If a local file exists, ask before overwriting.
- **Suggest git.** Encourage version control — that's one of the key advantages of local-first.
- **The `.upg` file auto-reloads.** The upg-local MCP server watches the file — no restart needed.
