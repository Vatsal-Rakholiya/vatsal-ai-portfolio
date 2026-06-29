import type { Portfolio } from "@/types/portfolio";

export const defaultSiteText = {
  heroKicker: "",
  heroPrimaryCta: "Explore projects",
  heroSecondaryCta: "Contact",
  portraitOrbitText: "AI ENGINEER",
  statOneValue: "40%",
  statOneLabel: "manual support review reduced",
  statTwoValue: "16K+",
  statTwoLabel: "crypto assets tracked",
  statThreeValue: "4K+",
  statThreeLabel: "cities in forecasting pipeline",
  statFourValue: "85%",
  statFourLabel: "forecasting accuracy reached",
  projectsKicker: "case files",
  projectsTitle: "Projects as intelligence systems",
  projectsIntro: "Each project is framed like an operational model: inputs, decisions, outputs, and measurable business impact.",
  systemsKicker: "capability map",
  systemsTitle: "A data scientist represented as a living stack",
  systemsIntro: "The site is database-backed, editable from the admin panel, and shaped like an AI operations surface instead of a static resume.",
  timelineKicker: "timeline",
  timelineTitle: "Experience and Education",
  contactKicker: "contact",
  contactTitle: "Send a project signal",
  contactIntro: "Reach out about data science roles, ML systems, dashboards, document intelligence, or applied AI products.",
  footerKicker: "portfolio signal complete",
  footerTitle: "Build data products that feel intelligent.",
  footerCta: "Start a conversation"
};

export const seedPortfolio: Portfolio = {
  profile: {
    slug: "vatsal-rakholiya",
    name: "Vatsal Rakholiya",
    headline: "Data Scientist building predictive, NLP, and document intelligence systems.",
    location: "Toronto, Ontario, Canada",
    email: "rcm.vatsal@gmail.com",
    phone: "+1 (437) 428-9973",
    linkedinUrl: "https://www.linkedin.com/in/vatsalrakholiya/",
    summary:
      "Data scientist with production experience across Python, SQL, machine learning, NLP, forecasting, dashboards, and applied generative AI. I turn noisy business data into decision systems: lead scoring, support automation, market intelligence, document search, and visual inspection workflows."
  },
  siteText: defaultSiteText,
  experiences: [
    {
      role: "Data Scientist",
      company: "Multipz Technology",
      location: "Ahmedabad, Gujarat, India",
      startDate: "Apr 2023",
      endDate: "Jun 2024",
      highlights: [
        "Built Python and SQL workflows for buyer inquiries, product requests, quotations, seller responses, follow-ups, and support notes.",
        "Developed Scikit-learn lead-scoring models to help sales teams identify higher-value buyer inquiries.",
        "Created NLP workflows for intent classification, sentiment analysis, topic grouping, and support ticket categorization.",
        "Built KPI dashboards for inquiry volume, lead quality, follow-up status, response patterns, and support categories.",
        "Reduced repetitive manual support review by 40% through automated inquiry classification and ticket grouping.",
        "Promoted from Trainee Data Scientist after delivering practical analytics work and taking ownership of project tasks."
      ]
    },
    {
      role: "Data Analyst Intern",
      company: "Elogicals Technology",
      location: "Ahmedabad, Gujarat, India",
      startDate: "Jan 2023",
      endDate: "Apr 2023",
      highlights: [
        "Built a commodity price forecasting pipeline organizing market and location data from 4,000+ cities.",
        "Prepared SQL-ready commodity, city, and market datasets for reporting and model training.",
        "Trained ARIMA, SARIMA, and Random Forest models to forecast steel prices and identify seasonal pricing patterns.",
        "Achieved 85% forecasting accuracy and improved seasonality detection by 78% through tuning and feature analysis.",
        "Developed a Flask and Plotly dashboard for historical trends, future price views, and procurement reports.",
        "Reduced spreadsheet-based manual analysis by automating price tracking, forecasting, and reporting workflows."
      ]
    }
  ],
  projects: [
    {
      title: "Industrial Image Processing Color Separation Automation",
      subtitle: "Computer vision workflow for CMYK/TIFF prepress automation",
      description:
        "Built a web workflow for CMYK/TIFF artwork separation with channel extraction, tolerance-based masking, region exclusion, grayscale previews, color inspection, and vectorized NumPy processing.",
      technologies: ["Python", "NumPy", "OpenCV", "TIFF", "Flask", "React"],
      metrics: ["Reduced manual prepress review from 24+ hours to minutes", "Vectorized pixel-level processing"],
      featured: true
    },
    {
      title: "Cryptocurrency Market Intelligence & Prediction Platform",
      subtitle: "Forecasting and sentiment intelligence across digital assets",
      description:
        "Architected an analytics platform tracking 16,000+ cryptocurrencies through market APIs and automated ingestion pipelines, with price forecasting and real-time news sentiment.",
      technologies: ["TensorFlow", "LSTM", "Gradient Boosted Trees", "BERT", "Market APIs", "Dashboards"],
      metrics: ["16,000+ assets tracked", "Weekly percentage movement forecasting", "Real-time sentiment signals"],
      featured: true
    },
    {
      title: "Document Intelligence System",
      subtitle: "Semantic search, summarization, and QA over private documents",
      description:
        "Built document summarization, semantic search, sentiment extraction, and question-answering workflows using transformer embeddings, FAISS indexing, a Streamlit interface, and FastAPI backend services.",
      technologies: ["Python", "Hugging Face", "FAISS", "FastAPI", "Streamlit", "Docker"],
      metrics: ["Transformer embeddings", "Retrieval-augmented QA", "Dockerized backend services"],
      featured: true
    },
    {
      title: "Buyer Inquiry Intelligence Workflow",
      subtitle: "Lead scoring, NLP triage, and KPI operations",
      description:
        "Built Python and SQL workflows for buyer inquiries, product requests, quotations, seller responses, follow-ups, and support notes.",
      technologies: ["Python", "SQL", "Scikit-learn", "NLP", "Dashboards"],
      metrics: [
        "Developed lead-scoring models to identify higher-value buyer inquiries",
        "Created NLP workflows for intent, sentiment, topic grouping, and support ticket categorization",
        "Built KPI dashboards for inquiry volume, lead quality, follow-up status, response patterns, and support categories"
      ],
      featured: true
    },
    {
      title: "Commodity Price Forecasting Pipeline",
      subtitle: "Market intelligence across 4,000+ cities",
      description: "Built a commodity price forecasting pipeline organizing market and location data from 4,000+ cities.",
      technologies: ["Python", "SQL", "ARIMA", "SARIMA", "Random Forest"],
      metrics: [
        "Prepared SQL-ready commodity, city, and market datasets for reporting and model training",
        "Trained ARIMA, SARIMA, and Random Forest models to forecast steel prices and identify seasonal pricing patterns",
        "Achieved 85% forecasting accuracy and improved seasonality detection by 78% through tuning and feature analysis"
      ],
      featured: true
    }
  ],
  skillGroups: [
    { name: "Programming", items: ["Python", "SQL", "JavaScript", "C++", "Base SAS", "SAS Macros"] },
    { name: "ML & AI", items: ["Predictive Modeling", "Model Evaluation", "TensorFlow", "PyTorch", "Hugging Face Transformers"] },
    { name: "Data Systems", items: ["Pandas", "NumPy", "Spark", "PostgreSQL", "NoSQL", "FAISS", "Pinecone", "Chroma DB"] },
    { name: "NLP & GenAI", items: ["BERT", "BART", "DistilBERT", "GPT-4", "LLaMA", "Gemini", "LangChain", "LlamaIndex", "RAG"] },
    { name: "MLOps & Cloud", items: ["AWS", "EC2", "Lambda", "Azure ML", "GCP Vertex AI", "Docker", "MLflow", "CI/CD", "FastAPI"] },
    { name: "Analytics & BI", items: ["Tableau", "Power BI", "Plotly", "Streamlit", "Flask", "A/B Testing", "Experiment Design"] }
  ],
  education: [
    {
      institution: "Seneca Polytechnic",
      credential: "Post Graduate Diploma - Financial Technology",
      location: "Ontario, Canada",
      startDate: "Sep 2025",
      endDate: "Apr 2026",
      gpa: "3.5/4.0"
    },
    {
      institution: "Fleming College",
      credential: "Post Graduate Diploma - Artificial Intelligence",
      location: "Ontario, Canada",
      startDate: "Sep 2024",
      endDate: "Apr 2025",
      gpa: "3.8/4.0"
    },
    {
      institution: "Gujarat Technological University",
      credential: "Bachelor of Engineering - Information and Communication Technology",
      location: "Gujarat, India",
      startDate: "Aug 2020",
      endDate: "May 2023",
      gpa: "3.9/4.0"
    }
  ],
  publications: [
    {
      title: "Adversarial Vulnerabilities in Machine Learning: Differential Analysis of Gradient and XGBoost-Based Attack Mechanisms",
      identifier: "Paper ID: ICUIS-383",
      publishedAt: "Nov 2025",
      summary:
        "Compared gradient-based and XGBoost attack mechanisms and limitations of adversarial training for tree ensemble models."
    }
  ]
};
