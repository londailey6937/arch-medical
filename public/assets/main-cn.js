// GA4 config
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XXXXXXXXXX");

// Mobile menu toggle
document
  .getElementById("mobileMenu")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("nav-open");
  });

// Scroll-reveal animation for hero cards
(function () {
  var cards = document.querySelectorAll(".showcase-hero-card");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.15 },
  );
  cards.forEach(function (card) {
    observer.observe(card);
  });
})();

// Card popup data for all 9 hero cards (Chinese)
var cardPopupData = [
  {
    title: "双轨道仪表盘",
    desc: "技术和法规里程碑并排跟踪。您的团队可以清楚了解两条轨道的进展——以及什么正在阻碍FDA批准。",
    features: [
      { icon: "🔬", name: "技术轨道", detail: "工程里程碑、V&V 测试、设计控制" },
      { icon: "📋", name: "法规轨道", detail: "510(k) 提交步骤、FDA交互、合规关卡" },
      { icon: "🚦", name: "状态一览", detail: "每个里程碑的红/黄/绿状态指示" },
      { icon: "📊", name: "风险可见性", detail: "按严重性、负责人和缓解措施显示未关闭风险" },
      { icon: "🎯", name: "阶段评审", detail: "带有通过/不通过标准的阶段关卡检查点" },
      { icon: "⏱️", name: "时间线跟踪", detail: "距下一里程碑天数、剩余时间和关键路径视图" },
    ],
  },
  {
    title: "文档控制",
    desc: "符合ISO 13485的文档生命周期管理。每次修订、评审周期和审批都有完整的审计追溯记录。",
    features: [
      { icon: "📁", name: "设计历史文件", detail: "结构化DHF，自动关联设计输入、输出和验证" },
      { icon: "🔄", name: "版本历史", detail: "完整的修订链，包含作者、日期和变更摘要" },
      { icon: "✅", name: "评审与审批", detail: "计划的评审周期与签字跟踪" },
      { icon: "🔍", name: "审计追踪", detail: "不可篡改的文档操作记录，确保FDA检查就绪" },
      { icon: "📎", name: "标准映射", detail: "将文档关联到 IEC 62304、ISO 14971 和共识标准" },
      { icon: "📤", name: "导出就绪", detail: "一键导出 510(k) 提交文件包" },
    ],
  },
  {
    title: "消息中心",
    desc: "目标驱动的消息系统——每条线程追踪一个决策、行动或状态更新，与项目执行紧密结合。",
    features: [
      { icon: "💬", name: "线程讨论", detail: "按主题、阶段或法规问题组织对话" },
      { icon: "📌", name: "决策跟踪", detail: "置顶关键决策，记录理由和负责人" },
      { icon: "🌐", name: "双语支持", detail: "中英文界面，支持跨境团队协作" },
      { icon: "🔔", name: "智能通知", detail: "提及、截止日期和未解决行动项的提醒" },
      { icon: "🔗", name: "上下文关联", detail: "将消息附加到里程碑、文档或风险项" },
      { icon: "📋", name: "行动项", detail: "将任何消息转为带负责人和截止日期的跟踪行动" },
    ],
  },
  {
    title: "门控系统",
    desc: "带标准清单的阶段门控评审——通过/不通过决定，记录利益相关方输入、条件和行动项。",
    features: [
      { icon: "🚪", name: "阶段门控", detail: "从概念到上市后可配置的门控阶段" },
      { icon: "✅", name: "标准清单", detail: "每个门控的交付物和成功标准" },
      { icon: "👥", name: "利益相关方评审", detail: "审核人分配与签字跟踪" },
      { icon: "🚦", name: "通过/不通过/有条件", detail: "三种状态决策并记录理由" },
      { icon: "📝", name: "条件与行动", detail: "跟踪门控后条件和后续任务" },
      { icon: "📊", name: "门控历史", detail: "每次门控决策和修订的完整审计追踪" },
    ],
  },
  {
    title: "风险仪表盘",
    desc: "ISO 14971风险矩阵，含严重性、概率和颜色编码风险级别——从识别到关闭跟踪缓解措施。",
    features: [
      { icon: "⚠️", name: "风险矩阵", detail: "5×5 严重性×概率网格，颜色编码风险级别" },
      { icon: "📉", name: "缓解跟踪", detail: "将每个风险链接到缓解措施，附状态和负责人" },
      { icon: "🔴", name: "风险级别", detail: "红/黄/绿分类，带阈值警报" },
      { icon: "📋", name: "ISO 14971对齐", detail: "按照国际标准的结构化风险分析" },
      { icon: "🔄", name: "残余风险", detail: "跟踪缓解前后的风险级别" },
      { icon: "📊", name: "风险趋势", detail: "监控项目生命周期内的开放与已关闭风险" },
    ],
  },
  {
    title: "FDA通讯中心",
    desc: "Q-Sub附信生成器、17项RTA自检、MDUFA时间线跟踪和SE决策流程图——集于一个标签页。",
    features: [
      { icon: "📨", name: "Q-Sub生成器", detail: "自动生成符合FDA格式的Pre-Sub附信" },
      { icon: "✅", name: "RTA自检", detail: "17项拒绝受理清单，与您的DHF交叉验证" },
      { icon: "⏱️", name: "MDUFA跟踪", detail: "FDA审查时间线里程碑及天数计数" },
      { icon: "🔀", name: "SE决策流程", detail: "5点实质等同决策流程图" },
      { icon: "📄", name: "信函模板", detail: "Pre-Sub、510(k)、RTA回复、撤回和修正模板" },
      { icon: "🏛️", name: "FDA联系方式", detail: "按设备类别的分支机构联系目录" },
    ],
  },
  {
    title: "预算跟踪",
    desc: "按类别的计划与实际支出及自动差异计算——在USD和CNY显示之间切换。",
    features: [
      { icon: "💰", name: "分类预算", detail: "法规、工程、测试、法律和自定义类别" },
      { icon: "📊", name: "差异分析", detail: "自动计划与实际差异计算及警报" },
      { icon: "💱", name: "USD/CNY切换", detail: "美元和人民币显示之间切换，实时转换" },
      { icon: "📈", name: "消耗率", detail: "月度支出跟踪与跑道预测" },
      { icon: "🔔", name: "超预算警报", detail: "类别超出计划限额时的视觉警告" },
      { icon: "📤", name: "导出报告", detail: "下载预算摘要用于投资人报告" },
    ],
  },
  {
    title: "审计追踪",
    desc: "符合21 CFR Part 11——每次更改都有时间戳，记录用户、字段、旧值、新值和详细描述。",
    features: [
      { icon: "🕐", name: "时间戳变更", detail: "每次编辑记录精确的日期、时间和用户" },
      { icon: "👤", name: "用户归属", detail: "谁做了哪些更改，附角色和会话信息" },
      { icon: "🔄", name: "字段级差异", detail: "每个修改字段的旧值→新值" },
      { icon: "🔒", name: "不可变记录", detail: "仅追加的审计日志，无法编辑或删除" },
      { icon: "🏛️", name: "21 CFR Part 11", detail: "专为FDA电子记录合规设计" },
      { icon: "🔍", name: "搜索与筛选", detail: "按用户、日期范围、字段或记录类型查找变更" },
    ],
  },
  {
    title: "行动项 / DHF / CAPA",
    desc: "任务板、设计历史文件跟踪器、设备主记录跟踪器以及纠正与预防措施日志。",
    features: [
      { icon: "📋", name: "行动板", detail: "看板式任务跟踪，附负责人、优先级和截止日期" },
      { icon: "📁", name: "设计历史文件", detail: "结构化DHF跟踪——输入、输出、验证、确认" },
      { icon: "📦", name: "设备主记录", detail: "DMR跟踪规格、程序和标签" },
      { icon: "⚠️", name: "CAPA日志", detail: "纠正与预防措施日志，附根因分析" },
      { icon: "🔗", name: "交叉引用", detail: "将行动关联到风险、文档和门控条件" },
      { icon: "📊", name: "状态概览", detail: "开放、进行中和已关闭项目的仪表盘视图" },
    ],
  },
];

// Wire card popups
(function () {
  var modal = document.getElementById("cardModal");
  var modalTitle = document.getElementById("cardModalTitle");
  var modalImg = document.getElementById("cardModalImg");
  var modalDesc = document.getElementById("cardModalDesc");
  var modalFeatures = document.getElementById("cardModalFeatures");

  document
    .querySelectorAll(".showcase-hero-card")
    .forEach(function (card, i) {
      card.addEventListener("click", function () {
        var data = cardPopupData[i];
        if (!data) return;
        modalTitle.textContent = data.title;
        modalImg.src = card.querySelector("img").src;
        modalImg.alt = data.title;
        modalDesc.textContent = data.desc;
        modalFeatures.innerHTML = data.features
          .map(function (f) {
            return (
              '<div class="card-modal-feature">' +
              '<span class="card-modal-feature-icon">' +
              f.icon +
              "</span>" +
              '<div class="card-modal-feature-text"><strong>' +
              f.name +
              "</strong>" +
              "<span>" +
              f.detail +
              "</span></div></div>"
            );
          })
          .join("");
        modal.classList.add("active");
      });
    });

  document
    .getElementById("cardModalClose")
    .addEventListener("click", function () {
      modal.classList.remove("active");
    });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("active");
  });
})();

// Lightbox for screenshot thumbnails (bottom grid only)
(function () {
  var lb = document.getElementById("showcaseLightbox");
  var lbImg = document.getElementById("lightboxImg");
  document.querySelectorAll(".showcase-thumb img").forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      lbImg.src = this.src;
      lbImg.alt = this.alt;
      lb.classList.add("active");
    });
  });
  document
    .getElementById("lightboxClose")
    .addEventListener("click", function () {
      lb.classList.remove("active");
    });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) lb.classList.remove("active");
  });
})();
