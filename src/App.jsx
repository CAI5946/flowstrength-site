import { useEffect, useState, useRef, useCallback } from "react";
import redditDemandImage from "../assets/屏幕截图 2026-09-03 134116.png";
import feedbackLoadingImage from "../assets/comments/微信图片_20260901174926_44_102.webp";
import feedbackLocaleImage from "../assets/comments/微信图片_20260901174944_45_102.webp";
import feedbackOnboardingImage from "../assets/comments/微信图片_20260901175056_46_102.webp";
import feedbackLagImage from "../assets/comments/微信图片_20260901175056_47_102.webp";
import storeReviewEnglishImage from "../assets/store/focus_review_en.webp";
import storeReviewGreekImage from "../assets/store/focus_review_gk.webp";
import storeInstallsImage from "../assets/store/focus_installs.webp";
import storeActiveDevicesImage from "../assets/store/focus_active.webp";

const storeUrl = "https://play.google.com/store/apps/details?id=com.flowstrength.myapp";

const featureStrip = [
  { label: "AI 分析", image: `${import.meta.env.BASE_URL}assets/AI.webp` },
  { label: "训练规划", image: `${import.meta.env.BASE_URL}assets/Home.webp` },
  { label: "训练执行", image: `${import.meta.env.BASE_URL}assets/Train.webp` },
  { label: "训练历史", image: `${import.meta.env.BASE_URL}assets/Record.webp` },
  { label: "训练补录", image: `${import.meta.env.BASE_URL}assets/Log.webp` },
  { label: "进度趋势", image: `${import.meta.env.BASE_URL}assets/Tracker.webp` },
  { label: "训练工具", image: `${import.meta.env.BASE_URL}assets/Tools.webp` },
];

const userTestingMetrics = [
  { val: "14 天", label: "测试周期" },
  { val: "16 名", label: "真实用户" },
  { val: "数十条", label: "真实反馈" },
];

const userTestDimensions = [
  {
    tag: "新手起步门槛",
    desc: "内置推荐模板，消除起步配置障碍",
  },
  {
    tag: "冷启动响应速度",
    desc: "数据异步预加载与查询精简，冷启动耗时收敛至 < 300ms",
  },
  {
    tag: "操作流畅度",
    desc: "消除不必要的动画和特效，调整组件关系，避免全局重绘",
  },
  {
    tag: "本地化适配",
    desc: "杜绝硬编码，统一采用l10n 动态切换全量校验",
  },
];

const closedTestFeedback = [
  {
    tag: "冷启动速度",
    title: "加载时间较长",
    action: "冷启动预加载与查询精简",
    image: feedbackLoadingImage,
    alt: "封闭测试用户反馈加载时间较长",
  },
  {
    tag: "语言适配",
    title: "语言设置未生效",
    action: "l10n 动态切换全域校验",
    image: feedbackLocaleImage,
    alt: "封闭测试用户反馈部分页面未正确应用英文设置",
  },
  {
    tag: "新手引导",
    title: "计划创建上手难",
    action: "内置新手推荐与周期模板",
    image: feedbackOnboardingImage,
    alt: "封闭测试用户反馈不知道如何开始建立完整训练计划",
  },
  {
    tag: "操作流畅度",
    title: "做组与滑动掉帧",
    action: "局部事务写入与模糊特效裁剪",
    image: feedbackLagImage,
    alt: "封闭测试用户反馈应用存在卡顿",
  },
];

const competitorQuadrants = {
  algDriven: {
    title: "算法推荐型",
    desc: "算法自动生成个性化训练安排",
    apps: [
      { name: "Fitbod", highlight: true },
      { name: "GymStreak" },
      { name: "Gravl" },
    ],
  },
  aiDecision: {
    title: "智能决策型",
    desc: "高阶力量个性化分析",
    apps: [
      { name: "Arvo", highlight: true },
    ],
  },
  generalFitness: {
    title: "泛健身打卡",
    desc: "动作库跟练与基础打卡",
    apps: [
      { name: "Keep" },
      { name: "Nike Training Club" },
      { name: "Apple Fitness+" },
    ],
  },
  pureLogger: {
    title: "纯工具记录型",
    desc: "沉淀数据但缺乏分析",
    apps: [
      { name: "Hevy", highlight: true },
      { name: "Strong" },
      { name: "JEFIT" },
    ],
  },
};



const demandEvidence = [
  {
    index: "01",
    source: "Reddit 社区讨论",
    summary: "用户认可 AI 分析的价值，但训练数据搬运繁琐，专业记录软件又缺乏模型能力。",
    image: redditDemandImage,
    alt: "Reddit 用户寻找能够结合历史训练记录进行分析和计划生成的 AI 训练 App",
  },
];

const productDecisions = [
  {
    index: "01",
    title: "AI 范围",
    thesis: "优先切入训练复盘阶段",
    stages: [
      {
        status: "discard",
        tag: "规划阶段 · 难以满足需求",
        desc: "计划与个人偏好、健身条件等多因素强相关，AI 难以在信息有限的情况下给出满意方案",
      },
      {
        status: "discard",
        tag: "执行阶段 · 延迟高且提升有限",
        desc: "举铁做组需要毫秒级打卡；AI 既存在网络和生成延迟，也难以减少用户物理操作步骤",
      },
      {
        status: "adopt",
        tag: "复盘阶段 · 高价值切入",
        desc: "固定统计图表分析受限，大模型擅长上下文推理与模式识别，能跨时间、跨动作进行灵活深度分析",
      },
    ],
  },
  {
    index: "02",
    title: "AI 架构",
    thesis: "将分析主导权交给模型",
    stages: [
      {
        status: "discard",
        tag: "规则主导（已放弃）· AI能力受限",
        desc: "用固定规则树匹配用户意图，只能回答预设指标；面对复杂的长尾提问，完全丧失了跨数据归因能力。",
      },
      {
        status: "adopt",
        tag: "模型主导（最终选择）· 动态多步探索",
        desc: "由模型自主理解长尾提问，决定调什么工具、对比哪段数据；能像真人教练一样，根据线索层层追踪原因。",
      },
      {
        status: "guard",
        tag: "受控运行 · 严格限制调用预算",
        desc: "给予模型分析空间，但不给无界自由；工程上硬性约束工具调用步数与 Token 预算，超时或异常确定性回退。",
      },
    ],
  },
  {
    index: "03",
    title: "AI 权限",
    thesis: "模型提需求，工具做计算，用户定结果",
    stages: [
      {
        status: "neutral",
        tag: "指标运算 · 本地专用工具承载",
        desc: "模型只负责“要什么指标”；容量统计、极限估算等派生运算由本地 Tool 确定性算出，数据不足时主动标明局限。",
      },
      {
        status: "neutral",
        tag: "计划干预 · 仅生成结构化草案",
        desc: "模型被物理剥离数据库写权限；所有训练调整均以可视化 Diff 草案呈现，无法在后台私自篡改训练资产。",
      },
      {
        status: "adopt",
        tag: "执行确认 · 用户拥有最高权限",
        desc: "是否采纳建议、何时应用变动，裁决权完全保留在用户手中，彻底消除用户对数据失控的安全顾虑。",
      },
    ],
  },
];

function CompetitorFlowChart() {
  const lanes = [
    {
      id: "hevy",
      name: "Hevy",
      type: "记录与统计",
      data: "长期做组、容量、1RM 与训练统计",
      reasoning: "呈现趋势与纪录，由用户解释停滞原因",
      action: "用户手动调整后续训练安排",
      boundary: "数据连续，解释与调整依赖用户",
    },
    {
      id: "fitbod",
      name: "Fitbod",
      type: "算法推荐型",
      data: "历史训练、恢复、目标、设备与偏好",
      reasoning: "算法生成训练推荐，用户可调整输入",
      action: "刷新推荐训练，用户仍可编辑",
      boundary: "自动化高，决策依据不完全透明",
    },
    {
      id: "arvo",
      name: "Arvo",
      type: "AI 动态指导",
      data: "训练历史、目标约束与当组表现",
      reasoning: "AI 逐组判断，并提供建议与解释",
      action: "实时调整，或激活并撤销计划",
      boundary: "执行指导强，跨周期分析边界待验证",
    },
  ];

  const stages = [
    { key: "data", label: "01 数据输入" },
    { key: "reasoning", label: "02 判断方式" },
    { key: "action", label: "03 调整落地" },
  ];

  return (
    <div className="competitor-flow-chart" role="region" aria-label="同任务流程拆解图">
      <div className="flow-shared-start">
        <span className="flow-start-tag">基准任务</span>
        <span className="flow-start-title">基于过去 8 周记录，解释平台期并决定下周如何调整</span>
      </div>

      <div className="flow-desktop">
        <div className="flow-tree-connector" aria-hidden="true">
          <svg viewBox="0 0 600 24" fill="none" preserveAspectRatio="none" className="flow-tree-svg">
            <path d="M 300 0 L 300 12 M 100 12 L 500 12 M 100 12 L 100 24 M 300 12 L 300 24 M 500 12 L 500 24" />
            <circle cx="100" cy="24" r="2" />
            <circle cx="300" cy="24" r="2" />
            <circle cx="500" cy="24" r="2" />
          </svg>
        </div>

        <div className="flow-grid-row flow-grid-row--header">
          {lanes.map((lane) => (
            <div key={lane.id} className="flow-lane-header">
              <span className="flow-lane-badge">{lane.type}</span>
              <strong className="flow-lane-name">{lane.name}</strong>
            </div>
          ))}
        </div>

        {stages.map((stage) => (
          <div key={stage.key} className="flow-stage-group">
            <div className="flow-stage-divider">
              <span className="flow-stage-label">{stage.label}</span>
            </div>
            <div className="flow-grid-row">
              {lanes.map((lane) => (
                <div key={lane.id} className="flow-node-card">
                  <p className="flow-node-text">{lane[stage.key]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flow-stage-divider flow-stage-divider--boundary">
          <span className="flow-stage-label">关键边界</span>
        </div>
        <div className="flow-grid-row">
          {lanes.map((lane) => (
            <div key={lane.id} className="flow-node-card flow-node-card--boundary">
              <p className="flow-node-text">{lane.boundary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flow-mobile">
        {lanes.map((lane) => (
          <article key={lane.id} className="flow-mobile-lane">
            <header>
              <strong>{lane.name}</strong>
              <span>{lane.type}</span>
            </header>
            <ol>
              {stages.map((stage) => (
                <li key={stage.key}>
                  <span>{stage.label.slice(3)}</span>
                  <p>{lane[stage.key]}</p>
                </li>
              ))}
            </ol>
            <p className="flow-mobile-boundary">{lane.boundary}</p>
          </article>
        ))}
      </div>

    </div>
  );
}




function FeatureStripSection() {
  const trackRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollButtons();
    track.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons, { passive: true });
    return () => {
      track.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleStep = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll(".feature-strip__item");
    if (!items.length) return;
    const itemWidth = items[0].getBoundingClientRect().width + 22;
    track.scrollBy({ left: direction * itemWidth, behavior: "smooth" });
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - track.offsetLeft,
      scrollLeft: track.scrollLeft,
      hasDragged: false,
    };
    track.classList.add("is-dragging");
  };

  const handleMouseMove = (e) => {
    if (!dragState.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.25;
    if (Math.abs(walk) > 4) {
      dragState.current.hasDragged = true;
    }
    track.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    const track = trackRef.current;
    if (track) track.classList.remove("is-dragging");
  };

  return (
    <div className="feature-strip" aria-label="核心功能展示长廊">
      <div className="feature-strip__carousel">
        <button
          type="button"
          className="feature-strip__arrow feature-strip__arrow--prev"
          onClick={() => handleStep(-1)}
          aria-label="查看上一个功能"
          disabled={!canScrollLeft}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div
          className="feature-strip__track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {featureStrip.map((feature, index) => (
            <figure className="feature-strip__item" key={feature.label}>
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{feature.label}</figcaption>
              <img
                src={feature.image}
                alt={`FlowStrength ${feature.label}功能截图`}
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="feature-strip__arrow feature-strip__arrow--next"
          onClick={() => handleStep(1)}
          aria-label="查看下一个功能"
          disabled={!canScrollRight}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DiagramNode({ x, width = 150, label, detail, accent = "#176b50", fill = "#ffffff" }) {
  return (
    <g>
      <rect x={x} y="46" width={width} height="66" rx="9" fill={fill} stroke={accent} strokeOpacity="0.34" />
      <text x={x + 12} y="72" fill="#101211" fontSize="13" fontWeight="800">{label}</text>
      <text x={x + 12} y="94" fill="#64748b" fontSize="10.5">{detail}</text>
    </g>
  );
}

function AiRuntimeFlowSvg() {
  return (
    <svg className="ai-runtime-svg" viewBox="0 0 940 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI 分析受控运行时状态机与降级回路">
      <defs>
        <marker id="runtime-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#176b50" />
        </marker>
        <marker id="runtime-arrow-warn" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#b45309" />
        </marker>
      </defs>

      {/* 5 个核心主流程节点，内嵌各阶段运行约束 */}
      <DiagramNode x={20} width={140} label="理解问题" detail="意图 · 动作 · 时间范围" />
      <DiagramNode x={200} width={150} label="装配上下文" detail="10.8k 预算 · 任务画像" />
      <DiagramNode x={390} width={150} label="模型选择工具" detail="按需决策 · 上限 6 轮" fill="#f3fbf7" />
      <DiagramNode x={580} width={150} label="App 查询与计算" detail="本地只读沙盒 · 指标宏" />
      <DiagramNode x={770} width={150} label="校验后回答" detail="证据校验 · 局限边界" />

      {/* 主干水平连接线 */}
      {[160, 350, 540, 730].map((x) => (
        <path key={x} d={`M ${x} 79 L ${x + 38} 79`} stroke="#176b50" strokeWidth="1.5" markerEnd="url(#runtime-arrow)" />
      ))}

      {/* 正常分支：Observation 回填环路 */}
      <path d="M 625 112 L 625 138 Q 625 144 617 144 L 503 144 Q 495 144 495 118" stroke="#176b50" strokeWidth="1.5" markerEnd="url(#runtime-arrow)" />
      <text x="560" y="135" textAnchor="middle" fill="#176b50" fontSize="11" fontWeight="750">Observation</text>

      {/* 快捷分支：无需训练数据时直接回答 */}
      <path d="M 465 46 L 465 30 Q 465 24 473 24 L 837 24 Q 845 24 845 38" stroke="#b45309" strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#runtime-arrow-warn)" />
      <text x="654" y="18" textAnchor="middle" fill="#b45309" fontSize="10">无需训练数据时直接解释</text>

      {/* 降级触发支线 1：模型调用超限 (≥6轮) */}
      <path d="M 425 112 L 425 170" stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#runtime-arrow-warn)" />
      <text x="421" y="150" textAnchor="end" fill="#b45309" fontSize="9.5" fontWeight="600">调用超限 (≥6轮)</text>

      {/* 降级触发支线 2：本地样本不足 (<3次) */}
      <path d="M 695 112 L 695 170" stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#runtime-arrow-warn)" />
      <text x="699" y="150" textAnchor="start" fill="#b45309" fontSize="9.5" fontWeight="600">样本不足 (&lt;3次)</text>

      {/* 熔断降级节点 (Circuit Breaker) */}
      <rect x="390" y="176" width="340" height="52" rx="8" fill="#fffbeb" stroke="#b45309" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 3" />
      <text x="408" y="197" fill="#92400e" fontSize="11.5" fontWeight="800">触发熔断降级</text>
      <text x="408" y="215" fill="#78350f" fontSize="10">停止下钻，主动暴露 limitations 并返回保守说明</text>

      {/* 降级汇入线：流入最终校验输出 */}
      <path d="M 730 202 L 837 202 Q 845 202 845 194 L 845 118" stroke="#b45309" strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#runtime-arrow-warn)" />
      <text x="782" y="196" textAnchor="middle" fill="#b45309" fontSize="9.5" fontWeight="750">保守兜底</text>
    </svg>
  );
}

function ContextAssemblySvg() {
  return (
    <svg className="context-assembly-svg" viewBox="0 0 460 270" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="上下文来源选择、预算装配和超限压缩闭环">
      <defs>
        <marker id="context-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#176b50" />
        </marker>
        <marker id="context-arrow-warn" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#dc2626" />
        </marker>
      </defs>

      {/* 左侧 3 个输入源 */}
      <g fill="#ffffff" stroke="#176b50" strokeOpacity="0.28">
        <rect x="12" y="28" width="120" height="38" rx="6" />
        <rect x="12" y="74" width="120" height="38" rx="6" />
        <rect x="12" y="120" width="120" height="38" rx="6" />
      </g>
      <text x="20" y="44" fill="#101211" fontSize="10.5" fontWeight="750">当前任务</text>
      <text x="20" y="57" fill="#64748b" fontSize="9">意图 · 动作 · 时间范围</text>
      <text x="20" y="90" fill="#101211" fontSize="10.5" fontWeight="750">近期会话</text>
      <text x="20" y="103" fill="#64748b" fontSize="9">最近轮次 · 历史摘要</text>
      <text x="20" y="136" fill="#101211" fontSize="10.5" fontWeight="750">训练画像</text>
      <text x="20" y="149" fill="#64748b" fontSize="9">训练水平 · 目标偏好</text>

      {/* 输入源汇聚接入中间卡片 */}
      <path d="M 132 47 L 148 47 Q 156 47 156 60 L 156 93" stroke="#176b50" strokeWidth="1.3" />
      <path d="M 132 139 L 148 139 Q 156 139 156 126 L 156 93" stroke="#176b50" strokeWidth="1.3" />
      <path d="M 132 93 L 164 93" stroke="#176b50" strokeWidth="1.4" markerEnd="url(#context-arrow)" />

      {/* 中间核心：预算内装配 */}
      <rect x="168" y="34" width="130" height="118" rx="8" fill="#f3fbf7" stroke="#176b50" strokeWidth="1.2" />
      <text x="180" y="58" fill="#101211" fontSize="12" fontWeight="800">预算内装配</text>
      <text x="180" y="78" fill="#176b50" fontSize="11" fontWeight="750">≤ 10,800 Token</text>
      <text x="180" y="97" fill="#64748b" fontSize="9.5">按任务相关性分层</text>
      <text x="180" y="114" fill="#64748b" fontSize="9.5">超限触发渐进压缩</text>
      <text x="180" y="133" fill="#2563eb" fontSize="9" fontWeight="700">+ Observation 注入</text>

      {/* 装配正常交付输出 */}
      <path d="M 298 93 L 324 93" stroke="#176b50" strokeWidth="1.4" markerEnd="url(#context-arrow)" />

      {/* 右侧：本轮 Context Envelope */}
      <rect x="328" y="44" width="120" height="98" rx="8" fill="#ffffff" stroke="#176b50" strokeOpacity="0.4" />
      <text x="340" y="70" fill="#101211" fontSize="12" fontWeight="800">本轮 Context</text>
      <text x="340" y="91" fill="#64748b" fontSize="9.5">结构化 Envelope</text>
      <text x="340" y="110" fill="#176b50" fontSize="9.5" fontWeight="750">交付 Agent 推理</text>

      {/* 异常下行线：Token 溢出 */}
      <path d="M 206 152 L 206 186" stroke="#dc2626" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#context-arrow-warn)" />
      <text x="201" y="172" textAnchor="end" fill="#dc2626" fontSize="9" fontWeight="750">溢出 (&gt;10.8k)</text>

      {/* 底部渐进压缩节点 */}
      <rect x="24" y="192" width="412" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.1" strokeOpacity="0.35" strokeDasharray="4 3" />
      <text x="38" y="213" fill="#991b1b" fontSize="11" fontWeight="800">确定性渐进压缩回路 (Compaction)</text>
      <text x="38" y="232" fill="#64748b" fontSize="9.5">早期轮次摘要  →  丢弃低权偏好  →  截断长文本明细</text>

      {/* 压缩后上行回填线：重估预算 */}
      <path d="M 262 192 L 262 158" stroke="#176b50" strokeWidth="1.3" markerEnd="url(#context-arrow)" />
      <text x="268" y="172" textAnchor="start" fill="#176b50" fontSize="9" fontWeight="750">重估预算</text>
    </svg>
  );
}

function AnalyzeToolSvg() {
  return (
    <svg className="analyze-tool-svg" viewBox="0 0 460 270" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="训练分析工具确定性执行与安全阻断流">
      <defs>
        <marker id="analyze-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#176b50" />
        </marker>
        <marker id="analyze-arrow-warn" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#b45309" />
        </marker>
      </defs>

      {/* 主干 4 个节点 */}
      <g>
        <rect x="12" y="34" width="98" height="66" rx="7" fill="#ffffff" stroke="#176b50" strokeOpacity="0.32" />
        <text x="22" y="59" fill="#101211" fontSize="11.5" fontWeight="800">解析 Query</text>
        <text x="22" y="79" fill="#64748b" fontSize="9.3">动作 · 粒度 · 周期</text>

        <rect x="122" y="34" width="98" height="66" rx="7" fill="#ffffff" stroke="#176b50" strokeOpacity="0.32" />
        <text x="132" y="59" fill="#101211" fontSize="11.5" fontWeight="800">本地检索</text>
        <text x="132" y="79" fill="#64748b" fontSize="9.3">Isar 只读沙盒</text>

        <rect x="236" y="34" width="102" height="66" rx="7" fill="#ffffff" stroke="#176b50" strokeOpacity="0.32" />
        <text x="246" y="59" fill="#101211" fontSize="11.5" fontWeight="800">确定性指标</text>
        <text x="246" y="79" fill="#64748b" fontSize="9.3">Volume · 1RM 宏</text>

        <rect x="352" y="34" width="96" height="66" rx="7" fill="#eff6ff" stroke="#2563eb" strokeOpacity="0.5" />
        <text x="362" y="59" fill="#1e40af" fontSize="11.5" fontWeight="800">Observation</text>
        <text x="362" y="79" fill="#3b82f6" fontSize="9.3">确证事实与证据</text>
      </g>

      {/* 主干水平连接线 */}
      <path d="M 110 67 L 118 67" stroke="#176b50" strokeWidth="1.3" markerEnd="url(#analyze-arrow)" />
      <path d="M 220 67 L 232 67" stroke="#176b50" strokeWidth="1.3" markerEnd="url(#analyze-arrow)" />
      <path d="M 338 67 L 348 67" stroke="#176b50" strokeWidth="1.3" markerEnd="url(#analyze-arrow)" />

      {/* 下方分支：样本不足触发线 */}
      <path d="M 171 100 L 171 146" stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#analyze-arrow-warn)" />
      <text x="166" y="126" textAnchor="end" fill="#b45309" fontSize="9" fontWeight="700">样本不足 (&lt;3次)</text>

      {/* 阻断与局限披露卡片 */}
      <rect x="122" y="150" width="216" height="52" rx="8" fill="#fffbeb" stroke="#b45309" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 2" />
      <text x="136" y="171" fill="#92400e" fontSize="11" fontWeight="800">安全阻断与局限披露</text>
      <text x="136" y="189" fill="#78350f" fontSize="9.5">拒绝派生计算，注入 limitations</text>

      {/* 局限汇流至 Observation */}
      <path d="M 338 176 L 392 176 Q 400 176 400 168 L 400 106" stroke="#b45309" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#analyze-arrow-warn)" />
      <text x="385" y="170" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="700">保守事实汇入</text>

      {/* 底部轻量契约条 */}
      <rect x="12" y="226" width="436" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="230" y="245" textAnchor="middle" fill="#64748b" fontSize="9.5">输出契约：facts · metrics · scope · limitations · pagination</text>
    </svg>
  );
}

export function App() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText("215615523@qq.com");
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = "215615523@qq.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));

    const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
    const scrollFrame = hashTarget
      ? window.requestAnimationFrame(() => hashTarget.scrollIntoView({ block: "start" }))
      : null;

    return () => {
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top">FlowStrength</a>
        <nav aria-label="页面导航">
          <a href="#overview">产品概览</a>
          <a href="#requirements">用户痛点</a>
          <a href="#competitors">竞品分析</a>
          <a href="#product-decisions">产品决策</a>
          <a href="#ai-system">AI系统</a>
          <a href="#evaluation">AI评测</a>
          <a href="#user-testing">用户测试</a>
          <a href="#operations">上线迭代</a>
          <a href="#reflection">项目复盘</a>
          <a href="#contact">联系方式</a>
        </nav>
        <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <main id="top">
        <section className="overview-section" id="overview" aria-label="产品概览与核心功能">
          <div className="hero">
            <div className="hero__inner" data-reveal>
              <h1>FlowStrength</h1>
              <p className="hero__intro">规划训练周期、记录每次训练，并基于训练数据获得个性化 AI 分析</p>
              <div className="hero__meta" aria-label="项目基本信息">
                <span className="hero__meta-item"><b>我的角色</b> 独立负责产品全流程</span>
                <span className="hero__meta-item"><b>项目周期</b> 2026.03—至今</span>
                <span className="hero__meta-item"><b>当前阶段</b> 已上线 Google Play 商店</span>
              </div>
              <a className="store-link" href={storeUrl} target="_blank" rel="noreferrer">查看 Google Play 商店页<span aria-hidden="true">↗</span></a>
              <p className="store-note">需要国际网络</p>
            </div>
          </div>

          <FeatureStripSection />
        </section>

        {/* 02 用户痛点 */}
        <section className="section-chapter requirements-chapter" id="requirements" aria-labelledby="requirements-title">
          <header className="chapter-header" data-reveal>
            <h2 id="requirements-title">用户痛点</h2>
          </header>

          <div className="chapter-body chapter-body--needs-split">
            <div className="needs-text-col" data-reveal>
              <p className="need-summary">训练数据与训练分析之间存在断层</p>

              <div className="needs-points">
                <div className="need-point">
                  <span className="need-point__tag">01 // 记录类 APP 的局限</span>
                  <h4>沉淀了海量做组数据，却缺乏分析能力</h4>
                  <p>
                    通常只能呈现历史记录和统计数据，无法结合具体表现进行灵活分析
                  </p>
                </div>

                <div className="need-point">
                  <span className="need-point__tag">02 // 通用 AI 的盲区</span>
                  <h4>具备通用分析推理，却缺失长期真实数据</h4>
                  <p>
                    通用 AI 缺少用户的长期训练上下文，手动输入或上传数据相对繁琐
                  </p>
                </div>
              </div>
            </div>

            <div className="needs-media-col" data-reveal>
              <div className="evidence-grid">
                {demandEvidence.map((item) => (
                  <article className="evidence-card" key={item.index}>
                    <div className="evidence-card__source">
                      <span>{item.index}</span>
                      <strong>{item.source}</strong>
                    </div>
                    <div className="evidence-card__media">
                      <img src={item.image} alt={item.alt} loading="lazy" />
                    </div>
                    {item.summary && (
                      <div className="evidence-card__summary">
                        <p>{item.summary}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <blockquote className="need-conclusion requirements-conclusion" data-reveal>
              FlowStrength 的差异化定位：面向进阶力量训练者的「训练记录 + AI 分析」
            </blockquote>
          </div>
        </section>

        {/* 03 竞品分析 */}
        <section className="section-chapter competitor-chapter" id="competitors" aria-labelledby="competitors-title">
          <header className="chapter-header" data-reveal>
            <h2 id="competitors-title">竞品分析</h2>
          </header>

          <div className="chapter-body competitor-body">
            <div className="competitor-canvas" data-reveal>
              <section className="competitor-panel competitor-panel--matrix" aria-labelledby="competitor-matrix-title">
                <header className="competitor-panel__header">
                  <span>01</span>
                  <h3 id="competitor-matrix-title">竞品筛选</h3>
                </header>
                <div className="competitor-quadrant-wrapper">
                  {/* 纵横轴极轴标签：纵轴置于象限框外部上下两端，横轴置于左右端点 */}
                  <span className="quadrant-axis-label quadrant-axis-label--top">个性化分析与决策</span>
                  <span className="quadrant-axis-label quadrant-axis-label--bottom">基础记录与执行</span>
                  <span className="quadrant-axis-label quadrant-axis-label--left">大众健身</span>
                  <span className="quadrant-axis-label quadrant-axis-label--right">进阶力量</span>

                  <div className="competitor-quadrant">
                    {/* 象限 1: 左上 */}
                    <div className="quadrant-zone quadrant-zone--tl">
                      <div className="quadrant-zone__header">
                        <strong>{competitorQuadrants.algDriven.title}</strong>
                        <p>{competitorQuadrants.algDriven.desc}</p>
                      </div>
                      <div className="quadrant-zone__apps">
                        {competitorQuadrants.algDriven.apps.map((app) => (
                          <div
                            key={app.name}
                            className={`comp-chip ${app.highlight ? "comp-chip--highlight" : ""}`}
                          >
                            <span className="comp-chip__dot" />
                            <span className="comp-chip__name">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 象限 2: 右上 */}
                    <div className="quadrant-zone quadrant-zone--tr quadrant-zone--target">
                      <div className="quadrant-zone__header">
                        <strong>{competitorQuadrants.aiDecision.title}</strong>
                        <p>{competitorQuadrants.aiDecision.desc}</p>
                      </div>
                      <div className="quadrant-fs-center">
                        <div className="quadrant-fs-pin">
                          <span className="fs-pin-dot" />
                          <span className="fs-pin-name">FlowStrength</span>
                        </div>
                      </div>
                      <div className="quadrant-zone__apps">
                        {competitorQuadrants.aiDecision.apps.map((app) => (
                          <div
                            key={app.name}
                            className={`comp-chip ${app.highlight ? "comp-chip--highlight" : ""}`}
                          >
                            <span className="comp-chip__dot" />
                            <span className="comp-chip__name">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 象限 3: 左下 */}
                    <div className="quadrant-zone quadrant-zone--bl">
                      <div className="quadrant-zone__header">
                        <strong>{competitorQuadrants.generalFitness.title}</strong>
                        <p>{competitorQuadrants.generalFitness.desc}</p>
                      </div>
                      <div className="quadrant-zone__apps">
                        {competitorQuadrants.generalFitness.apps.map((app) => (
                          <div
                            key={app.name}
                            className={`comp-chip ${app.highlight ? "comp-chip--highlight" : ""}`}
                          >
                            <span className="comp-chip__dot" />
                            <span className="comp-chip__name">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 象限 4: 右下 */}
                    <div className="quadrant-zone quadrant-zone--br">
                      <div className="quadrant-zone__header">
                        <strong>{competitorQuadrants.pureLogger.title}</strong>
                        <p>{competitorQuadrants.pureLogger.desc}</p>
                      </div>
                      <div className="quadrant-zone__apps">
                        {competitorQuadrants.pureLogger.apps.map((app) => (
                          <div
                            key={app.name}
                            className={`comp-chip ${app.highlight ? "comp-chip--highlight" : ""}`}
                          >
                            <span className="comp-chip__dot" />
                            <span className="comp-chip__name">{app.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="competitor-panel competitor-panel--flow" aria-labelledby="competitor-flow-title">
                <header className="competitor-panel__header">
                  <span>02</span>
                  <h3 id="competitor-flow-title">同任务流程拆解</h3>
                </header>
                <div className="competitor-flowchart__scroll">
                  <CompetitorFlowChart />
                </div>
              </section>

              <blockquote className="need-conclusion competitor-conclusion">
                三类产品分别强化了记录、推荐与动态指导；FlowStrength 的切入点，是降低训练干扰，将 AI 聚焦于跨周期的深度分析和可控写入
              </blockquote>
            </div>
          </div>
        </section>

        {/* 04 产品决策 */}
        <section className="section-chapter product-decisions" id="product-decisions" aria-labelledby="product-decisions-title">
          <header className="chapter-header" data-reveal>
            <h2 id="product-decisions-title">产品决策</h2>
          </header>
          <div className="chapter-body product-decisions__body" data-reveal>
            {/* 轻量细线分栏 */}
            <div className="decision-columns-grid">
              {productDecisions.map((decision) => (
                <article key={decision.index} className="decision-column">
                  <header className="decision-column__header">
                    <span className="decision-column__index">{decision.index}</span>
                    <h3 className="decision-column__title">{decision.title}</h3>
                  </header>
                  <p className="decision-column__thesis">{decision.thesis}</p>

                  <div className="decision-stems">
                    {decision.stages.map((stage, idx) => (
                      <div key={idx} className={`decision-stem decision-stem--${stage.status}`}>
                        <span className="decision-stem__indicator" aria-hidden="true">
                          {stage.status === "discard" && "×"}
                          {stage.status === "adopt" && "●"}
                          {stage.status === "guard" && "!"}
                          {stage.status === "neutral" && "○"}
                        </span>
                        <div className="decision-stem__text">
                          <strong className="decision-stem__label">{stage.tag}</strong>
                          <p className="decision-stem__desc">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 06 AI 系统设计 */}
        <section className="section-chapter ai-system" id="ai-system" aria-labelledby="ai-system-title">
          <header className="chapter-header" data-reveal>
            <h2 id="ai-system-title">AI 系统设计</h2>
          </header>

          <div className="chapter-body ai-system__body" data-reveal>
            {/* 01 受控运行时状态机与分支回路 */}
            <article className="ai-system-panel">
              <header className="ai-system-panel__header">
                <span>01</span>
                <h3>Agent Runtime</h3>
              </header>
              <div className="ai-architecture__scroll">
                <AiRuntimeFlowSvg />
              </div>
            </article>

            {/* 02 & 03 两个深下钻矢量图解 */}
            <div className="ai-system-zooms">
              <article className="ai-system-panel ai-zoom">
                <header className="ai-system-panel__header">
                  <span>02</span>
                  <h3>Context 动态组装</h3>
                </header>
                <div className="ai-zoom__scroll">
                  <ContextAssemblySvg />
                </div>
              </article>

              <article className="ai-system-panel ai-zoom">
                <header className="ai-system-panel__header">
                  <span>03</span>
                  <h3>查询与运算工具</h3>
                </header>
                <div className="ai-zoom__scroll">
                  <AnalyzeToolSvg />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 08 AI 评测 */}
        <section className="section-chapter ai-evaluation" id="evaluation" aria-labelledby="evaluation-title">
          <header className="chapter-header" data-reveal>
            <h2 id="evaluation-title">AI 评测</h2>
          </header>

          <div className="chapter-body ai-evaluation__body">
            <div className="evaluation-top-grid">
              {/* 01 评价体系 */}
              <article className="evaluation-panel" data-reveal>
                <header className="evaluation-panel__header">
                  <span>01</span>
                  <div><h3>评价体系</h3></div>
                </header>
                <div className="eval-system-stack">
                  {/* 1. 评分维度 */}
                  <div className="eval-system-block">
                    <div className="eval-system-block__label">
                      <span className="eval-subtag">01</span>
                      <h4>评分维度</h4>
                    </div>
                    <div className="eval-dimensions">
                      <div className="evaluation-hard-gate">
                        <div className="eval-rule-head">
                          <span className="hard-gate-label">P0 硬门槛</span>
                        </div>
                        <div className="eval-rule-grid">
                          <div className="eval-rule-item">
                            <b>事实与证据</b>
                          </div>
                          <div className="eval-rule-item">
                            <b>权限与控制</b>
                          </div>
                          <div className="eval-rule-item">
                            <b>安全边界</b>
                          </div>
                        </div>
                      </div>
                      <div className="eval-quality-dimensions">
                        <div className="eval-rule-head">
                          <span className="quality-dim-label">质量评分</span>
                        </div>
                        <div className="eval-rule-grid">
                          <div className="eval-rule-item">
                            <b>准确性</b>
                          </div>
                          <div className="eval-rule-item">
                            <b>可信度</b>
                          </div>
                          <div className="eval-rule-item">
                            <b>有用性</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. 期望行为 */}
                  <div className="eval-system-block">
                    <div className="eval-system-block__label">
                      <span className="eval-subtag">02</span>
                      <h4>期望行为</h4>
                    </div>
                    <div className="eval-behavior-flow">
                      <div className="eval-case-prompt">
                        <span className="case-prompt-tag">输入用例</span>
                        <b>“分析我今天的训练”</b>
                      </div>
                      <div className="behavior-step-chain">
                        <span className="behavior-step">提取今日有效负荷</span>
                        <i className="behavior-step-arrow">→</i>
                        <span className="behavior-step">对比近期历史趋势</span>
                        <i className="behavior-step-arrow">→</i>
                        <span className="behavior-step">给出下次动作建议</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. 评测指标 */}
                  <div className="eval-system-block">
                    <div className="eval-system-block__label">
                      <span className="eval-subtag">03</span>
                      <h4>评测指标</h4>
                    </div>
                    <div className="eval-metrics-grid">
                      <div className="metric-chip">
                        <b>回答质量</b>
                      </div>
                      <div className="metric-chip">
                        <b>稳定性</b>
                      </div>
                      <div className="metric-chip">
                        <b>效率成本</b>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 02 测评集设计 */}
              <article className="evaluation-panel" data-reveal>
                <header className="evaluation-panel__header">
                  <span>02</span>
                  <div><h3>测评集设计</h3></div>
                </header>
                <div className="case-contracts-wrapper">
                  {/* 1. 契约模型解构 */}
                  <div className="contract-schema-block">
                    <div className="contract-schema-label">
                      <span className="eval-subtag">01</span>
                      <h4>用例契约模型</h4>
                    </div>
                    <div className="contract-schema-slots">
                      <div className="schema-slot">
                        <span className="slot-tag">输入</span>
                        <b>任务与会话状态</b>
                        <small>用户意图与上下文</small>
                      </div>
                      <div className="schema-slot">
                        <span className="slot-tag">环境</span>
                        <b>固定数据快照</b>
                        <small>基准隔离训练世界</small>
                      </div>
                      <div className="schema-slot">
                        <span className="slot-tag">边界</span>
                        <b>工具白名单</b>
                        <small>只读权限与调用预算</small>
                      </div>
                      <div className="schema-slot">
                        <span className="slot-tag">真值</span>
                        <b>业务 Oracle</b>
                        <small>推论许可与禁止断言</small>
                      </div>
                    </div>
                  </div>

                  {/* 2. 评测集构成 */}
                  <div className="case-distribution-block">
                    <div className="contract-schema-label">
                      <span className="eval-subtag">02</span>
                      <h4>评测集构成（128 条契约用例）</h4>
                    </div>
                    <div className="case-contracts">
                      <div className="case-family case-family--live">
                        <header>
                          <b>全面训练分析集</b>
                          <span>64 条用例</span>
                        </header>
                        <div className="case-family__groups">
                          <span>单次训练复盘</span>
                          <span>动作趋势分析</span>
                          <span>平台期诊断</span>
                          <span>训练频率评估</span>
                          <span>计划执行评估</span>
                          <span>训练结构平衡</span>
                        </div>
                      </div>
                      <div className="case-family">
                        <header>
                          <b>安全边界集</b>
                          <span>64 条用例</span>
                        </header>
                        <div className="case-family__groups">
                          <span>数据不足降级</span>
                          <span>证据范围约束</span>
                          <span>医疗安全边界</span>
                          <span>写入权限边界</span>
                          <span>对抗注入防御</span>
                          <span>任务范围边界</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* 03 优化效果 */}
            <article className="evaluation-panel evaluation-panel--full" data-reveal>
              <header className="evaluation-panel__header">
                <span>03</span>
                <div><h3>评测驱动优化</h3></div>
              </header>
              <div className="eval-results-wrapper">
                <div className="eval-hierarchy-bar">
                  <span className="hierarchy-step">失败用例</span>
                  <i>→</i>
                  <span className="hierarchy-step">定位根因</span>
                  <i>→</i>
                  <span className="hierarchy-step">工程改动</span>
                  <i>→</i>
                  <span className="hierarchy-step">同口径复测</span>
                </div>

                <div className="eval-diff-grid">
                  {/* 案例 01 */}
                  <div className="eval-diff-card eval-diff-card--expanded">
                    <div className="diff-card-head">
                      <strong>案例 01 · 数据范围越界</strong>
                    </div>
                    <div className="diff-card-input">
                      <b>“我最近深蹲练得怎么样？”</b>
                    </div>
                    <div className="diff-card-body">
                      <div className="diff-section diff-section--del">
                        <h4>失败</h4>
                        <p>仅读取近 2 次记录，却断言用户“总共进行了2次训练”。</p>
                      </div>

                      <div className="diff-section diff-section--root">
                        <h4>根因</h4>
                        <p>Tool 没有返回覆盖时间窗和样本容量，模型把可见记录误认为全部历史。</p>
                      </div>

                      <div className="diff-section diff-section--fix">
                        <h4>工程改动</h4>
                        <p>Tool 透出 coverage_window 与 sample_count → Context 强注入范围约束 → 断言拦截越界定性词。</p>
                      </div>

                      <div className="diff-section diff-section--add">
                        <h4>目标行为</h4>
                        <p>声明查询覆盖窗口与样本容量，避免模型把可见记录误认为全部历史。</p>
                      </div>
                    </div>
                  </div>

                  {/* 案例 02 */}
                  <div className="eval-diff-card eval-diff-card--expanded">
                    <div className="diff-card-head">
                      <strong>案例 02 · 有记录，没洞察</strong>
                    </div>
                    <div className="diff-card-input">
                      <b>“分析我今天的训练”</b>
                    </div>
                    <div className="diff-card-body">
                      <div className="diff-section diff-section--del">
                        <h4>失败</h4>
                        <p>复述动作、重量与总容量，却没有识别趋势、瓶颈或下一步动作。</p>
                      </div>

                      <div className="diff-section diff-section--root">
                        <h4>根因</h4>
                        <p>Observation 只提供原始记录，高阶指标依赖模型临时计算，结果不稳定且难以复现。</p>
                      </div>

                      <div className="diff-section diff-section--fix">
                        <h4>工程改动</h4>
                        <p>Tool 确定性计算 e1RM 趋势、周环比与 plateau_weeks，再以结构化字段注入 Observation。</p>
                      </div>

                      <div className="diff-section diff-section--add">
                        <h4>目标行为</h4>
                        <p>结合同计划/同动作的训练历史数据进行结合分析，并给出可执行且不过度确定的调整建议。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 09 用户测试 */}
        <section className="section-chapter user-testing-chapter" id="user-testing" aria-labelledby="user-testing-title">
          <header className="chapter-header" data-reveal>
            <h2 id="user-testing-title">用户测试</h2>
          </header>

          <div className="chapter-body chapter-body--needs-split">
            <div className="needs-text-col" data-reveal>
              <div className="testing-metric-badges" aria-label="用户测试关键指标">
                {userTestingMetrics.map((m) => (
                  <span className="testing-metric-badge" key={m.label}>
                    <b>{m.val}</b> {m.label}
                  </span>
                ))}
              </div>

              <div className="needs-points">
                {userTestDimensions.map((item, idx) => (
                  <div className="need-point" key={item.tag}>
                    <span className="need-point__tag">{`0${idx + 1} // ${item.tag}`}</span>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="needs-media-col" data-reveal>
              <div className="evidence-col-header">
                <span className="evidence-col-tag">部分用户反馈</span>
              </div>
              <div className="evidence-grid evidence-grid--closed-test">
                {closedTestFeedback.map((item, idx) => (
                  <article className="evidence-card evidence-card--closed-test" key={item.tag}>
                    <div className="evidence-card__source">
                      <span>0{idx + 1}</span>
                      <strong>{item.tag}</strong>
                    </div>
                    <div className="evidence-card__media evidence-card__media--closed-test">
                      <img src={item.image} alt={item.alt} loading="lazy" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10 上线迭代 */}
        <section className="section-chapter launch-operations" id="operations" aria-labelledby="operations-title">
          <header className="chapter-header" data-reveal>
            <h2 id="operations-title">上线迭代</h2>
          </header>
          <div className="chapter-body launch-operations__body">
            <div className="operations-cards-grid" data-reveal>
              {/* 卡片 1：商店数据 */}
              <article className="ops-card">
                <header className="ops-card__header">
                  <h3 className="ops-card__title">
                    <span className="ops-card__index">01 //</span> KPI数据
                  </h3>
                </header>
                <div className="ops-card__metrics">
                  <div className="ops-metric-stat">
                    <strong>100+</strong>
                    <span>下载量</span>
                  </div>
                  <div className="ops-metric-divider" />
                  <div className="ops-metric-stat">
                    <strong>50+</strong>
                    <span>活跃设备量</span>
                  </div>
                  <div className="ops-metric-divider" />
                  <div className="ops-metric-stat">
                    <strong>10+</strong>
                    <span>版本迭代</span>
                  </div>
                </div>
                <div className="ops-card__media ops-card__media--pair" aria-label="Google Play 商店安装与活跃设备数据截图">
                  <img src={storeInstallsImage} alt="Google Play 商店数据：安装总次数 135" loading="lazy" />
                  <img src={storeActiveDevicesImage} alt="Google Play 商店数据：活跃设备数量平均值 50.3" loading="lazy" />
                </div>
              </article>

              {/* 卡片 2：用户评价 */}
              <article className="ops-card">
                <header className="ops-card__header">
                  <h3 className="ops-card__title">
                    <span className="ops-card__index">02 //</span> 用户评价
                  </h3>
                </header>
                <div className="ops-card__media ops-card__media--reviews-stack" aria-label="Google Play 海外用户真实五星评价截图">
                  <img src={storeReviewEnglishImage} alt="Google Play 英语用户五星评价" loading="lazy" />
                  <img src={storeReviewGreekImage} alt="Google Play 希腊语用户五星评价" loading="lazy" />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 10 项目复盘 */}
        <section className="section-chapter project-reflection" id="reflection" aria-labelledby="reflection-title">
          <header className="chapter-header" data-reveal>
            <h2 id="reflection-title">项目复盘</h2>
          </header>
          <div className="chapter-body project-reflection__body">
            <div className="reflection-ledger" data-reveal>
              {/* 条目 01: 主动数据监测 */}
              <article className="reflection-entry">
                <div className="reflection-entry__topic">
                  <h3 className="reflection-entry__title">
                    <span className="reflection-entry__index">01 //</span> 主动数据监测
                  </h3>
                </div>
                <div className="reflection-entry__bullets">
                  <div className="reflection-bullet">
                    <span className="reflection-bullet__label reflection-bullet__label--issue">现有问题</span>
                    <p className="reflection-bullet__text">
                      缺乏关键路径埋点，多数用户在体验不佳后会<strong>默默卸载</strong>应用，不会留下真实反馈，导致<strong>问题定位困难、迭代周期长</strong>。
                    </p>
                  </div>
                  <div className="reflection-bullet">
                    <span className="reflection-bullet__label reflection-bullet__label--next">改进方向</span>
                    <p className="reflection-bullet__text">
                      在关键用户路径上进行数据分析埋点，以<strong>主动发现和解决</strong>用户问题，<strong>提高用户留存率</strong>。
                    </p>
                  </div>
                </div>
              </article>

              {/* 条目 02: 全局情境化 AI 助手 */}
              <article className="reflection-entry">
                <div className="reflection-entry__topic">
                  <h3 className="reflection-entry__title">
                    <span className="reflection-entry__index">02 //</span> 全局情境化 AI 助手
                  </h3>
                </div>
                <div className="reflection-entry__bullets">
                  <div className="reflection-bullet">
                    <span className="reflection-bullet__label reflection-bullet__label--issue">现有问题</span>
                    <p className="reflection-bullet__text">
                      AI 分析目前局限于练后独立页面，<strong>无法感知</strong>计划编排、实时做组等具体场景的<strong>实时上下文</strong>。
                    </p>
                  </div>
                  <div className="reflection-bullet">
                    <span className="reflection-bullet__label reflection-bullet__label--next">改进方向</span>
                    <p className="reflection-bullet__text">
                      将 AI 分析能力扩展到全局：在不同场景<strong>动态加载不同 Context</strong>，提供针对性的<strong>深度分析与即时建议</strong>。
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚收尾 */}
      <footer className="site-footer" id="contact">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-footer__logo">FlowStrength</span>
            <p className="site-footer__meta">独立负责产品全流程 · 2026.03—至今 · 已上线 Google Play 商店</p>
          </div>

          <div className="site-footer__contact">
            <span className="site-footer__contact-label">联系与交流</span>
            <div className="site-footer__email-wrap">
              <a href="mailto:215615523@qq.com" className="site-footer__email-link">
                215615523@qq.com
              </a>
              <button
                type="button"
                className="site-footer__copy-btn"
                onClick={handleCopyEmail}
                aria-label="复制邮箱地址"
              >
                {copied ? "已复制 ✓" : "复制"}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="site-footer__back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="回到顶部"
          >
            回到顶部 ↑
          </button>
        </div>
      </footer>
    </>
  );
}
