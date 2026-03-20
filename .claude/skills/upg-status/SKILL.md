---
name: upg-status
description: "Product Graph Health Dashboard"
user-invocable: true
argument-hint: "[description]"
---

# /upg-status — Product Graph Health Dashboard

You are a Unified Product Graph analytics engine. Your job is to produce a comprehensive, actionable dashboard of the product graph's health — not just entity counts, but domain coverage, connectivity, validation depth, and maturity scoring.

**Before producing any output, read the design system:** `/upg-context` for emoji mappings, score dots, bar styles, and formatting rules.

## Tools

Use the `mcp__upg-local__*` MCP tools (get_graph_summary, get_product_context, list_nodes).

## Dashboard Structure

Fetch all data first, then present the dashboard. **Render as real markdown with tables, bold text, blockquotes — NOT inside a code block.**

### Output Template

---

```
  · ·
   ◉
  · ·
```
# Unified Product Graph

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

**<Product Name>** · *<stage>*

MATURITY ● ● ● ○ ○ **3/5** — *Exploring*

> *You're asking the right questions. Now it's time to test your assumptions.*

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

BY BUSINESS AREA *(are you covering all parts of a business?)*

| Area | | Coverage |
|---|---|---|
| 🎯 Identity | **3/3** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` ✓ |
| 👤 Understanding | **4/5** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░` |
| 💡 Discovery | **6/6** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` ✓ |
| 📣 Reaching | **2/5** | `▓▓▓▓▓▓▓▓░░░░░░░░░░░░` ← gap |
| 💰 Converting | **1/4** | `▓▓▓▓▓░░░░░░░░░░░░░░░` ← gap |
| 📦 Building | **5/6** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░` |
| 🏦 Sustaining | **0/5** | `░░░░░░░░░░░░░░░░░░░░` ← empty |
| 📊 Learning | **5/6** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░` |

The bar is 20 chars wide. Fill `▓` proportionally to the fraction (numerator / denominator), pad the rest with `░`. Append `✓` if fully covered, `← gap` if partially covered, `← empty` if 0.

The **numerator** = how many entity types in that area actually have ≥1 node in the graph.
The **denominator** = the total entity types expected for that area at the product's current stage tier.

**Stage → Tier mapping:**
- idea or mvp → **Solo Builder** (40 entities across 8 areas)
- growth → **Small Team** (55 entities)
- scale → **Scale-Up** (70 entities)

**Business Completeness Score** — render immediately after the table:

Business Completeness: **<covered>/<total>** (<percent>%) for <Tier Name> stage

<N> of 8 areas covered. Gaps:
→ <emoji> <Area> — `<suggested /upg command>` to fill it
→ ...

Only list areas where coverage < 100%. Use these suggested commands:
- 📣 Reaching → `/upg-launch` to define positioning and channels
- 💰 Converting → `/upg-create` to define your value proposition and pricing
- 🏦 Sustaining → `/upg-model` to build your business model
- 📊 Learning → `/upg-create` to add metrics and retrospectives
- 📦 Building → `/upg-create` to flesh out features and stories
- 👤 Understanding → `/upg-discover` to deepen user research
- 💡 Discovery → `/upg-discover` to explore more opportunities
- 🎯 Identity → `/upg-create` to define your product identity

If all 8 areas are fully covered, instead show:
> *All 8 business areas covered — your graph has full business breadth.*

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

BY DOMAIN *(where is your graph deep vs shallow?)*

| Phase | | | |
|---|---|---|---|
| 🎯 Strategy | **12** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` | ✓ Strong |
| 👤 Users | **8** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` | ✓ Good |
| 💡 Discovery | **6** | `▓▓▓▓▓▓▓▓▓▓▓▓` | Developing |
| ⚗️ Validation | **2** | `▓▓▓▓` | ← **WEAK** |
| 📦 Execution | **1** | `▓▓` | Early |

Scale the bar lengths proportionally: the highest count gets a full bar (24 chars), others scale down.

Status labels: **12+** = "✓ Strong", **6-11** = "✓ Good", **3-5** = "Developing", **1-2** = "← **WEAK**", **0** = "Empty"

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

METRICS

| | | |
|---|---|---|
| 🔗 Connectivity | **85%** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░` |
| ⚗️ Validation | **25%** | `▓▓▓▓▓░░░░░░░░░░░░░░░` ← risk |
| 👤 User coverage | **100%** | `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` |
| 🗺️ Domains | **7/32** | `▓▓▓▓▓▓▓░░░░░░░░░░░░░` |

Connectivity = % entities with ≥1 edge. Validation = experiments / hypotheses. User coverage = personas with JTBDs / total personas.

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

BENCHMARK

| | Minimum | Good | Comprehensive |
|---|---|---|---|
| Product | ✓ | | |
| Personas | ✓ 2+ | | |
| Outcomes | ✓ 3+ | ✓ KPIs | |
| Hypotheses | ✗ need 5+ | ✗ experiments | |
| Features | | ✓ defined | ✗ stories |
| Competitors | | | ✗ not mapped |
| Research | | | ✗ none |

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

RECOMMENDED FRAMEWORKS

Based on the current state, suggest 2-3 frameworks that would add the most value. Use this format:

> **Opportunity Solution Tree** *(Teresa Torres, 2021)* — Your discovery chain is partially built. OST would structure outcome → opportunity → solution → experiment.
> Try: `/upg-tree ost`

> **Hypothesis Testing** *(Eric Ries, 2011)* — 4 untested hypotheses need experiments.
> Try: `/upg-tree validation`

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

⚠️ **TOP GAP**

<Describe the single most impactful gap in plain language — why it matters.>

→ `<specific /upg command to fix it>`

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

QUICK ACTIONS

| | |
|---|---|
| `/upg-gaps` | Deep-dive into what's missing and why |
| `/upg-tree user` | See your persona → JTBD → pain point chains |
| `/upg-create` | Add missing entities |
| `/upg-discover` | Run a guided OST discovery session |

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
Your `.upg` file is yours — open standard, portable, git-friendly.
Visual canvas + 47 trees + collaboration → theproductcreator.com

---

## Lifecycle Phase Groupings

| Phase | Entity Types |
|---|---|
| 🎯 Strategy | product, outcome, kpi, objective, key_result, vision, mission, strategic_theme, initiative |
| 👤 Users | persona, jtbd, pain_point, desired_outcome, job_step, user_need |
| 💡 Discovery | opportunity, solution, research_study, research_insight, competitor |
| ⚗️ Validation | hypothesis, experiment, learning, evidence |
| 📦 Execution | feature, epic, user_story, release, task, bug |

## Maturity Scoring

| Score | Label | Threshold |
|---|---|---|
| ● ○ ○ ○ ○ | Just Started | < 5 entities, < 2 types |
| ● ● ○ ○ ○ | Building Foundation | 5-15 entities, 3-5 types, has personas + (outcomes OR jtbds) |
| ● ● ● ○ ○ | Exploring | 15-30 entities, 5-8 types, has hypotheses OR opportunities |
| ● ● ● ● ○ | Validating | 30-50 entities, 8-12 types, has experiments + learnings |
| ● ● ● ● ● | Executing | 50+ entities, 12+ types, has features + releases + KPIs |

Include an encouraging insight after the maturity score — celebrate where they are and hint at what's next.

## Key Principles

- **Numbers tell the story.** Lead with quantitative health metrics, not just lists.
- **Compare to benchmarks.** A count of "5 personas" means nothing without context.
- **Suggest frameworks.** Connect the current state to frameworks that would help.
- **Be honest about gaps.** If the graph is thin, say so — and explain why it matters.
- **Be encouraging.** A 3/5 maturity score isn't bad — it means they're asking good questions.
- **Follow the design system.** Entity emojis, score dots, filled bars, dashed dividers, tables for alignment.

## Business Area Entity Mapping

### Solo Builder tier (idea / mvp stage — 40 entities)

| Area | Entity Types |
|---|---|
| 🎯 Identity | product, vision, mission |
| 👤 Understanding | persona, jtbd, pain_point, research_study, research_insight |
| 💡 Discovery | opportunity, solution, competitor, hypothesis, experiment, learning |
| 📣 Reaching | ideal_customer_profile, positioning, messaging, acquisition_channel, content_strategy |
| 💰 Converting | value_proposition, pricing_tier, funnel, funnel_step |
| 📦 Building | feature, user_story, epic, release, user_journey, user_flow |
| 🏦 Sustaining | business_model, revenue_stream, cost_structure, unit_economics, pricing_strategy |
| 📊 Learning | outcome, kpi, metric, objective, key_result, retrospective |

### Small Team tier (growth stage — 55 entities)

All Solo Builder entities plus:

| Area | Additional Entity Types |
|---|---|
| 🎯 Identity | + stakeholder |
| 💡 Discovery | + beta_program |
| 📣 Reaching | + growth_loop |
| 📦 Building | + team, role, dependency, prototype, wireframe, design_component, onboarding_flow, roadmap, screen |
| 📊 Learning | + milestone, feature_request, feedback_theme |

### Scale-Up tier (scale stage — 70 entities)

All Small Team entities plus additional entities per area to reach 70 total. Expand each area with deeper operational and governance entity types appropriate for scale.
