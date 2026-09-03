# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## FlowStrength visual direction

- Treat `content-brief.md` as the content and evidence brief for every module. The site narrative must stay aligned with the resume storyline: the gap between training records and analysis, the plan-execute-review loop, controlled AI architecture, evaluation-driven iteration, and launch operations.
- Do not publish a resume metric merely because it appears in the source copy. Apply the evidence gates in `content-brief.md`, and either attach current supporting evidence or label/remove the claim until it is verified.
- Use the selected soft mint / ice-blue scroll-chapter concept as the source of truth.
- Structure the page in this order: homepage, feature gallery, user pain points, competitor analysis, product decisions, product development (system architecture), AI system design, AI evaluation, user testing, launch operations, and project reflection.
- Until a module is discussed and approved, keep it as a minimal placeholder instead of carrying forward speculative content.
- Keep the information dense but scannable; do not paste resume bullets as long prose.
- Use the minimum copy needed to communicate each point across the entire site. Remove decorative labels, repeated explanations, and text that does not change the reader's understanding.
- Prefer charts and diagrams for processes, relationships, and comparisons. Keep primary evidence as original screenshots, and do not add decorative charts that encode no new information.
- Product diagrams must expose real decisions, state transitions, recovery paths, or responsibility boundaries. A sequence of generic labels is not sufficient.
- Apply a 30-second scan rule to every case-study module: one thesis, no more than three supporting signals, and one transition to the next decision. Remove secondary diagrams or explanations when they repeat the same conclusion.
- Keep the user pain points chapter to one page with the single title `用户痛点`, left editorial analysis (core gap lead sentence, 01/02 limitation breakdown, positioning conclusion) referencing the Midday version, and a single light-theme Reddit evidence screenshot (`assets/屏幕截图 2026-09-03 134116.png`) labeled `Reddit 社区讨论` on the right.
- Keep competitor analysis as an independent chapter immediately following user pain points: place the positioning quadrant and one shared-start, three-lane structure/flow diagram side by side, then end with exactly one concise conclusion sentence. Populate the quadrant with multiple candidates including Fitbod, never place FlowStrength in it, and deep-dive Hevy, Fitbod, and Arvo without SWOT or three separate prose cards.
- Keep `用户痛点` and `竞品分析` as two separate top-level chapters and navigation entries (`痛点` and `竞品`). Do not merge them into one wrapper chapter.
- Keep product decisions to one page immediately after competitor analysis: use `核心训练链路不依赖 AI` as the product premise, then focus on `将分析主导权交给模型` and `模型决定查什么，App 保证怎么查`. Avoid introducing `Planner-first / ReAct-first` labels in this module; explain the actual control and responsibility boundaries in plain language. Use full-width editorial decision stories with comparison and responsibility flows rather than equal rounded cards.
- Keep AI system design focused on one end-to-end runtime flow plus two detailed zoom-ins: `Context Assembly` and `AnalyzeTrainingTool`. Context must show source selection, token-budget assembly, deterministic truncation fallback, and Observation updates; AnalyzeTrainingTool must show scope resolution, local fact queries, deterministic metrics, comparison ranges, limitations, pagination, and the return to Agent reasoning.
- Keep AI evaluation organized into four distinct panels without a chapter subtitle: `评价体系` → `测评集设计` → `测试方法` → `优化效果`. Separate P0 hard gates from the 10-point quality rubric, define Case Contracts and testing methodology (synthetic fixture, live runner, strict oracle, fault injection), and distinguish Smoke completion (100%) from true Oracle semantic passing rate (43.5%).
- Keep `用户测试` and `上线迭代` as two separate top-level chapters and navigation entries (`用户测试` and `上线迭代`). Do not merge them into one wrapper chapter.
- Keep `用户测试` formatted referencing the `用户痛点` chapter: use a single-page split layout with left editorial analysis (chapter header, metric badges for test scope, 01-04 system convergence dimensions, omitting the bottom takeaway box) and right evidence cards (2x2 grid containing the four feedback screenshots under a 部分用户反馈 header).
- Keep `上线迭代` presented as an integrated 3-column metric dashboard (01 market traction, 02 user reviews, 03 release pipeline) with native metric stats on top and compact evidence windows below, summarizing the evidence as `真实安装 → 用户评价 → 持续版本发布`; do not repeat store promotional images or add a release-process checklist.
- Keep project reflection to one closing page with exactly two themes: front-load key-path instrumentation, and evolve AI from a training-analysis feature into a contextual capability across planning, execution, and review. End with `下一阶段从“完成 AI 功能”，走向“建立可观测、可迭代、贯穿训练闭环的 AI 产品”。`
- The product design chapter is removed per user decision. Do not re-introduce it.
- Present all seven Google Play promotional images, with the AI feature first.
- Do not duplicate the seven screenshots in a second detailed feature section; the horizontal gallery is the sole feature showcase.
- Use one consistent very-light mint page background; keep blue and green variation inside the supplied promotional images rather than alternating full-page section colors.
- Keep the hero brand-first: center a single oversized `FlowStrength` wordmark, omit proposition/eyebrow copy, and place only verified project facts and results in the secondary layer.
- Keep the hero introduction exactly as: `规划训练周期、记录每次训练，并基于训练数据获得个性化 AI 分析`
- Keep the hero metadata to `我的角色 / 项目周期 / 当前阶段`, with `独立负责产品全流程 / 2026.03—至今 / 已上线 Google Play 商店`, followed by the Google Play store-page link and the note `中国大陆访问需要国际网络`.
- The AI feature is officially released. In the hero metadata, use the current-stage wording `已上线 Google Play 商店`; do not describe the AI feature as testing, validation-only, or not yet released.
- Do not show download/version/market result metrics in the hero; keep them in the later results section. Label every Google Play entry with a Mainland-China network-access caveat.
