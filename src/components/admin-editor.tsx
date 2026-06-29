"use client";

import { Database, LogOut, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Portfolio } from "@/types/portfolio";

type TabKey = "profile" | "siteText" | "projects" | "experience" | "skills" | "education" | "publications";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "siteText", label: "Site Text" },
  { key: "projects", label: "Projects" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "publications", label: "Publications" }
];

export function AdminEditor({
  initialPortfolio,
  messageCount
}: {
  initialPortfolio: Portfolio;
  messageCount: number;
}) {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [jsonDrafts, setJsonDrafts] = useState(() => ({
    projects: JSON.stringify(initialPortfolio.projects, null, 2),
    experience: JSON.stringify(initialPortfolio.experiences, null, 2),
    skills: JSON.stringify(initialPortfolio.skillGroups, null, 2),
    education: JSON.stringify(initialPortfolio.education, null, 2),
    publications: JSON.stringify(initialPortfolio.publications, null, 2)
  }));

  const architecture = useMemo(
    () => [
      ["Frontend", "Next.js App Router, React components, Tailwind styling, Framer Motion, Three.js hero."],
      ["API", "Route handlers validate admin writes and contact submissions with Zod."],
      ["Database", "Prisma ORM with SQLite locally; provider can be swapped to PostgreSQL for deployment."],
      ["Admin", "Password session cookie protects portfolio updates and content operations."]
    ],
    []
  );

  function updateProfile(field: keyof Portfolio["profile"], value: string) {
    setPortfolio((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [field]: value
      }
    }));
  }

  function updateSiteText(field: string, value: string) {
    setPortfolio((current) => ({
      ...current,
      siteText: {
        ...current.siteText,
        [field]: value
      }
    }));
  }

  function applyJson(tab: Exclude<TabKey, "profile" | "siteText">) {
    try {
      const parsed = JSON.parse(jsonDrafts[tab]);
      setPortfolio((current) => ({
        ...current,
        projects: tab === "projects" ? parsed : current.projects,
        experiences: tab === "experience" ? parsed : current.experiences,
        skillGroups: tab === "skills" ? parsed : current.skillGroups,
        education: tab === "education" ? parsed : current.education,
        publications: tab === "publications" ? parsed : current.publications
      }));
      setStatus("idle");
      setErrorMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("The JSON in this tab is not valid. Fix the syntax, then click Apply JSON again.");
    }
  }

  async function savePortfolio() {
    setStatus("saving");
    setErrorMessage("");
    const response = await fetch("/api/admin/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio)
    });

    setStatus(response.ok ? "saved" : "error");
    if (response.ok) {
      router.refresh();
    } else {
      const body = await response.json().catch(() => null);
      const fieldErrors = body?.issues?.fieldErrors
        ? Object.entries(body.issues.fieldErrors)
            .flatMap(([field, messages]) => (Array.isArray(messages) ? messages.map((message) => `${field}: ${message}`) : []))
            .join(" ")
        : "";
      setErrorMessage(fieldErrors || body?.error || "Could not apply changes. Check required fields.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.28em] text-mint">
              Back to portfolio
            </Link>
            <h1 className="mt-3 text-4xl font-semibold text-white">Admin panel</h1>
            <p className="mt-2 text-sm text-white/58">Manage content, inspect architecture, and keep the portfolio database current.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={savePortfolio}
              disabled={status === "saving"}
              className="inline-flex h-11 items-center gap-2 bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-signal disabled:opacity-60"
            >
              <Save size={17} />
              {status === "saving" ? "Saving" : "Save"}
            </button>
            <button onClick={logout} className="inline-flex h-11 items-center gap-2 border border-white/12 px-4 text-sm text-white/80 hover:border-coral hover:text-coral">
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        {status === "saved" && <p className="mb-5 border border-mint/40 bg-mint/10 p-3 text-sm text-mint">Portfolio saved to the database.</p>}
        {status === "error" && (
          <p className="mb-5 border border-coral/40 bg-coral/10 p-3 text-sm text-coral">
            {errorMessage || "Could not apply changes. Check JSON format and required fields."}
          </p>
        )}

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="glass p-4">
            <ShieldCheck className="mb-3 text-mint" size={22} />
            <p className="text-2xl font-semibold text-white">Protected</p>
            <p className="text-sm text-white/52">Password session</p>
          </div>
          <div className="glass p-4">
            <Database className="mb-3 text-amber" size={22} />
            <p className="text-2xl font-semibold text-white">{portfolio.projects.length}</p>
            <p className="text-sm text-white/52">Projects</p>
          </div>
          <div className="glass p-4">
            <Database className="mb-3 text-signal" size={22} />
            <p className="text-2xl font-semibold text-white">{portfolio.skillGroups.length}</p>
            <p className="text-sm text-white/52">Skill groups</p>
          </div>
          <div className="glass p-4">
            <Database className="mb-3 text-coral" size={22} />
            <p className="text-2xl font-semibold text-white">{messageCount}</p>
            <p className="text-sm text-white/52">Contact messages</p>
          </div>
        </section>

        <section className="mb-6 grid gap-4 lg:grid-cols-4">
          {architecture.map(([title, description]) => (
            <div key={title} className="border border-white/10 bg-white/[0.035] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">{title}</p>
              <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="glass h-fit p-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`mb-2 flex h-11 w-full items-center px-3 text-left text-sm transition ${
                  activeTab === tab.key ? "bg-mint text-ink" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          <section className="glass min-h-[520px] p-5">
            {activeTab === "profile" ? (
              <div className="grid gap-4">
                {(["name", "headline", "location", "email", "phone", "summary", "githubUrl", "linkedinUrl", "resumeUrl"] as const).map((field) => (
                  <label key={field} className="grid gap-2 text-sm text-white/70">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/42">{field}</span>
                    {field === "summary" ? (
                      <textarea
                        value={portfolio.profile[field] ?? ""}
                        onChange={(event) => updateProfile(field, event.target.value)}
                        className="min-h-28 border border-white/10 bg-ink/80 p-3 text-white outline-none focus:border-mint/70"
                      />
                    ) : (
                      <input
                        value={portfolio.profile[field] ?? ""}
                        onChange={(event) => updateProfile(field, event.target.value)}
                        className="h-11 border border-white/10 bg-ink/80 px-3 text-white outline-none focus:border-mint/70"
                      />
                    )}
                  </label>
                ))}
              </div>
            ) : activeTab === "siteText" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(portfolio.siteText).map(([field, value]) => {
                  const longField = field.toLowerCase().includes("intro") || field.toLowerCase().includes("title");
                  return (
                    <label key={field} className="grid gap-2 text-sm text-white/70">
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/42">{field}</span>
                      {longField ? (
                        <textarea
                          value={value}
                          onChange={(event) => updateSiteText(field, event.target.value)}
                          className="min-h-24 rounded-md border border-white/10 bg-ink/80 p-3 text-white outline-none focus:border-mint/70"
                        />
                      ) : (
                        <input
                          value={value}
                          onChange={(event) => updateSiteText(field, event.target.value)}
                          className="h-11 rounded-md border border-white/10 bg-ink/80 px-3 text-white outline-none focus:border-mint/70"
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            ) : (
              <JsonCollectionEditor
                value={jsonDrafts[activeTab]}
                onChange={(value) => setJsonDrafts((current) => ({ ...current, [activeTab]: value }))}
                onApply={() => applyJson(activeTab)}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function JsonCollectionEditor({
  value,
  onChange,
  onApply
}: {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm leading-6 text-white/58">
          Edit this collection as JSON. Apply changes, then save the full portfolio to persist it.
        </p>
        <button onClick={onApply} className="h-10 bg-amber px-4 text-sm font-semibold text-ink hover:bg-mint">
          Apply JSON
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className="thin-scrollbar min-h-[520px] resize-y border border-white/10 bg-ink/90 p-4 font-mono text-xs leading-6 text-white outline-none focus:border-mint/70"
      />
    </div>
  );
}
