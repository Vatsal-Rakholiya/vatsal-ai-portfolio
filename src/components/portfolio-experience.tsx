"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Database, Github, Linkedin, Mail, MapPin, ServerCog } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatedGroup } from "@/components/animated-group";
import { ContactForm } from "@/components/contact-form";
import { MotionFooter } from "@/components/motion-footer";
import { ParticleField } from "@/components/particle-field";
import { ReactiveCursor } from "@/components/reactive-cursor";
import { ScrollSerenityEffects } from "@/components/scroll-serenity-effects";
import { StartReveal } from "@/components/start-reveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { Portfolio } from "@/types/portfolio";

const NeuralCore = dynamic(() => import("@/components/neural-core").then((mod) => mod.NeuralCore), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full animate-pulse rounded-lg bg-white/[0.04] md:h-[620px]" />
});

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function removeJunior(value: string) {
  return value.replace(/\bJunior\s+/gi, "").trim();
}

export function PortfolioExperience({ portfolio }: { portfolio: Portfolio }) {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const featuredProjects = portfolio.projects.filter((project) => project.featured);
  const projectCards = featuredProjects;
  const text = portfolio.siteText;
  const headline = removeJunior(portfolio.profile.headline);
  const timelineTitle = text.timelineTitle.replace(/\beducation\b/g, "Education");

  return (
    <main className="portfolio-shell relative z-10 overflow-hidden">
      <StartReveal />
      <ParticleField />
      <ScrollSerenityEffects />
      <ReactiveCursor />
      <motion.div className="fixed left-0 top-0 z-50 h-1 bg-mint" style={{ width: progressWidth }} />

      <section id="top" className="relative flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center justify-items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10">
            <AnimatedGroup>
              <div className="mb-5 h-[7.5rem] w-[7.5rem] overflow-hidden rounded-full bg-ink/20 shadow-[0_0_54px_rgba(71,245,180,0.2)]">
                <Image
                  src="/images/vatsal-avatar.png"
                  alt="Vatsal Rakholiya"
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                {portfolio.profile.name}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-xl leading-8 text-mint/90">
                {headline}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/58">
                {portfolio.profile.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex h-12 items-center gap-2 rounded-md bg-mint px-5 text-sm font-semibold text-ink transition hover:bg-signal">
                  {text.heroPrimaryCta}
                  <ArrowUpRight size={17} />
                </a>
                <a
                  href={`mailto:${portfolio.profile.email}`}
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-white/14 px-5 text-sm font-semibold text-white transition hover:border-mint/70 hover:text-mint"
                >
                  <Mail size={17} />
                  {text.heroSecondaryCta}
                </a>
                <a
                  href="https://www.linkedin.com/in/vatsalrakholiya/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-mint/24 bg-white/[0.025] px-5 text-sm font-semibold text-white transition hover:border-mint/80 hover:bg-mint/10 hover:text-mint"
                >
                  <Linkedin size={17} />
                  LinkedIn
                </a>
              </div>
            </AnimatedGroup>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/58"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-amber" />
                {portfolio.profile.location}
              </span>
              {portfolio.profile.linkedinUrl && (
                <a href={portfolio.profile.linkedinUrl} className="inline-flex items-center gap-2 hover:text-mint">
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              )}
              {portfolio.profile.githubUrl && (
                <a href={portfolio.profile.githubUrl} className="inline-flex items-center gap-2 hover:text-mint">
                  <Github size={16} />
                  GitHub
                </a>
              )}
            </motion.div>
          </div>

          <div className="relative mx-auto min-h-[290px] w-full max-w-[22rem] overflow-visible sm:max-w-[28rem] md:min-h-[440px] md:max-w-[36rem] lg:min-h-[620px] lg:max-w-none">
            <div className="absolute inset-x-8 top-1/2 h-40 -translate-y-1/2 rounded-full bg-mint/7 blur-3xl md:h-48" />
            <NeuralCore />
          </div>
        </div>
      </section>

      <section className="px-4 py-9 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[28px] border border-white/[0.06] bg-white/[0.018] px-5 py-5 backdrop-blur-sm md:grid-cols-4">
          {[
            [text.statOneValue, text.statOneLabel],
            [text.statTwoValue, text.statTwoLabel],
            [text.statThreeValue, text.statThreeLabel],
            [text.statFourValue, text.statFourLabel]
          ].map(([value, label], index) => (
            <div key={label} className="rounded-[22px] px-4 py-3 transition duration-300 hover:bg-white/[0.035]">
              <p className="text-3xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-sm text-white/56">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">{text.projectsKicker}</p>
            <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{text.projectsTitle}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/58">
            {text.projectsIntro}
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {projectCards.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlowCard glowColor={index === 0 ? "green" : index === 1 ? "blue" : "orange"} className="group min-h-[430px] p-5 transition hover:-translate-y-1">
                <article className="relative z-10">
                  <div className="terminal-grid mb-5 flex h-40 items-center justify-center border border-white/10 bg-ink/74">
                    <div className="relative h-24 w-24">
                      <div className="absolute inset-0 rounded-lg border border-mint/60" />
                      <div className="absolute inset-4 rotate-45 rounded-md border border-signal/60" />
                      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-amber shadow-glow" />
                    </div>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">0{index + 1} / featured</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{project.title}</h3>
                  {project.subtitle && <p className="mt-2 text-sm text-mint/84">{project.subtitle}</p>}
                  <p className="mt-4 text-sm leading-6 text-white/62">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-white/62">
                    {project.metrics.map((metric) => (
                      <li key={metric} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 bg-coral" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </GlowCard>
            </motion.div>
          ))}
          {portfolio.publications.map((publication, index) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (projectCards.length + index) * 0.08 }}
            >
              <GlowCard glowColor="blue" className="group min-h-[430px] p-5 transition hover:-translate-y-1">
                <article className="relative z-10">
                  <div className="terminal-grid mb-5 flex h-40 items-center justify-center border border-white/10 bg-ink/74">
                    <div className="relative h-24 w-24">
                      <div className="absolute inset-0 rounded-2xl border border-signal/60" />
                      <div className="absolute inset-5 rounded-full border border-mint/70" />
                      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-glow" />
                    </div>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                    0{projectCards.length + index + 1} / publication
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{publication.title}</h3>
                  {publication.identifier && <p className="mt-2 text-sm text-mint/84">{publication.identifier}</p>}
                  <p className="mt-4 text-sm leading-6 text-white/62">{publication.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70">
                      {publication.publishedAt}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70">
                      Research
                    </span>
                  </div>
                </article>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section id="systems" className="bg-white/[0.035] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">{text.systemsKicker}</p>
            <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{text.systemsTitle}</h2>
            <p className="mt-5 text-base leading-7 text-white/58">
              {text.systemsIntro}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {portfolio.skillGroups.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <GlowCard glowColor={index % 3 === 0 ? "green" : index % 3 === 1 ? "blue" : "orange"} className="p-5">
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      {index % 3 === 0 && <BrainCircuit className="text-mint" size={21} />}
                      {index % 3 === 1 && <Database className="text-amber" size={21} />}
                      {index % 3 === 2 && <ServerCog className="text-coral" size={21} />}
                      <h3 className="font-semibold text-white">{group.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded bg-white/[0.06] px-2.5 py-1 text-xs text-white/66">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">{text.timelineKicker}</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{timelineTitle}</h2>
        </div>
        <div className="space-y-5">
          {portfolio.experiences.map((experience, index) => (
            <GlowCard key={`${experience.company}-${experience.role}`} glowColor={index % 2 === 0 ? "green" : "blue"} className="p-5">
              <article className="relative z-10 border-l border-mint/45 pl-5">
                <p className="text-sm text-amber">
                  {experience.startDate} - {experience.endDate}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{removeJunior(experience.role)}</h3>
                <p className="text-sm text-white/58">
                  {experience.company} / {experience.location}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/62">
                  {experience.highlights.slice(0, 4).map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              </article>
            </GlowCard>
          ))}
          {portfolio.education.map((item, index) => (
            <GlowCard key={item.credential} glowColor={index % 2 === 0 ? "orange" : "blue"} className="p-5">
              <article className="relative z-10">
                <p className="text-sm text-signal">
                  {item.startDate} - {item.endDate}
                </p>
                <h3 className="mt-2 font-semibold text-white">{item.credential}</h3>
                <p className="text-sm text-white/58">
                  {item.institution}, {item.location} {item.gpa ? `/ GPA ${item.gpa}` : ""}
                </p>
              </article>
            </GlowCard>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mint">{text.contactKicker}</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">{text.contactTitle}</h2>
          <p className="mt-5 text-base leading-7 text-white/58">
            {text.contactIntro}
          </p>
          <a href={`mailto:${portfolio.profile.email}`} className="mt-6 inline-flex items-center gap-2 text-mint hover:text-signal">
            <Mail size={18} />
            {portfolio.profile.email}
          </a>
        </div>
        <GlowCard glowColor="green" className="p-5">
          <div className="relative z-10">
            <ContactForm />
          </div>
        </GlowCard>
      </section>

      <MotionFooter portfolio={portfolio} />
    </main>
  );
}
