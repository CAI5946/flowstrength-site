import { useEffect, useState, useRef, useCallback } from "react";
import redditDemandImage from "../assets/屏幕截图 2026-09-03 134116.png";
import feedbackLoadingImage from "../assets/comments/微信图片_20260901174926_44_102.jpg";
import feedbackLocaleImage from "../assets/comments/微信图片_20260901174944_45_102.jpg";
import feedbackOnboardingImage from "../assets/comments/微信图片_20260901175056_46_102.jpg";
import feedbackLagImage from "../assets/comments/微信图片_20260901175056_47_102.jpg";
import storeReviewEnglishImage from "../assets/store/focus_review_en.png";
import storeReviewGreekImage from "../assets/store/focus_review_gk.png";
import storeInstallsImage from "../assets/store/focus_installs.png";
import storeActiveDevicesImage from "../assets/store/focus_active.png";

const storeUrl = "https://play.google.com/store/apps/details?id=com.flowstrength.myapp";

const featureStrip = [
  { label: "AI 分析", image: `${import.meta.env.BASE_URL}assets/AI.png` },
  { label: "训练规划", image: `${import.meta.env.BASE_URL}assets/Home.png` },
  { label: "训练执行", image: `${import.meta.env.BASE_URL}assets/Train.png` },
  { label: "训练历史", image: `${import.meta.env.BASE_URL}assets/Record.png` },
  { label: "训练补录", image: `${import.meta.env.BASE_URL}assets/Log.png` },
  { label: "进度趋势", image: `${import.meta.env.BASE_URL}assets/Tracker.png` },
  { label: "训练工具", image: `${import.meta.env.BASE_URL}assets/Tools.png` },
];

const userTestingMetrics = [
  { val: "14 天", label: "测试周期" },
  { val: "16 名", label: "真实用户" },
  { val: "数十条", label: "真实反馈" },
];

const userTestDimensions = [
  {
    tag: "新手起步门槛",
    title: "降低首期计划创建认知成本",
    desc: "内置推荐周期与渐进配置模板，消除起步配置障碍",
  },
  {
    tag: "冷启动响应速度",
    title: "缩短启动等待，提升秒开体验",
    desc: "数据异步预加载与查询精简，冷启动耗时收敛至 < 300ms",
  },
  {
    tag: "训练执行心流",
    title: "保障做组打勾与滑动零掉帧",
    desc: "局部事务写入与非必要特效裁剪，核心操作稳定 60fps",
  },
  {
    tag: "全球化与设备一致性",
    title: "全域动态本地化与布局容错",
    desc: "l10n 动态切换全量校验，杜绝漏译并适配系统字体缩放",
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

function CompetitorFlowSvg() {
  const lanes = [
    {
      x: 12,
      cx: 124,
      mode: "纯记录",
      name: "Hevy",
      step1: "手动录入组次",
      step2: "静态历史图表",
      bottleneck: "无归因，停滞全靠人脑猜",
      step3: "人工重排课表",
      outcome: "保留控制权，但分析成本极高",
    },
    {
      x: 252,
      cx: 360,
      mode: "算法推荐",
      name: "Fitbod",
      step1: "记录单次表现",
      step2: "算法黑盒计算",
      bottleneck: "不给依据，强行覆盖课表",
      step3: "推送今日计划",
      outcome: "省心，但打乱进阶周期",
    },
    {
      x: 492,
      cx: 596,
      mode: "对话式 AI",
      name: "Arvo",
      step1: "读取历史对话",
      step2: "模型自由推演",
      bottleneck: "无本地约束，无法受控落盘",
      step3: "聊天窗口给建议",
      outcome: "对话灵活，但无法落库执行",
    },
  ];

  return (
    <svg
      className="competitor-flow-svg"
      viewBox="0 0 720 376"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="同一训练任务下三种产品机制的专业流程图"
    >
      <defs>
        <marker
          id="flow-arrow-head"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 7 4 L 1 7 z" fill="rgba(23, 107, 80, 0.45)" />
        </marker>
      </defs>

      {/* 任务起点：极简无废话单行 */}
      <text
        x="360"
        y="18"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#176b50"
        fontSize="11"
        fontWeight="800"
        letterSpacing="0.04em"
      >
        基准任务：连续 8 周做组复盘与计划调整
      </text>

      {/* 树状分叉连线 */}
      <path
        d="M 360 28 L 360 40 M 124 40 L 596 40 M 124 40 L 124 52 M 360 40 L 360 52 M 596 40 L 596 52"
        stroke="rgba(23, 107, 80, 0.3)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="124" cy="52" r="2.5" fill="rgba(23, 107, 80, 0.5)" />
      <circle cx="360" cy="52" r="2.5" fill="rgba(23, 107, 80, 0.5)" />
      <circle cx="596" cy="52" r="2.5" fill="rgba(23, 107, 80, 0.5)" />

      {/* 泳道垂直发丝分割线 */}
      <line x1="240" y1="56" x2="240" y2="370" stroke="rgba(23, 107, 80, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="480" y1="56" x2="480" y2="370" stroke="rgba(23, 107, 80, 0.12)" strokeWidth="1" strokeDasharray="3 3" />

      {/* 三条泳道 */}
      {lanes.map((lane) => (
        <g key={lane.name}>
          {/* 泳道表头 */}
          <text
            x={lane.x + 8}
            y="68"
            fill="#176b50"
            fontSize="10"
            fontWeight="750"
            letterSpacing="0.04em"
          >
            {lane.mode}
          </text>
          <text
            x={lane.x + 8}
            y="88"
            fill="#101211"
            fontSize="17"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            {lane.name}
          </text>

          {/* 箭头 1 */}
          <path
            d={`M ${lane.cx} 98 L ${lane.cx} 108`}
            stroke="rgba(23, 107, 80, 0.35)"
            strokeWidth="1.2"
            markerEnd="url(#flow-arrow-head)"
          />

          {/* 阶段 01: 采集 */}
          <text
            x={lane.x + 8}
            y="120"
            fill="#176b50"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.05em"
          >
            01 采集
          </text>
          <text
            x={lane.x + 8}
            y="136"
            fill="#101211"
            fontSize="12"
            fontWeight="600"
          >
            {lane.step1}
          </text>

          {/* 箭头 2 */}
          <path
            d={`M ${lane.cx} 146 L ${lane.cx} 156`}
            stroke="rgba(23, 107, 80, 0.35)"
            strokeWidth="1.2"
            markerEnd="url(#flow-arrow-head)"
          />

          {/* 阶段 02: 分析 */}
          <text
            x={lane.x + 8}
            y="168"
            fill="#176b50"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.05em"
          >
            02 分析
          </text>
          <text
            x={lane.x + 8}
            y="184"
            fill="#101211"
            fontSize="12"
            fontWeight="600"
          >
            {lane.step2}
          </text>

          {/* 关键断层（红色发丝重音线，无卡片框） */}
          <line
            x1={lane.x + 8}
            y1="196"
            x2={lane.x + 8}
            y2="230"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text
            x={lane.x + 18}
            y="207"
            fill="#dc2626"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            断层 ➔
          </text>
          <text
            x={lane.x + 18}
            y="225"
            fill="#991b1b"
            fontSize="11.5"
            fontWeight="600"
          >
            {lane.bottleneck}
          </text>

          {/* 箭头 3 */}
          <path
            d={`M ${lane.cx} 240 L ${lane.cx} 250`}
            stroke="rgba(23, 107, 80, 0.35)"
            strokeWidth="1.2"
            markerEnd="url(#flow-arrow-head)"
          />

          {/* 阶段 03: 调整 */}
          <text
            x={lane.x + 8}
            y="262"
            fill="#176b50"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.05em"
          >
            03 调整
          </text>
          <text
            x={lane.x + 8}
            y="278"
            fill="#101211"
            fontSize="12"
            fontWeight="600"
          >
            {lane.step3}
          </text>

          {/* 箭头 4 */}
          <path
            d={`M ${lane.cx} 288 L ${lane.cx} 298`}
            stroke="rgba(23, 107, 80, 0.35)"
            strokeWidth="1.2"
            markerEnd="url(#flow-arrow-head)"
          />

          {/* 终态 */}
          <line
            x1={lane.x + 8}
            y1="310"
            x2={lane.x + 8}
            y2="344"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x={lane.x + 18}
            y="321"
            fill="#64748b"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            终态
          </text>
          <text
            x={lane.x + 18}
            y="339"
            fill="#1e293b"
            fontSize="11.5"
            fontWeight="600"
          >
            {lane.outcome}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AppSystemArchitectureSvg() {
  return (
    <svg
      className="app-architecture-svg"
      viewBox="0 0 940 570"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="FlowStrength 全局客户端分层系统工程架构与核心权衡图"
    >
      <defs>
        <marker
          id="app-arch-flow"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 7 4 L 1 7 z" fill="rgba(23, 107, 80, 0.6)" />
        </marker>
        <marker
          id="app-arch-flow-amber"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 7 4 L 1 7 z" fill="rgba(180, 83, 9, 0.6)" />
        </marker>
      </defs>

      {/* ===== 左侧全局客户端分层架构 (LAYER 1 - 5) ===== */}

      {/* LAYER 1 */}
      <rect x="16" y="14" width="680" height="84" rx="10" fill="rgba(243, 251, 247, 0.65)" stroke="rgba(23, 107, 80, 0.22)" />
      <text x="30" y="31" fill="#176b50" fontSize="10.5" fontWeight="800" letterSpacing="0.04em">LAYER 1 · 呈现与交互容器层 (Presentation &amp; Shell)</text>

      <rect x="30" y="42" width="206" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="42" y="58" fill="#101211" fontSize="11" fontWeight="750">TrainingShellScreen</text>
      <text x="42" y="74" fill="#64748b" fontSize="9.5">全局常驻悬浮训练条 · 跨Tab秒切</text>

      <rect x="248" y="42" width="208" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="260" y="58" fill="#101211" fontSize="11" fontWeight="750">ActiveWorkoutView</text>
      <text x="260" y="74" fill="#64748b" fontSize="9.5">做组打勾交互流 · 毫秒级即时响应</text>

      <rect x="468" y="42" width="216" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="480" y="58" fill="#101211" fontSize="11" fontWeight="750">AnalyticsDashboard</text>
      <text x="480" y="74" fill="#64748b" fontSize="9.5">训练复盘图表 · 历史表现模式分析</text>

      {/* L1 -> L2 引线 */}
      <path d="M 356 98 L 356 116" stroke="rgba(23, 107, 80, 0.45)" strokeWidth="1.2" markerEnd="url(#app-arch-flow)" />
      <text x="364" y="110" fill="#176b50" fontSize="8.5" fontWeight="700">用户 Intent 操作 / AppState 响应式流转</text>

      {/* LAYER 2 */}
      <rect x="16" y="118" width="680" height="84" rx="10" fill="rgba(23, 107, 80, 0.04)" stroke="rgba(23, 107, 80, 0.22)" />
      <text x="30" y="135" fill="#176b50" fontSize="10.5" fontWeight="800" letterSpacing="0.04em">LAYER 2 · 核心业务与全局状态层 (Core Services &amp; AppState)</text>

      <rect x="30" y="146" width="156" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="40" y="162" fill="#101211" fontSize="10.5" fontWeight="750">AppState</text>
      <text x="40" y="178" fill="#64748b" fontSize="9">ChangeNotifier · 响应式中枢</text>

      <rect x="198" y="146" width="170" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="208" y="162" fill="#101211" fontSize="10.5" fontWeight="750">ActiveTrainingService</text>
      <text x="208" y="178" fill="#64748b" fontSize="9">执行生命周期 · 高精度计时</text>

      <rect x="380" y="146" width="160" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="390" y="162" fill="#101211" fontSize="10.5" fontWeight="750">CycleProgramService</text>
      <text x="390" y="178" fill="#64748b" fontSize="9">微周期滚动 · 渐进负荷推算</text>

      <rect x="552" y="146" width="132" height="46" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="562" y="162" fill="#101211" fontSize="10.5" fontWeight="750">SubscriptionService</text>
      <text x="562" y="178" fill="#64748b" fontSize="9">Play 订阅 · 原子额度预占</text>

      {/* L2 -> L3 引线 */}
      <path d="M 356 202 L 356 222" stroke="rgba(23, 107, 80, 0.45)" strokeWidth="1.2" markerEnd="url(#app-arch-flow)" />
      <text x="364" y="215" fill="#176b50" fontSize="8.5" fontWeight="700">沙箱隔离调用：受控意图派发与会话生命周期</text>

      {/* LAYER 3: 受控 AI 引擎层 (重点高亮) */}
      <rect x="16" y="224" width="680" height="92" rx="10" fill="rgba(243, 251, 247, 0.9)" stroke="rgba(23, 107, 80, 0.35)" strokeWidth="1.5" />
      <text x="30" y="241" fill="#176b50" fontSize="10.5" fontWeight="800" letterSpacing="0.04em">LAYER 3 · 受控 AI 引擎层 (Grounded AI Engine &amp; Sandbox)</text>
      
      {/* 章节互通导流高亮胶囊 */}
      <rect x="424" y="226" width="260" height="20" rx="10" fill="#176b50" />
      <text x="434" y="240" fill="#ffffff" fontSize="9" fontWeight="800">★ 核心解构对象 · 下一章深入剖析 ➔</text>

      <rect x="30" y="252" width="206" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.2)" />
      <text x="42" y="268" fill="#101211" fontSize="11" fontWeight="750">AgentRuntime Sandbox</text>
      <text x="42" y="284" fill="#64748b" fontSize="9.5">单会话 ReAct 状态机 · 权限隔离</text>
      <text x="42" y="296" fill="#176b50" fontSize="8" fontWeight="700">maxTurns 限制 · 超时安全熔断</text>

      <rect x="248" y="252" width="224" height="52" rx="7" fill="#effaf5" stroke="rgba(23, 107, 80, 0.35)" />
      <text x="260" y="268" fill="#176b50" fontSize="11" fontWeight="800">Deterministic 9-Tools</text>
      <text x="260" y="284" fill="#64748b" fontSize="9.5">本地专用纯函数工具注册表</text>
      <text x="260" y="296" fill="#176b50" fontSize="8" fontWeight="700">毫秒级计算 · 严禁模型自由脑补</text>

      <rect x="484" y="252" width="200" height="52" rx="7" fill="#fffbeb" stroke="rgba(180, 83, 9, 0.35)" />
      <text x="496" y="268" fill="#b45309" fontSize="11" fontWeight="800">ControlledWrite</text>
      <text x="496" y="284" fill="#b45309" fontSize="9.5">零直接写权限 · 仅生成 Diff 草案</text>
      <text x="496" y="296" fill="#b45309" fontSize="8" fontWeight="700">必须经由用户物理审查确认</text>

      {/* L3 <-> L4 双向交互引线 */}
      <path d="M 320 336 L 320 316" stroke="rgba(23, 107, 80, 0.5)" strokeWidth="1.2" markerEnd="url(#app-arch-flow)" />
      <path d="M 390 316 L 390 336" stroke="rgba(180, 83, 9, 0.5)" strokeWidth="1.2" markerEnd="url(#app-arch-flow-amber)" />
      <text x="180" y="329" fill="#176b50" fontSize="8.5" fontWeight="700">Tool 只读查询本地训练事实 (P99 &lt; 5ms)</text>
      <text x="402" y="329" fill="#b45309" fontSize="8.5" fontWeight="700">受控 Diff 草案（用户确认后落盘）</text>

      {/* LAYER 4 */}
      <rect x="16" y="338" width="680" height="92" rx="10" fill="rgba(23, 107, 80, 0.04)" stroke="rgba(23, 107, 80, 0.22)" />
      <text x="30" y="355" fill="#176b50" fontSize="10.5" fontWeight="800" letterSpacing="0.04em">LAYER 4 · 本地优先持久化层 (Local-First Persistence &amp; Storage)</text>

      <rect x="30" y="366" width="216" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="42" y="382" fill="#101211" fontSize="11" fontWeight="750">Isar Database (NoSQL)</text>
      <text x="42" y="398" fill="#64748b" fontSize="9.5">高性能嵌入式存储 · 100% 离线可用</text>
      <text x="42" y="410" fill="#176b50" fontSize="8" fontWeight="700">数据 100% 私有，完全不出设备本地</text>

      <rect x="256" y="366" width="216" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="268" y="382" fill="#101211" fontSize="11" fontWeight="750">Atomic Transaction Manager</text>
      <text x="268" y="398" fill="#64748b" fontSize="9.5">单组打勾即时事务落盘 · 零丢数据</text>
      <text x="268" y="410" fill="#176b50" fontSize="8" fontWeight="700">异常闪退/强杀冷启动单向自愈推演</text>

      <rect x="482" y="366" width="202" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="494" y="382" fill="#101211" fontSize="11" fontWeight="750">Data Portability (JSON)</text>
      <text x="494" y="398" fill="#64748b" fontSize="9.5">用户数据主权 · 标准 JSON 导入导出</text>
      <text x="494" y="410" fill="#64748b" fontSize="8">全量离线冷备份与原子性恢复验证</text>

      {/* L4 -> L5 引线 */}
      <path d="M 356 430 L 356 448" stroke="rgba(23, 107, 80, 0.45)" strokeWidth="1.2" markerEnd="url(#app-arch-flow)" />
      <text x="364" y="442" fill="#176b50" fontSize="8.5" fontWeight="700">安全通信：TLS 1.3 客户端直连与端侧正版验证</text>

      {/* LAYER 5 */}
      <rect x="16" y="450" width="680" height="92" rx="10" fill="rgba(243, 251, 247, 0.65)" stroke="rgba(23, 107, 80, 0.22)" />
      <text x="30" y="467" fill="#176b50" fontSize="10.5" fontWeight="800" letterSpacing="0.04em">LAYER 5 · 云端轻基础设施 (Zero-Backend Cloud &amp; Integrations)</text>

      <rect x="30" y="478" width="216" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="42" y="494" fill="#101211" fontSize="11" fontWeight="750">Firebase AI Logic</text>
      <text x="42" y="510" fill="#64748b" fontSize="9.5">端侧直连 Gemini 2.5 模型</text>
      <text x="42" y="522" fill="#176b50" fontSize="8" fontWeight="700">零自建后端运维 · 消除单点故障</text>

      <rect x="256" y="478" width="216" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="268" y="494" fill="#101211" fontSize="11" fontWeight="750">Firebase App Check</text>
      <text x="268" y="510" fill="#64748b" fontSize="9.5">设备完整性与正版安全校验</text>
      <text x="268" y="522" fill="#64748b" fontSize="8">Play Integrity 认证防 API 盗刷</text>

      <rect x="482" y="478" width="202" height="52" rx="7" fill="#ffffff" stroke="rgba(23, 107, 80, 0.16)" />
      <text x="494" y="494" fill="#101211" fontSize="11" fontWeight="750">Google Play Billing</text>
      <text x="494" y="510" fill="#64748b" fontSize="9.5">官方月度订阅通道</text>
      <text x="494" y="522" fill="#64748b" fontSize="8">离线凭证缓存 · 原子购买校验</text>

      {/* ===== 右侧侧边栏：核心架构工程权衡 (KEY ARCHITECTURAL DECISIONS) ===== */}
      <rect x="712" y="14" width="212" height="528" rx="10" fill="rgba(16, 18, 17, 0.025)" stroke="rgba(16, 18, 17, 0.12)" />
      <text x="726" y="36" fill="#101211" fontSize="13" fontWeight="800" letterSpacing="-0.01em">核心架构工程权衡</text>
      <text x="726" y="51" fill="#64748b" fontSize="9">本地优先 · 故障自愈 · 单向沙箱</text>

      {/* 权衡 1 */}
      <rect x="724" y="66" width="188" height="142" rx="8" fill="#ffffff" stroke="rgba(23, 107, 80, 0.35)" />
      <rect x="724" y="66" width="4" height="142" rx="2" fill="#176b50" />
      <text x="736" y="85" fill="#176b50" fontSize="11" fontWeight="800">01 · 本地优先与零后端</text>
      <text x="736" y="103" fill="#334155" fontSize="9.5" fontWeight="600">数据 100% 私有，离线秒开。</text>
      <text x="736" y="121" fill="#64748b" fontSize="9">力量训练用户对隐私极度敏感；</text>
      <text x="736" y="137" fill="#64748b" fontSize="9">免注册登录，数据不出设备；</text>
      <text x="736" y="153" fill="#64748b" fontSize="9">无自建服务器，直连模型 API，</text>
      <text x="736" y="169" fill="#101211" fontSize="9" fontWeight="700">彻底根除宕机与数据泄露隐患。</text>
      <text x="736" y="195" fill="#176b50" fontSize="8" fontWeight="700">✓ 零服务器运维 · 离线绝对可用</text>

      {/* 权衡 2 */}
      <rect x="724" y="222" width="188" height="142" rx="8" fill="#ffffff" stroke="rgba(16, 18, 17, 0.25)" />
      <rect x="724" y="222" width="4" height="142" rx="2" fill="#101211" />
      <text x="736" y="241" fill="#101211" fontSize="11" fontWeight="800">02 · 事务落盘与故障自愈</text>
      <text x="736" y="259" fill="#334155" fontSize="9.5" fontWeight="600">保护举铁心流，绝不丢组。</text>
      <text x="736" y="277" fill="#64748b" fontSize="9">单组打勾事务级原子落盘，</text>
      <text x="736" y="293" fill="#176b50" fontSize="9" fontWeight="700">本地读写耗时稳定 P99 &lt; 5ms。</text>
      <text x="736" y="309" fill="#64748b" fontSize="9">遭遇系统强杀或断电冷启动时，</text>
      <text x="736" y="325" fill="#101211" fontSize="9" fontWeight="700">单向状态推演恢复活跃训练会话。</text>
      <text x="736" y="351" fill="#176b50" fontSize="8" fontWeight="700">✓ 核心操作稳定 60fps · 零丢失</text>

      {/* 权衡 3 */}
      <rect x="724" y="378" width="188" height="152" rx="8" fill="#ffffff" stroke="rgba(180, 83, 9, 0.3)" />
      <rect x="724" y="378" width="4" height="152" rx="2" fill="#b45309" />
      <text x="736" y="397" fill="#b45309" fontSize="11" fontWeight="800">03 · 单向沙箱与草案控制</text>
      <text x="736" y="415" fill="#334155" fontSize="9.5" fontWeight="600">模型零写权限，用户掌控资产。</text>
      <text x="736" y="433" fill="#64748b" fontSize="9">AI 引擎运行在独立安全沙箱中，</text>
      <text x="736" y="449" fill="#64748b" fontSize="9">对持久层仅暴露只读纯函数 Tool；</text>
      <text x="736" y="465" fill="#b45309" fontSize="9" fontWeight="700">计划微调只能生成可视化草案，</text>
      <text x="736" y="481" fill="#101211" fontSize="9" fontWeight="700">必须经由用户物理审批方可落盘。</text>
      <text x="736" y="519" fill="#176b50" fontSize="8" fontWeight="700">✓ 杜绝大模型在后台静默篡改资产</text>
    </svg>
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
          <a href="#overview">概览</a>
          <a href="#requirements">痛点</a>
          <a href="#competitors">竞品</a>
          <a href="#product-decisions">决策</a>
          <a href="#development">架构</a>
          <a href="#ai-system">AI 系统</a>
          <a href="#evaluation">AI 评测</a>
          <a href="#user-testing">用户测试</a>
          <a href="#operations">上线迭代</a>
          <a href="#reflection">复盘</a>
          <a href="#contact">联系</a>
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
          <div className="chapter-body chapter-body--needs-split">
            <div className="needs-text-col" data-reveal>
              <header className="needs-header">
                <h2 id="requirements-title">用户痛点</h2>
              </header>
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

              <blockquote className="need-conclusion">
                FlowStrength 的差异化定位：面向进阶力量训练者的「训练记录 + AI 分析」
              </blockquote>
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
                  <CompetitorFlowSvg />
                </div>
              </section>

              <blockquote className="competitor-conclusion">
                记录工具难以深入分析，算法黑盒直接剥夺控制；真正的机会在于：用 AI 解释训练依据，但把控制权完整留给用户。
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
            <div className="product-decisions__grid">
              <article className="decision-card">
                <header className="decision-card__header">
                  <span className="decision-card__index">01</span>
                  <h3 className="decision-card__title">AI 范围</h3>
                </header>
                <p className="decision-card__thesis">优先切入训练复盘阶段</p>
                <div className="decision-stages">
                  <div className="decision-stage">
                    <span className="decision-stage__tag">规划阶段 · 难以满足需求</span>
                    <p>计划与个人偏好、健身条件等多因素强相关，AI 难以在信息有限的情况下给出满意方案</p>
                  </div>
                  <div className="decision-stage">
                    <span className="decision-stage__tag">执行阶段 · 延迟高且提升有限</span>
                    <p>举铁做组需要毫秒级打卡；AI 既存在网络和生成延迟，也难以减少用户物理操作步骤</p>
                  </div>
                  <div className="decision-stage decision-stage--highlight">
                    <span className="decision-stage__tag">复盘阶段 · 高价值切入</span>
                    <p>固定统计图表分析受限，大模型擅长上下文推理与模式识别，能跨时间、跨动作进行灵活深度分析</p>
                  </div>
                </div>
              </article>

              <article className="decision-card">
                <header className="decision-card__header">
                  <span className="decision-card__index">02</span>
                  <h3 className="decision-card__title">AI 架构</h3>
                </header>
                <p className="decision-card__thesis">将分析主导权交给模型</p>
                <div className="decision-stages">
                  <div className="decision-stage">
                    <span className="decision-stage__tag">规则主导（已放弃）· AI能力受限</span>
                    <p>用固定规则树匹配用户意图，只能回答预设指标；面对复杂的长尾提问，完全丧失了跨数据归因能力。</p>
                  </div>
                  <div className="decision-stage decision-stage--highlight">
                    <span className="decision-stage__tag">模型主导（最终选择）· 动态多步探索</span>
                    <p>由模型自主理解长尾提问，决定调什么工具、对比哪段数据；能像真人教练一样，根据线索层层追踪原因。</p>
                  </div>
                  <div className="decision-stage">
                    <span className="decision-stage__tag">受控运行 · 严格限制调用预算</span>
                    <p>给予模型分析空间，但不给无界自由；工程上硬性约束工具调用步数与 Token 预算，超时或异常确定性回退。</p>
                  </div>
                </div>
              </article>

              <article className="decision-card">
                <header className="decision-card__header">
                  <span className="decision-card__index">03</span>
                  <h3 className="decision-card__title">AI 权限</h3>
                </header>
                <p className="decision-card__thesis">模型提需求，工具做计算，用户定结果</p>
                <div className="decision-stages">
                  <div className="decision-stage">
                    <span className="decision-stage__tag">指标运算 · 本地专用工具承载</span>
                    <p>模型只负责“要什么指标”；容量统计、极限估算等派生运算由本地 Tool 确定性算出，数据不足时主动标明局限。</p>
                  </div>
                  <div className="decision-stage">
                    <span className="decision-stage__tag">计划干预 · 仅生成结构化草案</span>
                    <p>模型被物理剥离数据库写权限；所有训练调整均以可视化 Diff 草案呈现，无法在后台私自篡改训练资产。</p>
                  </div>
                  <div className="decision-stage decision-stage--highlight">
                    <span className="decision-stage__tag">执行确认 · 用户拥有最高权限</span>
                    <p>是否采纳建议、何时应用变动，裁决权完全保留在用户手中，彻底消除用户对数据失控的安全顾虑。</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* 05 系统分层架构 */}
        <section className="section-chapter" id="development" aria-labelledby="dev-title">
          <header className="chapter-header" data-reveal>
            <h2 id="dev-title">系统分层架构</h2>
          </header>

          <div className="chapter-body">
            <article className="ai-system-panel ai-system-panel--arch" data-reveal>
              <div className="app-architecture__scroll">
                <AppSystemArchitectureSvg />
              </div>
            </article>
          </div>
        </section>

        {/* 06 AI 系统设计 */}
        <section className="section-chapter ai-system" id="ai-system" aria-labelledby="ai-system-title">
          <header className="chapter-header" data-reveal>
            <h2 id="ai-system-title">AI 系统设计</h2>
          </header>

          <div className="chapter-body ai-system__body">
            <article className="ai-system-panel ai-system-overview" data-reveal>
              <header className="ai-system-panel__header">
                <span>01</span>
                <div>
                  <h3>端到端运行链路</h3>
                  <p>Context 提供问题与用户背景，Analyze Tool 在运行中补充可计算、可追踪的训练事实。</p>
                </div>
              </header>
              <div className="ai-runtime-flow" aria-label="FlowStrength AI 从用户问题到个性化分析回答的端到端运行链路">
                <div className="ai-runtime-node"><span>INPUT</span><b>用户问题</b><small>文字 · 语音 · @实体</small></div>
                <i aria-hidden="true">→</i>
                <div className="ai-runtime-node"><span>CONTEXT</span><b>动态组装</b><small>任务 · 历史 · 个性化</small></div>
                <i aria-hidden="true">→</i>
                <div className="ai-runtime-node ai-runtime-node--agent"><span>REACT</span><b>Agent Runtime</b><small>理解 · 选择 · 下钻</small></div>
                <i aria-hidden="true">⇄</i>
                <div className="ai-runtime-node ai-runtime-node--tool"><span>TOOL</span><b>Analyze Training</b><small>查询 · 计算 · 对比</small></div>
                <i aria-hidden="true">→</i>
                <div className="ai-runtime-node"><span>OBSERVATION</span><b>训练事实</b><small>指标 · 范围 · 局限</small></div>
                <i aria-hidden="true">→</i>
                <div className="ai-runtime-node ai-runtime-node--answer"><span>OUTPUT</span><b>个性化回答</b><small>解释 · 假设 · 建议</small></div>
              </div>
              <div className="ai-runtime-guardrails">
                <span>运行底座</span>
                <b>Schema</b><b>Permission</b><b>Token Budget</b><b>Timeout</b><b>Trace</b>
              </div>
            </article>

            <div className="ai-system-zooms">
              <article className="ai-system-panel ai-zoom" data-reveal>
                <header className="ai-system-panel__header">
                  <span>02</span>
                  <div>
                    <h3>Context Assembly</h3>
                    <p>在有限预算内组织本轮真正需要的信息。</p>
                  </div>
                </header>
                <div className="context-assembly" aria-label="AI Context 的来源、预算组装和运行中更新逻辑">
                  <div className="context-sources">
                    <div><span>当前任务</span><b>问题 · @实体</b><small>文字 / 语音</small></div>
                    <div><span>会话上下文</span><b>摘要 · 最近原文</b><small>长期 / 近期</small></div>
                    <div><span>个性化</span><b>Instructions · Memory</b><small>Training Profile</small></div>
                    <div><span>诊断上下文</span><b>时间范围 · 分析对象</b><small>任务相关信息</small></div>
                    <div><span>系统约束</span><b>角色 · 权限</b><small>可用工具</small></div>
                  </div>
                  <div className="context-merge" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                  <div className="context-assembler">
                    <span>CONTEXT ASSEMBLER</span>
                    <b>按 Token 预算组合</b>
                    <small>结构化摘要 + 最近原文 + 个性化信息 + 诊断上下文</small>
                    <em>压缩失败 → 确定性截断回退</em>
                  </div>
                  <div className="context-result">
                    <div><span>初始结果</span><b>本轮 Agent Context</b></div>
                    <i aria-hidden="true">+</i>
                    <div className="context-result__observation"><span>运行中更新</span><b>Tool Observation</b></div>
                  </div>
                </div>
              </article>

              <article className="ai-system-panel ai-zoom" data-reveal>
                <header className="ai-system-panel__header">
                  <span>03</span>
                  <div>
                    <h3>AnalyzeTrainingTool</h3>
                    <p>返回原始事实、派生指标、实际范围与局限，不替模型下结论。</p>
                  </div>
                </header>
                <div className="analyze-tool" aria-label="AnalyzeTrainingTool 从参数校验到结构化 Observation 的处理逻辑">
                  <div className="analyze-tool__entry">
                    <span>AGENT TOOL CALL</span>
                    <b>分析目标 · 时间范围 · 对比需求</b>
                    <small>Schema 校验 → Permission</small>
                  </div>
                  <i className="analyze-tool__arrow" aria-hidden="true">↓</i>
                  <div className="analyze-tool__stage">
                    <span>01 · 解析分析范围</span>
                    <div className="analyze-tool__choices"><b>单次训练</b><b>指定动作</b><b>时间区间 / 周期</b><b>对比基线</b></div>
                  </div>
                  <i className="analyze-tool__arrow" aria-hidden="true">↓</i>
                  <div className="analyze-tool__stage">
                    <span>02 · 查询与确定性计算</span>
                    <div className="analyze-tool__choices"><b>原始训练组</b><b>训练容量</b><b>估算 1RM</b><b>周期对比</b></div>
                  </div>
                  <i className="analyze-tool__arrow" aria-hidden="true">↓</i>
                  <div className="analyze-tool__observation">
                    <span>STRUCTURED OBSERVATION</span>
                    <div><b>原始事实</b><b>派生指标</b><b>实际范围</b><b>局限 / 分页</b></div>
                    <small>写回当前运行上下文 → Agent 继续查询或生成回答</small>
                  </div>
                </div>
              </article>
            </div>

            <div className="ai-responsibility" data-reveal aria-label="AI 系统中的责任边界">
              <div><span>AGENT</span><b>理解 · 探索 · 解释</b></div>
              <div><span>TOOL</span><b>查询 · 计算 · 标记范围</b></div>
              <div><span>APP</span><b>权限 · 预算 · 运行门禁</b></div>
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
                        <span className="hard-gate-label">硬门槛</span>
                        <div className="hard-gate-tags">
                          <span>个人事实一致</span>
                          <span>工具权限边界</span>
                          <span>医疗安全红线</span>
                          <span>数据不足降级</span>
                          <span>故障安全收口</span>
                        </div>
                      </div>
                      <div className="eval-quality-dimensions">
                        <span className="quality-dim-label">质量维度</span>
                        <div className="quality-dim-tags">
                          <span>结论准确且完整</span>
                          <span>依据与可追溯性</span>
                          <span>不确定性与边界</span>
                          <span>下一步可执行性</span>
                          <span>表达清晰与克制</span>
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

                  {/* 3. 统计指标 */}
                  <div className="eval-system-block">
                    <div className="eval-system-block__label">
                      <span className="eval-subtag">03</span>
                      <h4>统计指标</h4>
                    </div>
                    <div className="eval-metrics-grid">
                      <div className="metric-chip">
                        <span>通过率口径</span>
                        <b>链路冒烟率 vs 严格语义通过率</b>
                      </div>
                      <div className="metric-chip">
                        <span>工程性能</span>
                        <b>端到端 P95 耗时（低于 10 秒）· 工具轨迹有效性</b>
                      </div>
                      <div className="metric-chip">
                        <span>经济性成本</span>
                        <b>单次运行平均 Token 消耗 · 调用轮次硬封顶</b>
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

                  {/* 2. 用例分类 */}
                  <div className="case-distribution-block">
                    <div className="contract-schema-label">
                      <span className="eval-subtag">02</span>
                      <h4>用例分类</h4>
                    </div>
                    <div className="case-contracts">
                      <div className="case-family case-family--live">
                        <header>
                          <b>训练分析集</b>
                        </header>
                        <div className="case-family__groups">
                          <span>诊断回归</span>
                          <span>深度分析</span>
                          <span>个人事实</span>
                          <span>程序评估</span>
                          <span>数据不足降级</span>
                          <span>医疗安全边界</span>
                        </div>
                      </div>
                      <div className="case-family">
                        <header>
                          <b>通用与安全边界集</b>
                        </header>
                        <div className="case-family__groups case-family__groups--four">
                          <span>App 功能交互</span>
                          <span>运动科学知识</span>
                          <span>多语言鲁棒性</span>
                          <span>对抗注入防御</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="evaluation-bottom-grid">
              {/* 03 测试方法 */}
              <article className="evaluation-panel" data-reveal>
                <header className="evaluation-panel__header">
                  <span>03</span>
                  <div><h3>测试方法</h3></div>
                </header>
                <div className="eval-method-wrapper">
                  <div className="eval-cli-bar">
                    <div className="cli-code">
                      <span className="cli-prompt">$</span>
                      <code>flutter test integration_test/live_agent_eval_test.dart</code>
                    </div>
                    <span className="cli-env-badge">eval_world_v1 12周基准</span>
                  </div>

                  <div className="eval-pipeline-strip">
                    <div className="pipeline-row">
                      <div className="pipeline-header">
                        <span className="pipeline-tag pipeline-tag--code">01 代码断言</span>
                        <b>拦截越权写库、参数错漏与调用超限（零模型裁判）</b>
                      </div>
                    </div>

                    <div className="pipeline-row">
                      <div className="pipeline-header">
                        <span className="pipeline-tag pipeline-tag--judge">02 业务 Oracle</span>
                        <b>逐项核验核心停滞遗漏、事实虚构与医疗红线越界</b>
                      </div>
                    </div>

                    <div className="pipeline-row">
                      <div className="pipeline-header">
                        <span className="pipeline-tag pipeline-tag--human">03 人工双盲</span>
                        <b>100% 人工复核 23 条基线，建立真值金标准校准裁判</b>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 04 优化效果 */}
              <article className="evaluation-panel" data-reveal>
                <header className="evaluation-panel__header">
                  <span>04</span>
                  <div><h3>优化效果</h3></div>
                </header>
                <div className="eval-results-wrapper">
                  <div className="eval-hierarchy-bar">
                    <span className="hierarchy-label">优化优先级</span>
                    <span className="hierarchy-step">Tool 数据供给</span>
                    <i>→</i>
                    <span className="hierarchy-step">Context 装配</span>
                    <i>→</i>
                    <span className="hierarchy-step">规则断言拦截</span>
                    <i>→</i>
                    <span className="hierarchy-step">Prompt 契约</span>
                  </div>

                  <div className="eval-diff-grid">
                    <div className="eval-diff-card">
                      <div className="diff-card-head">
                        <strong>局部数据当全部</strong>
                        <span>数据范围越界</span>
                      </div>
                      <div className="diff-card-body">
                        <div className="diff-line diff-line--del">
                          <span>-</span>
                          <p>仅读到局部记录便断言为近期全部训练，武断下结论</p>
                        </div>
                        <div className="diff-line diff-line--cause">
                          <p>// Tool 透出完整性元数据 + 代码断言拦截越界主张</p>
                        </div>
                        <div className="diff-line diff-line--add">
                          <span>+</span>
                          <p>准确锚定数据覆盖窗口，样本不足时主动声明边界</p>
                        </div>
                      </div>
                    </div>

                    <div className="eval-diff-card">
                      <div className="diff-card-head">
                        <strong>罗列明细缺少分析</strong>
                        <span>高阶特征缺失</span>
                      </div>
                      <div className="diff-card-body">
                        <div className="diff-line diff-line--del">
                          <span>-</span>
                          <p>机械罗列动作与负荷流水账，遗漏深蹲 77.5kg 停滞</p>
                        </div>
                        <div className="diff-line diff-line--cause">
                          <p>// Tool 底层直接计算派生进展与停滞指标注入</p>
                        </div>
                        <div className="diff-line diff-line--add">
                          <span>+</span>
                          <p>模型自然捕捉异常，主动输出停滞归因与微调建议</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="eval-leap-strip">
                    <div className="leap-item">
                      <span>Oracle 语义达标率</span>
                      <b>43.5% <i>→</i> 80%+</b>
                    </div>
                    <div className="leap-item">
                      <span>P0 门禁失败</span>
                      <b>4 条 <i>→</i> 0 条</b>
                    </div>
                    <div className="leap-item">
                      <span>单次 Token 消耗</span>
                      <b>降低 50%+</b>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 09 用户测试 */}
        <section className="section-chapter user-testing-chapter" id="user-testing" aria-labelledby="user-testing-title">
          <div className="chapter-body chapter-body--needs-split">
            <div className="needs-text-col" data-reveal>
              <header className="needs-header">
                <h2 id="user-testing-title">用户测试</h2>
              </header>
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
                    <h4>{item.title}</h4>
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
