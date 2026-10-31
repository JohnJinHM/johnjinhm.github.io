import type { Locale } from './i18n'
import type { ExperienceId } from './experiences'

type RoleDetail = {
  id: ExperienceId
  paragraphs: string[]
  note?: string
}

type Project = {
  name: string
  href: string
  period?: string
  stack: string
  bullets: string[]
  note?: string
}

type ExperiencePageText = {
  title: string
  intro: string
  educationTitle: string
  school: string
  degree: string
  educationPeriod: string
  workTitle: string
  researchTitle: string
  projectsTitle: string
  independent: string
  repository: string
  work: RoleDetail[]
  research: RoleDetail[]
  projects: Project[]
}

// Confirmed interview material. Dates/titles for roles are shared with the home timeline.
// Both routes use this professional record; casual placeholders are never used here.
export const experiencePage: Record<Locale, ExperiencePageText> = {
  en: {
    title: 'Experience',
    intro: 'Education, work, research, teaching, and selected independent projects.',
    educationTitle: 'Education',
    school: 'University of Washington',
    degree: 'B.S. in Computer Science · Minor in Informatics',
    educationPeriod: 'September 2023 — March 2027 (expected)',
    workTitle: 'Work',
    researchTitle: 'Research & teaching',
    projectsTitle: 'Selected projects',
    independent: 'Independent development',
    repository: 'Repository',
    work: [
      {
        id: 'ignite',
        paragraphs: [
          'SummerTrack — Expanded an existing login and administration framework into a counseling platform using Next.js, TypeScript, Supabase, and PostgreSQL. Added institute administration and parent–student collaboration, with row-level security, revocable audience-specific sharing, and organization-scoped access controls.',
          'Developed a five-stage, resumable pipeline to discover, extract, enrich, merge, and validate data for a 2,930-record catalog. With cross-source deadline resolution, explicit-date coverage rose from approximately 28% to 41.8% between scrape rounds, excluding rolling admissions.',
          'Parts Request Portal — Contributed the catalog functionality of a Django parts platform: VEX catalog synchronization, SKU-level product variants, preservation of custom items during imports, and kit-aware search that surfaces containing kits for component-name queries.',
        ],
      },
      {
        id: 'trustrobot',
        paragraphs: [
          'Migrated HedraCAM’s OCCTProxy geometry and model data interfaces from C++/CLI to C# and native C++, using P/Invoke and pointer operations. Validated the interfaces on Linux and delivered them for production use.',
          'Prototyped Python integration with application interfaces using ZeroMQ publish–subscribe messaging.',
        ],
      },
    ],
    research: [
      {
        id: 'i2-program',
        paragraphs: [
          'Co-lead preparations for a research program expected to serve approximately 20 participants, organizing industry-speaker talks for outreach and developing a schedule of project review milestones.',
        ],
        note: 'Term expected to run through June 2027; program activities begin in Winter 2027. Providing research resources and publication support are planned responsibilities.',
      },
      {
        id: 'i2-fellows',
        paragraphs: [
          'Mentored a team investigating LLM streaming, coordinating project work, reviewing milestone deliverables, and answering research questions while guiding topic selection and preparation for the final presentation and defense.',
        ],
      },
      {
        id: 'i2-team',
        paragraphs: [
          'Led a five-member team in analyzing multimodal architectures, defining the research scope through preliminary literature review, dividing paper reviews by subfield, and consolidating findings into a final presentation.',
        ],
        note: 'Research Room member from September 2024 to April 2025; team lead from January to March 2025.',
      },
    ],
    projects: [
      {
        name: 'Broken Arrow Deck Builder & Data Toolchain',
        href: 'https://github.com/JohnJinHM/BA-DeckEditor',
        stack: 'React · TypeScript · Python · Playwright',
        bullets: [
          'Independently developed and published a browser-based game deck editor on GitHub Pages, implementing unit availability, loadout pricing, transport compatibility, and budget validation in TypeScript.',
          'Built a Python extraction and validation pipeline for 24 game-data tables containing 16,687 records, supporting card rendering and deck configuration for 540 units.',
          'Implemented WebCrypto-based deck-file import/export and automated data-consistency and serialization round-trip checks, including Playwright workflows for UI-level verification.',
        ],
        note: 'One toolchain spanning BA-DeckEditor, BA-ReCard, and BA-Units. Game data and assets belong to their respective creators.',
      },
      {
        name: 'VLoid — Local Voice AI Desktop Application',
        href: 'https://github.com/JohnJinHM/VLoid',
        period: 'November 2025 — Present',
        stack: 'Electron · FastAPI · SQLAlchemy · SQLite · SSE · WebSocket',
        bullets: [
          'Built a local voice AI desktop application with Electron and FastAPI, integrating local LLM inference, speech recognition, and text-to-speech through SSE and WebSocket interfaces.',
          'Implemented persistent, branching conversations with SQLAlchemy and SQLite, supporting message history, active conversation branches, and configurable personas.',
          'Developed a voice-input pipeline with voice activity detection, audio pre-roll, and partial/final transcription, alongside streaming speech synthesis with cached voice prompts in the voice-clone path.',
        ],
      },
    ],
  },
  zh: {
    title: '经历',
    intro: '教育、工作、研究与教学经历，以及代表性独立项目。',
    educationTitle: '教育',
    school: '华盛顿大学',
    degree: '计算机科学理学学士在读 · 辅修信息学',
    educationPeriod: '2023 年 9 月 — 2027 年 3 月（预计毕业）',
    workTitle: '工作',
    researchTitle: '研究与教学',
    projectsTitle: '代表项目',
    independent: '独立开发',
    repository: '代码仓库',
    work: [
      {
        id: 'ignite',
        paragraphs: [
          'SummerTrack — 在已有基础登录与管理框架上，使用 Next.js、TypeScript、Supabase 和 PostgreSQL 扩展咨询平台。开发机构管理、家长与学生协作，落地行级安全策略（RLS）、面向特定受众的可撤销共享及机构范围内的访问控制。',
          '开发发现、提取、补充、合并、验证五阶段可恢复数据管道，支持包含 2,930 条记录的数据目录。通过跨来源核对截止日期，两轮采集之间的明确日期覆盖率由约 28% 提升至 41.8%，不含 rolling admissions（滚动录取）。',
          'Parts Request Portal — 主要负责 Django 零部件平台的 catalog 功能：VEX 目录同步、SKU 级产品变体、导入时保留自定义项，以及可通过组件名称查出所属套件的 kit-aware 搜索。',
        ],
      },
      {
        id: 'trustrobot',
        paragraphs: [
          '将 HedraCAM 的 OCCTProxy 几何与模型数据接口由 C++/CLI 迁移至 C# 和原生 C++，使用 P/Invoke 并处理指针操作，在 Linux 上验证后交付生产使用。',
          '使用 ZeroMQ 发布／订阅消息机制，完成 Python 接入应用接口的原型工作。',
        ],
      },
    ],
    research: [
      {
        id: 'i2-program',
        paragraphs: [
          '联合筹备预计覆盖约 20 人的研究项目，组织业内人士 talks 用于宣传与前期准备，并逐步制定项目各阶段的评审日期。',
        ],
        note: '任期预计至 2027 年 6 月；项目活动于 2027 年冬季启动。提供研究资源与论文发表支持属于后续计划职责。',
      },
      {
        id: 'i2-fellows',
        paragraphs: [
          '指导研究 LLM streaming 的小组，统筹项目工作、验收阶段成果并解答研究问题，从方向选择到最终 presentation 与答辩准备提供支持。',
        ],
      },
      {
        id: 'i2-team',
        paragraphs: [
          '带领五人小组分析多模态架构，先通过文献调研确定研究范围，再按子领域分配论文阅读，最终整合为 presentation。',
        ],
        note: 'Research Room 成员期为 2024 年 9 月至 2025 年 4 月；其中小组负责人任期为 2025 年 1 月至 3 月。',
      },
    ],
    projects: [
      {
        name: 'Broken Arrow 卡组编辑器与数据工具链',
        href: 'https://github.com/JohnJinHM/BA-DeckEditor',
        stack: 'React · TypeScript · Python · Playwright',
        bullets: [
          '独立开发浏览器端游戏卡组编辑器并发布至 GitHub Pages，使用 TypeScript 实现单位可用性、配置计价、运输兼容性及预算校验。',
          '构建 Python 数据提取与验证管道，处理 24 张游戏数据表、16,687 条记录，支持 540 个单位的卡片渲染与卡组配置。',
          '实现基于 WebCrypto 的 deck 文件导入导出，以及数据一致性和序列化往返自动检查，包括用于界面验证的 Playwright 工作流。',
        ],
        note: 'BA-DeckEditor、BA-ReCard 与 BA-Units 合并为一项工具链。游戏数据与资产归各自创作者所有。',
      },
      {
        name: 'VLoid — 本地语音 AI 桌面应用',
        href: 'https://github.com/JohnJinHM/VLoid',
        period: '2025 年 11 月 — 至今',
        stack: 'Electron · FastAPI · SQLAlchemy · SQLite · SSE · WebSocket',
        bullets: [
          '使用 Electron 与 FastAPI 构建本地语音 AI 桌面应用，通过 SSE 与 WebSocket 接口整合本地 LLM 推理、语音识别和语音合成。',
          '使用 SQLAlchemy 和 SQLite 实现持久化分支对话，支持消息历史、活跃对话分支与可配置 persona。',
          '开发带有语音活动检测（VAD）、音频 pre-roll 及 partial/final 转写的语音输入管道；在 voice-clone 路径中支持流式语音合成与缓存语音提示。',
        ],
      },
    ],
  },
}
