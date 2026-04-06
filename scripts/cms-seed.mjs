#!/usr/bin/env node
// ============================================================
// CMS SEED — Populates cms_sections with content extracted from
// the current HTML files. Run once to bootstrap the CMS.
//
//   node scripts/cms-seed.mjs
//
// Requires SUPABASE_SERVICE_KEY env var (or .env file).
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://fllqdhvvnqoayugohzld.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ||
  (() => {
    try {
      const env = readFileSync(join(__dirname, "..", ".env"), "utf-8");
      const m = env.match(/SUPABASE_SERVICE_KEY=(.+)/);
      return m?.[1]?.trim();
    } catch {
      return undefined;
    }
  })();

if (!SUPABASE_KEY) {
  console.error(
    "Set SUPABASE_SERVICE_KEY env var or add it to .env in project root",
  );
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Content data ────────────────────────────────────────────

const tiers = {
  en: [
    {
      key: "control-tower",
      label: "SaaS Platform",
      title: "Control Tower License",
      price: "From $500/mo",
      featured: false,
      description:
        "Three tiers: Starter ($500/mo, 1 project), Growth ($1,000/mo, 2 projects with full document control), and Scale ($2,000/mo, unlimited projects with FDA Communications Center). All tiers include tri-lingual setup.",
      features: [
        "Dedicated project dashboard with dual-track milestone tracking",
        "Tri-lingual setup wizard (EN/中文/한국어)",
        "Regulatory document control & audit trail",
        "Real-time team messaging & gate reviews",
        "Risk & budget monitoring with variance alerts",
        "Growth+ adds ISO 13485 doc lifecycle; Scale adds Q-Sub builder & RTA self-check",
      ],
      cost_context:
        "A typical 510(k) program costs $150K–$400K. Our dashboard at $500–2,000/mo over 18 months is $9K–$36K — just 5–10% of total program cost for full project visibility.",
      cta_text: "Get Started",
      cta_style: "outline",
    },
    {
      key: "qms-lite",
      label: "Quality System",
      title: "QMS-Lite for Startups",
      price: "$200–500/mo",
      featured: false,
      description:
        "A lightweight quality management system built for medical device startups — not an enterprise platform priced at $5K–$15K/mo. Pricing scales with user count and document volume.",
      features: [
        "5 core QMS subsystems: doc control, CAPA, training, suppliers, complaints",
        "Dual compliance: 21 CFR 820 (FDA) & ISO 13485 (international)",
        "Training records management with completion tracking",
        "Supplier qualification & audit scheduling",
        "Complaint handling with trend analysis",
        "Integrates directly with Control Tower dashboard",
      ],
      cost_context:
        "Quality system gaps discovered during acquisition due diligence can reduce deal value by $500K–$2M. QMS-Lite at $200–500/mo is insurance against that risk.",
      cta_text: "Get Started",
      cta_style: "outline",
    },
    {
      key: "predicate-finder",
      label: "AI-Powered",
      title: "Predicate Finder",
      price: "Included with services",
      featured: false,
      description: "",
      features: [
        "Search FDA's openFDA database for predicate devices",
        "AI-powered substantial equivalence analysis",
        "Product code & regulation number lookup",
        "510(k) clearance history & decision summaries",
        "Exportable comparison reports",
        "Tri-lingual interface (EN/中文/한국어)",
      ],
      cost_context: "",
      cta_text: "Request Access",
      cta_style: "outline",
    },
    {
      key: "professional-pm",
      label: "Most Popular",
      title: "Professional PM",
      price: "$10–25K/mo",
      featured: true,
      description:
        "A dedicated PMP project manager runs your Control Tower dashboard, manages gate reviews, coordinates vendors, tracks FDA timelines, and delivers weekly status reports. Typical engagement: 12–18 months.",
      features: [
        "Everything in SaaS, plus:",
        "Dedicated PMP project manager",
        "FDA Communications Center (Q-Sub automation, MDUFA tracking)",
        "US Agent representation (FDA requirement for foreign manufacturers)",
        "Gate review management & weekly status reports",
        "Regulatory submission oversight",
        "Supplier coordination & testing lab management",
      ],
      cost_context:
        "Comparable US regulatory consultancies (Emergo, NAMSA, Greenlight Guru) charge $15–50K/mo for similar PM services — without a dedicated project dashboard. Our $10–25K/mo includes the full Control Tower platform.",
      cta_text: "Schedule a Call",
      cta_style: "primary",
    },
    {
      key: "entity-setup",
      label: "Market Entry",
      title: "Entity Setup Tracker",
      price: "$1K–5K or $200/mo",
      featured: false,
      description:
        "Guides US entity formation step-by-step and keeps compliance documents organized. One-time fee covers setup; monthly fee covers ongoing compliance tracking.",
      features: [
        "Delaware C-Corp formation — the structure US acquirers expect",
        "Oregon state registration, registered agent & EIN",
        "US bank account coordination (required before paying FDA fees)",
        "FDA establishment registration & US Agent designation",
        "Labeling compliance tracking (US requirements differ from CN/EU)",
        "Prerequisite for nearly every other service we offer",
      ],
      cost_context:
        "Law firms typically charge $5K–$15K for incorporation, registered agent, and FDA registration. Our tracker provides the same organizational framework at $1K–$5K — a fraction of attorney fees.",
      cta_text: "Get Started",
      cta_style: "outline",
    },
    {
      key: "enterprise",
      label: "Full Service",
      title: "Enterprise",
      price: "$50–200K+",
      featured: false,
      description:
        "End-to-end 510(k) project management: regulatory strategy, predicate research, testing oversight, submission preparation, and investor-ready documentation. Project-based pricing.",
      features: [
        "Everything in Professional, plus:",
        "Regulatory strategy & pathway selection",
        "Automated 17-item RTA self-check, SE decision flow & DHF readiness",
        "US entity formation assistance",
        "End-to-end 510(k) management",
        "Investor-ready documentation & due-diligence package",
      ],
      cost_context:
        "Includes everything in Professional PM plus hands-on regulatory work — predicate device analysis, testing protocols, 510(k) dossier drafting, and FDA submission management.",
      cta_text: "Contact Us",
      cta_style: "outline",
    },
  ],

  cn: [
    {
      key: "control-tower",
      label: "SaaS平台",
      title: "Control Tower许可",
      price: "每月$500起",
      featured: false,
      description:
        "三个层级：入门版（$500/月，1个项目），成长版（$1,000/月，2个项目，含完整文档控制），规模版（$2,000/月，无限项目，含FDA通信中心）。所有层级均含三语设置。",
      features: [
        "专属项目仪表盘，双轨里程碑跟踪",
        "三语设置向导（EN/中文/한국어）",
        "法规文档管控与审计追踪",
        "实时团队消息与关门评审",
        "风险和预算监控，含差异预警",
        "成长版+增加ISO 13485文档生命周期管理；规模版增加Q-Sub构建器与RTA自检",
      ],
      cost_context:
        "典型510(k)项目总成本为$150K–$400K。我们的仪表盘在18个月内$500–2,000/月，即$9K–$36K — 仅为项目总预算的5–10%，即可获得完整项目可视性。",
      cta_text: "立即开始",
      cta_style: "outline",
    },
    {
      key: "qms-lite",
      label: "质量管理",
      title: "QMS-Lite 轻量版",
      price: "$200–500/月",
      featured: false,
      description:
        "为医疗器械初创公司打造的轻量级质量管理系统 — 而非$5K–$15K/月的企业级平台。定价根据用户数量和文档体量浮动。",
      features: [
        "5个核心QMS子系统：文档控制、CAPA、培训、供应商、投诉",
        "双重合规：21 CFR 820（FDA）与ISO 13485（国际）",
        "培训记录管理与完成度跟踪",
        "供应商资质认证与审计安排",
        "投诉处理与趋势分析",
        "与Control Tower仪表盘无缝集成",
      ],
      cost_context:
        "收购尽职调查中发现质量体系问题可能使交易减少$500K–$2M。QMS-Lite每月$200–500是对这种风险的保险。",
      cta_text: "立即开始",
      cta_style: "outline",
    },
    {
      key: "predicate-finder",
      label: "AI驱动",
      title: "等效器械查找器",
      price: "服务包含",
      featured: false,
      description: "",
      features: [
        "搜索FDA openFDA数据库查找等效器械",
        "AI驱动的实质性等效分析",
        "产品代码和法规编号查询",
        "510(k)许可历史和决策摘要",
        "可导出的对比报告",
        "双语界面（EN/中文）",
      ],
      cost_context: "",
      cta_text: "申请访问",
      cta_style: "outline",
    },
    {
      key: "professional-pm",
      label: "最受欢迎",
      title: "专业项目管理",
      price: "$10,000–25,000/月",
      featured: true,
      description:
        "专属PMP项目经理运行您的Control Tower仪表盘、管理关门评审、协调供应商、跟踪FDA时间线并提供每周状态报告。典型参与周期：12–18个月。",
      features: [
        "包含SaaS所有功能，另加：",
        "专属PMP项目经理",
        "FDA通信中心（Q-Sub自动化、MDUFA追踪）",
        "美国代理人服务（FDA对外国制造商的强制要求）",
        "关门评审管理与每周状态报告",
        "法规提交监督",
        "供应商协调与测试实验室管理",
      ],
      cost_context:
        "同类美国法规咨询公司（Emergo、NAMSA、Greenlight Guru）类似PM服务收费$15–50K/月，且不提供专用仪表盘。我们$10–25K/月包含完整Control Tower平台。",
      cta_text: "预约通话",
      cta_style: "primary",
    },
    {
      key: "entity-setup",
      label: "市场准入",
      title: "跨境实体设立追踪器",
      price: "$1K–5K或$200/月",
      featured: false,
      description:
        "逐步引导美国实体设立流程，保持合规文档有序。一次性费用覆盖设立；月费覆盖持续合规跟踪。",
      features: [
        "Delaware C-Corp注册成立 — 美国收购方期望的标准结构",
        "俄勒冈州登记、注册代理人和EIN设置",
        "美国银行账户协调（支付FDA费用前必须开设）",
        "FDA机构注册与美国代理人指定",
        "标签合规跟踪（美国要求与中国/欧盟不同）",
        "几乎所有其他服务的先决条件",
      ],
      cost_context:
        "律师处理公司设立、注册代理人和FDA注册通常收费$5K–$15K。我们的追踪器以$1K–$5K提供相同框架 — 仅为律师费用的一小部分。",
      cta_text: "立即开始",
      cta_style: "outline",
    },
    {
      key: "enterprise",
      label: "全套服务",
      title: "企业级",
      price: "$50K–200K+",
      featured: false,
      description:
        "端到端510(k)项目管理：法规战略、对比器械研究、测试监督、提交准备和投资者就绪文档。按项目定价。",
      features: [
        "包含专业版所有功能，另加：",
        "法规策略与路径规划",
        "自动化17项RTA自检、SE决策流程与DHF就绪评估",
        "美国实体成立协助",
        "510(k)全流程管理",
        "投资人级别文档与尽职调查材料包",
      ],
      cost_context:
        "包含专业PM的所有内容，加上实际法规工作 — 对比器械分析、测试方案、510(k)文件起草和FDA提交管理。",
      cta_text: "联系我们",
      cta_style: "outline",
    },
  ],

  ko: [
    {
      key: "control-tower",
      label: "SaaS 플랫폼",
      title: "Control Tower 라이선스",
      price: "월 $500부터",
      featured: false,
      description:
        "세 가지 티어: 스타터($500/월, 1개 프로젝트), 그로스($1,000/월, 2개 프로젝트, 전체 문서 관리), 스케일($2,000/월, 무제한 프로젝트, FDA 커뮤니케이션 센터). 모든 티어에 다국어 설정 포함.",
      features: [
        "전용 프로젝트 대시보드, 듀얼트랙 마일스톤 추적",
        "다국어 설정 마법사 (EN/한국어/中文)",
        "규제 문서 관리 및 감사 추적",
        "실시간 팀 메시징 및 게이트 리뷰",
        "리스크 및 예산 모니터링, 편차 알림",
        "그로스+ ISO 13485 문서 수명주기 추가; 스케일은 Q-Sub 빌더 및 RTA 자가점검 추가",
      ],
      cost_context:
        "일반적인 510(k) 프로그램 총비용은 $150K–$400K입니다. 우리 대시보드는 18개월간 $500–2,000/월, 즉 $9K–$36K — 총 프로그램 비용의 5–10%로 완전한 프로젝트 가시성을 제공합니다.",
      cta_text: "시작하기",
      cta_style: "outline",
    },
    {
      key: "qms-lite",
      label: "품질 관리",
      title: "QMS-Lite",
      price: "$200–500/월",
      featured: false,
      description:
        "의료기기 스타트업을 위한 경량 품질관리시스템 — $5K–$15K/월의 엔터프라이즈급 플랫폼이 아닙니다. 사용자 수와 문서량에 따라 가격이 조정됩니다.",
      features: [
        "5개 핵심 QMS 하위시스템: 문서 관리, CAPA, 교육, 공급업체, 불만",
        "이중 준수: 21 CFR 820 (FDA) 및 ISO 13485 (국제)",
        "교육 기록 관리 및 완료 추적",
        "공급업체 자격 인증 및 감사 일정",
        "불만 처리 및 추세 분석",
        "Control Tower 대시보드와 원활한 통합",
      ],
      cost_context:
        "인수 실사 과정에서 발견된 품질 시스템 문제는 거래 가치를 $500K–$2M 감소시킬 수 있습니다. QMS-Lite $200–500/월은 이러한 리스크에 대한 보험입니다.",
      cta_text: "시작하기",
      cta_style: "outline",
    },
    {
      key: "predicate-finder",
      label: "AI 기반",
      title: "선행기기 검색기 (Predicate Finder)",
      price: "서비스에 포함",
      featured: false,
      description: "",
      features: [
        "FDA openFDA 데이터베이스에서 선행기기 검색",
        "AI 기반 실질적 동등성(SE) 분석",
        "제품 코드 및 규제 번호 조회",
        "510(k) 인허가 이력 및 결정 요약",
        "내보내기 가능한 비교 보고서",
        "다국어 인터페이스 (EN/한국어)",
      ],
      cost_context: "",
      cta_text: "접근 요청",
      cta_style: "outline",
    },
    {
      key: "professional-pm",
      label: "가장 인기",
      title: "전문 프로젝트 관리",
      price: "$10,000–25,000/월",
      featured: true,
      description:
        "전담 PMP 프로젝트 매니저가 Control Tower 대시보드를 운영하고, 게이트 리뷰를 관리하며, 공급업체를 조정하고, FDA 타임라인을 추적하여 주간 상태 보고서를 제공합니다. 일반 참여 기간: 12–18개월.",
      features: [
        "SaaS 모든 기능 포함, 추가:",
        "전담 PMP 프로젝트 매니저",
        "FDA 커뮤니케이션 센터 (Q-Sub 자동화, MDUFA 추적)",
        "미국 에이전트 서비스 (외국 제조업체에 대한 FDA 필수 요건)",
        "게이트 리뷰 관리 및 주간 상태 보고서",
        "규제 제출 감독",
        "공급업체 조정 및 시험 연구소 관리",
      ],
      cost_context:
        "유사한 미국 규제 컨설팅 회사(Emergo, NAMSA, Greenlight Guru)는 유사한 PM 서비스에 $15–50K/월을 청구하며 전용 대시보드를 제공하지 않습니다. 우리의 $10–25K/월에는 전체 Control Tower 플랫폼이 포함됩니다.",
      cta_text: "상담 예약",
      cta_style: "primary",
    },
    {
      key: "entity-setup",
      label: "시장 진출",
      title: "미국 법인 설립 트래커",
      price: "$1K–5K 또는 $200/월",
      featured: false,
      description:
        "미국 법인 설립 과정을 단계별로 안내하고 규정 준수 문서를 체계적으로 관리합니다. 일회성 비용은 설립을, 월간 비용은 지속적인 준수 추적을 포함합니다.",
      features: [
        "델라웨어 C-Corp 설립 — 미국 인수자가 기대하는 표준 구조",
        "오레곤주 등록, 등록 대리인 및 EIN 설정",
        "미국 은행 계좌 개설 조율 (FDA 수수료 납부 전 필수)",
        "FDA 기관 등록 및 미국 에이전트 지정",
        "라벨링 준수 추적 (미국 요건은 한국/EU와 다름)",
        "우리가 제공하는 거의 모든 서비스의 전제 조건",
      ],
      cost_context:
        "로펌에서 법인 설립, 등록 대리인, FDA 등록을 처리하면 일반적으로 $5K–$15K가 소요됩니다. 우리 트래커는 $1K–$5K로 동일한 조직 프레임워크를 제공합니다.",
      cta_text: "시작하기",
      cta_style: "outline",
    },
    {
      key: "enterprise",
      label: "풀 서비스",
      title: "엔터프라이즈",
      price: "$50K–200K+",
      featured: false,
      description:
        "엔드투엔드 510(k) 프로젝트 관리: 규제 전략, 선행기기 조사, 시험 감독, 제출 준비 및 투자자급 문서. 프로젝트별 가격 책정.",
      features: [
        "전문 관리 모든 기능 포함, 추가:",
        "규제 전략 및 경로 설계",
        "17항 RTA 자가점검, SE 의사결정 플로우차트, DHF 준비도 평가 자동화",
        "미국 법인 설립 지원",
        "510(k) 전 과정 관리",
        "투자자급 문서 및 실사 패키지",
      ],
      cost_context:
        "전문 PM의 모든 내용에 실제 규제 업무 추가 — 선행기기 분석, 시험 프로토콜, 510(k) 서류 작성 및 FDA 제출 관리.",
      cta_text: "문의하기",
      cta_style: "outline",
    },
  ],
};

const testimonials = {
  en: [
    {
      quote:
        "The Control Tower dashboard gave us complete visibility into our 510(k) timeline. We always knew exactly where we stood with FDA.",
      author: "Medical Device Startup CEO",
      subtitle: "Class II Respiratory Device",
    },
    {
      quote:
        "Having a multilingual PMP who understood both our R&D team and US regulatory requirements was the difference between success and failure.",
      author: "VP of Regulatory Affairs",
      subtitle: "Cardiovascular Device Company",
    },
    {
      quote:
        "The 510(k) Bridge strategy helped us secure seed funding at the right time — right after our Pre-Sub meeting when investor confidence was highest.",
      author: "Co-Founder & CTO",
      subtitle: "Digital Health Startup",
    },
  ],
  cn: [
    {
      quote:
        "Control Tower仪表盘让我们对510(k)时间线有了完整的可视性。我们始终清楚地知道FDA审批进展到了哪一步。",
      author: "医疗器械初创企业CEO",
      subtitle: "II类呼吸设备",
    },
    {
      quote:
        "拥有一位既懂我们研发团队又了解美国法规要求的多语言PMP经理，是成功与失败之间的关键区别。",
      author: "法规事务副总裁",
      subtitle: "心血管器械公司",
    },
    {
      quote:
        "510(k) Bridge策略帮助我们在最佳时机获得了种子轮融资——就在Pre-Sub会议之后，投资者信心最高的时候。",
      author: "联合创始人 & CTO",
      subtitle: "数字健康初创公司",
    },
  ],
  ko: [
    {
      quote:
        "Control Tower 대시보드는 510(k) 타임라인에 대한 완전한 가시성을 제공했습니다. FDA 진행 상황을 항상 정확히 파악할 수 있었습니다.",
      author: "의료기기 스타트업 CEO",
      subtitle: "Class II 호흡기 기기",
    },
    {
      quote:
        "R&D 팀과 미국 규제 요건을 모두 이해하는 다국어 PMP가 있다는 것이 성공과 실패의 차이였습니다.",
      author: "규제 담당 VP",
      subtitle: "심혈관 기기 회사",
    },
    {
      quote:
        "510(k) Bridge 전략 덕분에 Pre-Sub 회의 직후 — 투자자 신뢰가 가장 높았을 때 — 적시에 시드 자금을 확보할 수 있었습니다.",
      author: "공동 창업자 & CTO",
      subtitle: "디지털 헬스 스타트업",
    },
  ],
};

const highlights = {
  en: [
    {
      icon: "🧙",
      title: "Tri-lingual Setup Wizard",
      description:
        "A guided 9-step wizard pre-populates your entire project dashboard — team roster, budget, milestones, suppliers, and risk register — in English, 한국어, or 中文. Start managing in minutes, not days.",
    },
    {
      icon: "🏛️",
      title: "FDA Communications Center",
      description:
        "Auto-generate Q-Sub cover letters, export structured question packages, run a 17-item RTA self-check (21 CFR 807) cross-referenced with your DHF, walk through the 5-point SE decision flowchart, track FDA's 90-day MDUFA review clock (Day 15 RTA screening → Day 60 substantive review → Day 90 decision target, with automatic clock-pause when FDA requests Additional Information) — nested inside your full project timeline — and navigate disagreement escalation — all from one tab.",
    },
    {
      icon: "📋",
      title: "RTA & DHF Readiness",
      description:
        "Real-time readiness scoring pulls from your Design History File and Standards trackers — covering eCopy, user fees, FDA Form 3881, device description, SE discussion, proposed labeling (21 CFR 801), and consensus standards (FDA Form 3654). Know exactly where you stand before FDA's Day 15 RTA screening — and avoid the 30% rejection rate.",
    },
    {
      icon: "🔍",
      title: "Predicate Finder",
      description:
        "AI-powered search of FDA's openFDA database to identify predicate devices, analyze substantial equivalence, and generate comparison reports. Find the right predicate in minutes — not weeks of manual research.",
    },
    {
      icon: "📄",
      title: "FDA Guidance Document Search",
      description:
        "Search FDA's library of 2,700+ guidance documents — final and draft guidances for medical devices, software, cybersecurity, biocompatibility, labeling, quality systems, and clinical data. Integrated directly into Control Tower.",
    },
    {
      icon: "🏗️",
      title: "QMS-Lite for Startups",
      description:
        "A lightweight quality management system aligned to 21 CFR 820 and ISO 13485 — covering document control, CAPA, training records, supplier qualification, and complaint handling. Built for startups, not enterprise complexity.",
    },
    {
      icon: "🌐",
      title: "Cross-Border Entity Setup",
      description:
        "Step-by-step tracker for US market entry — Delaware C-Corp formation, Oregon state registration, registered agent, EIN, bank account, FDA establishment registration, and US Agent compliance.",
    },
  ],
  cn: [
    {
      icon: "🧙",
      title: "三语设置向导",
      description:
        "9步引导式向导预填您的整个项目仪表盘——团队名册、预算、里程碑、供应商和风险台账——支持英文、中文或한국어。几分钟即可开始管理，而非数天。",
    },
    {
      icon: "🏛️",
      title: "FDA通信中心",
      description:
        "自动生成Q-Sub通信函、导出结构化问题包、运行17项RTA自检（21 CFR 807）与DHF交叉比对、5步SE判定流程图、追踪FDA 90天MDUFA审查时钟（第15天RTA筛查 → 第60天实质性审查 → 第90天决定目标，FDA要求补充信息时自动暂停计时）——嵌套在完整项目时间线中——以及争议升级导航——一个标签页全搞定。",
    },
    {
      icon: "📋",
      title: "RTA和DHF就绪度",
      description:
        "实时就绪度评分从您的设计历史文件和标准追踪器中提取——涵盖eCopy、用户费用、FDA Form 3881、器械描述、SE讨论、拟议标签（21 CFR 801）和共识标准（FDA Form 3654）。在FDA第15天RTA筛查之前精确了解您的准备状态——避免30%的拒绝率。",
    },
    {
      icon: "🔍",
      title: "等效器械查找器",
      description:
        "AI驱动搜索FDA openFDA数据库以识别等效器械、分析实质性等效性并生成对比报告。几分钟内找到合适的等效器械——而非数周的人工研究。",
    },
    {
      icon: "📄",
      title: "FDA指导文件搜索",
      description:
        "搜索FDA 2,700+份指导文件库——包括医疗器械、软件、网络安全、生物相容性、标签、质量体系和临床数据的最终版和草案指导文件。直接集成到Control Tower中。",
    },
    {
      icon: "🏗️",
      title: "初创企业QMS-Lite",
      description:
        "符合21 CFR 820和ISO 13485的轻量级质量管理系统——涵盖文档控制、CAPA、培训记录、供应商资质和投诉处理。为初创企业而建，非企业级复杂性。",
    },
    {
      icon: "🌐",
      title: "跨境实体设立",
      description:
        "美国市场进入的分步签追踪器——Delaware C-Corp成立、俄勒冈州登记、注册代理人、EIN、银行账户、FDA机构注册和美国代理人合规。",
    },
  ],
  ko: [
    {
      icon: "🧙",
      title: "다국어 설정 마법사",
      description:
        "9단계 가이드 마법사가 전체 프로젝트 대시보드를 미리 채워줍니다 — 팀 명단, 예산, 마일스톤, 공급업체, 리스크 대장 — 영어, 한국어, 또는 中文으로. 몇 분 안에 관리를 시작하세요.",
    },
    {
      icon: "🏛️",
      title: "FDA 커뮤니케이션 센터",
      description:
        "Q-Sub 커버 레터 자동 생성, 구조화된 질문 패키지 내보내기, 17항 RTA 자가점검(21 CFR 807)을 DHF와 교차 참조, 5단계 SE 결정 플로우차트, FDA 90일 MDUFA 리뷰 클럭 추적(15일차 RTA 스크리닝 → 60일차 실질 심사 → 90일차 결정 목표, FDA 추가 정보 요청 시 자동 일시중지) — 전체 프로젝트 타임라인에 통합 — 이의제기 에스컬레이션 안내 — 하나의 탭에서 모두 가능.",
    },
    {
      icon: "📋",
      title: "RTA 및 DHF 준비도",
      description:
        "설계 이력 파일 및 표준 트래커에서 실시간 준비도 점수를 추출 — eCopy, 사용자 수수료, FDA Form 3881, 기기 설명, SE 논의, 제안 라벨링(21 CFR 801), 합의 표준(FDA Form 3654) 포함. FDA 15일차 RTA 스크리닝 전에 정확히 어디에 있는지 파악하고 — 30% 거부율을 피하세요.",
    },
    {
      icon: "🔍",
      title: "선행기기 검색기",
      description:
        "FDA openFDA 데이터베이스에서 AI 기반 검색으로 선행기기를 식별하고, 실질적 동등성을 분석하며, 비교 보고서를 생성합니다. 수주간의 수동 연구 대신 몇 분 안에 적합한 선행기기를 찾으세요.",
    },
    {
      icon: "📄",
      title: "FDA 가이던스 문서 검색",
      description:
        "FDA의 2,700+ 가이던스 문서 라이브러리 검색 — 의료기기, 소프트웨어, 사이버보안, 생체적합성, 라벨링, 품질 시스템, 임상 데이터에 대한 최종 및 초안 가이던스. Control Tower에 직접 통합.",
    },
    {
      icon: "🏗️",
      title: "스타트업용 QMS-Lite",
      description:
        "21 CFR 820 및 ISO 13485에 부합하는 경량 품질관리시스템 — 문서 관리, CAPA, 교육 기록, 공급업체 자격 인증, 불만 처리 포함. 스타트업을 위해 구축, 엔터프라이즈 복잡성이 아닙니다.",
    },
    {
      icon: "🌐",
      title: "미국 법인 설립",
      description:
        "미국 시장 진출을 위한 단계별 트래커 — 델라웨어 C-Corp 설립, 오레곤주 등록, 등록 대리인, EIN, 은행 계좌, FDA 기관 등록, 미국 에이전트 준수.",
    },
  ],
};

// ── Insert all sections ─────────────────────────────────────

async function seed() {
  const rows = [];

  // Tiers
  for (const [lang, items] of Object.entries(tiers)) {
    rows.push({
      page: "home",
      section_key: "tiers",
      lang,
      sort_order: 30,
      content: { items },
    });
  }

  // Testimonials
  for (const [lang, items] of Object.entries(testimonials)) {
    rows.push({
      page: "home",
      section_key: "testimonials",
      lang,
      sort_order: 60,
      content: { items },
    });
  }

  // Highlights
  for (const [lang, items] of Object.entries(highlights)) {
    rows.push({
      page: "home",
      section_key: "highlights",
      lang,
      sort_order: 50,
      content: { items },
    });
  }

  // Upsert all
  const { error } = await sb.from("cms_sections").upsert(rows, {
    onConflict: "page,section_key,lang",
  });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} cms_sections rows.`);
}

seed();
