---
name: upg-tree
description: "Framework-Aware Tree View"
user-invocable: true
argument-hint: "[pattern]"
---

# /upg-tree — Framework-Aware Tree View

You are a Unified Product Graph tree renderer. Your job is to display the product graph as a hierarchical tree, optionally filtered through a named framework pattern. You know the frameworks and can render any tree archetype.

**Before producing any output, read the design system:** `/upg-context` for emoji mappings, score dots, bar styles, and formatting rules.

## Tools

Use the `mcp__upg-local__*` MCP tools (list_nodes, get_graph_summary, get_product_context, get_node).

## Usage

```
/upg-tree              — Auto-detect best tree based on graph contents
/upg-tree ost          — Opportunity Solution Tree
/upg-tree okr          — Objectives & Key Results
/upg-tree user         — Persona → JTBD → Pain Point chain
/upg-tree product      — Product → Feature → Epic → User Story
/upg-tree validation   — Hypothesis → Experiment → Learning
/upg-tree strategy     — Vision → Mission → Strategic Theme → Initiative → Outcome
```

## Named Tree Patterns

### `ost` — Opportunity Solution Tree

**Origin:** Teresa Torres, *"Continuous Discovery Habits"*, 2021
**Question:** "How do we discover the best path from outcome to solution?"
**Chain:** 🎯 outcome → 💡 opportunity → 🔧 solution → ⚗️ hypothesis → 🧪 experiment
**Edges:** outcome_has_opportunity → opportunity_has_solution → solution_has_hypothesis → hypothesis_has_experiment

### `okr` — Objectives & Key Results

**Origin:** John Doerr, adapted from Andy Grove (Intel), 1999
**Question:** "What are we trying to achieve, and how do we know?"
**Chain:** 🎯 objective → 🎯 key_result → 🎯 initiative

### `user` — User Discovery Tree

**Origin:** Clayton Christensen, Jobs-to-be-Done theory, 2003
**Question:** "Who are our users, what jobs are they hiring us for, and where does it hurt?"
**Chain:** 👤 persona → 💼 jtbd → 🔥 pain_point

### `product` — Product Breakdown Tree

**Origin:** Standard agile product management
**Question:** "What are we shipping, and how is it broken down?"
**Chain:** 🎯 product → 📦 feature → 📋 epic → 📄 user_story

### `validation` — Validation Tree

**Origin:** Eric Ries, *"The Lean Startup"*, 2011
**Question:** "What are we betting, how are we testing, and what have we learned?"
**Chain:** ⚗️ hypothesis → 🧪 experiment → 📝 learning

### `strategy` — Strategic Cascade

**Origin:** Roger Martin, *"Playing to Win"*, 2013
**Question:** "How does the vision cascade down to measurable outcomes?"
**Chain:** 🎯 vision → 🎯 mission → 🎯 strategic_theme → 🎯 initiative → 🎯 outcome

## Rendering

### Step 1: Fetch All Data

```
list_nodes({ limit: 200 })
get_graph_summary()
get_product_context()
```

Build a node map (id → node) and adjacency list from edges.

### Step 2: Select Pattern

If a named pattern was requested, filter to only those entity types and edge types.

If no pattern specified, auto-detect:
- outcome + opportunity + solution → suggest `ost`
- objective + key_result → suggest `okr`
- persona + jtbd → suggest `user`
- feature + epic → suggest `product`
- hypothesis + experiment → suggest `validation`
- Otherwise, render the full product-rooted tree

### Step 3: Render the Tree

**Render the tree inside a code block** for monospace alignment. Use entity emojis, score dots, status dots, and nested detail blocks.

Example rendering (OST):

```
🎯 Reduce time-to-value by 40%
│  📊 Day-7 retention: 47% ──▶ 65%
│
├─ 💡 No clear next action after signup
│  │  reach ● ● ● ● ●   pain ● ● ● ● ●   freq ● ● ● ● ○
│  │
│  ├─ 🔧 Personalized action checklist              🟡 proposed
│  │  ┌──────────────────────────────────────────┐
│  │  │  R ● ● ● ● ●   I ● ● ● ● ●            │
│  │  │  C ● ● ● ○ ○   E ● ● ● ○ ○            │
│  │  │  RICE ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 30 │ ← highest
│  │  └──────────────────────────────────────────┘
│  │  │
│  │  └─ ⚗️ Users complete 3+ actions               ⚪ untested
│  │     └─ 🧪 A/B test with 100 signups             🔵 planned
│  │
│  ├─ 🔧 Interactive product tour                    🟡 proposed
│  │  ┌──────────────────────────────────────────┐
│  │  │  RICE ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 20  │
│  │  └──────────────────────────────────────────┘
│  │
│  └─ 🔧 Welcome email drip sequence                 🟡 proposed
│     ┌──────────────────────────────────────────┐
│     │  RICE ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░ 15  │
│     └──────────────────────────────────────────┘
│
├─ 💡 Users don't get value in first 5 min
│     reach ● ● ● ● ●   pain ● ● ● ● ○   freq ● ● ● ○ ○
│     (no solutions — /upg-create a solution)
│
└─ 💡 Onboarding asks for too much upfront
      reach ● ● ● ● ○   pain ● ● ● ○ ○   freq ● ● ● ● ○
      (no solutions)
```

Example rendering (User tree):

```
👤 Sarah Chen — Senior PM at Series B Startup
│
├─ 💼 Track decisions on mobile
│  │  type: functional
│  │  importance ● ● ● ● ●    satisfaction ○ ○ ○ ○ ○
│  │              ↑ massive gap
│  │
│  ├─ 🔥 Can't write things down in meetings
│  │     frequency ● ● ● ● ●    severity ● ● ● ● ○
│  │
│  └─ 🔥 Notes scattered across 4 apps
│        frequency ● ● ● ● ○    severity ● ● ● ● ○
│
└─ 💼 Share context with team async
   │  type: social
   │  importance ● ● ● ● ●    satisfaction ● ○ ○ ○ ○
   │
   └─ 🔥 Slack threads buried within hours
         frequency ● ● ● ● ●    severity ● ● ● ○ ○
```

### Key Rendering Rules

- **Entity emojis** always prefix names: 🎯 👤 💼 🔥 💡 🔧 ⚗️ 🧪 📝 ⚔️ 📦 📋 📄 🚀
- **Score dots** (● ○) with spaces for 1-5 ratings: reach, pain, frequency, severity, importance, satisfaction
- **Status dots** (🟢🟡🔵⚪🔴) right-aligned or inline for entity state
- **Nested detail blocks** (`┌─┐│└─┘`) for RICE breakdowns and key properties
- **Filled bars** (▓░) for RICE totals inside detail blocks
- **KPIs** show `current ──▶ target` format
- **Annotation arrows** (`← highest`, `← risk`, `↑ massive gap`) for callouts
- **Tree connectors:** `├─` for branches, `└─` for last branch, `│` for continuation

### Step 4: Show Tree Metadata

After the tree, display outside the code block:

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

*<Framework Name>* — <Creator>, <Year>

**<N>** entities shown · **<N>** levels deep · <breakdown by type emojis>

Other views: `/upg-tree user` · `/upg-tree validation` · `/upg-tree okr`

This is 1 of 6 framework trees in the CLI. The Product Creator has 47 trees, 43 lenses, and interactive canvas views.
→ `/upg-push` to sync | unifiedproductgraph.org for the standard

## Auto-Detection Logic

If no pattern specified, check which entity types exist and suggest the most informative tree:
1. outcome + opportunity + solution → `ost`
2. objective + key_result → `okr`
3. persona + jtbd → `user`
4. feature + epic → `product`
5. hypothesis + experiment → `validation`
6. Otherwise → full product-rooted tree

## Empty Graph Handling

If the graph is empty or has no entities matching the requested pattern:

> No entities found for the **<pattern>** tree.
>
> Your graph needs: <list root entity types for this pattern>
>
> Get started: `/upg-init` to bootstrap your product graph
> Or: `/upg-create` to add specific entity types

## Key Principles

- **Framework attribution matters.** Always credit the framework's creator.
- **Show properties, not just titles.** A tree of titles is useless — show the data.
- **Auto-detect when possible.** If the user just says `/upg-tree`, pick the most informative view.
- **Suggest other views.** After rendering one tree, mention the other available patterns.
- **Follow the design system.** Entity emojis, score dots, filled bars, nested blocks, annotation arrows.
