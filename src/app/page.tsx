import { portfolioData } from "@/data/portfolio";
import { Sparkles, Terminal, BookOpen, Award, Layers } from "lucide-react";

export default function Home() {
  const { owner, education, projects, certifications, skills } = portfolioData;

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-cyan-500 selection:text-black">
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            HJ
          </div>
          <div>
            <h1 className="font-semibold tracking-tight text-white">{owner.name}</h1>
            <p className="text-xs text-cyan-400 font-mono">Portfolio Foundation (Phase 1 Ready)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Initialized
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full py-12 flex flex-col gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            IIT Madras BS in Data Science & Applications
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            Building autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">multi-agent AI systems</span> & practical data workflows.
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            {owner.aboutMe}
          </p>
        </div>

        {/* Phase 1 Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Education</div>
            <div className="text-base font-semibold text-white mt-1">{education[0].institution}</div>
            <div className="text-xs text-slate-400 mt-1">{education[0].degree}</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Projects Loaded</div>
            <div className="text-2xl font-bold text-white mt-1">{projects.length} Verified</div>
            <div className="text-xs text-slate-400 mt-1">Arbitr-AI & Voyager</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Certifications</div>
            <div className="text-2xl font-bold text-white mt-1">{certifications.length} Credentials</div>
            <div className="text-xs text-slate-400 mt-1">Google, Kaggle, IITG & more</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">Skill Groups</div>
            <div className="text-2xl font-bold text-white mt-1">{skills.length} Categories</div>
            <div className="text-xs text-slate-400 mt-1">AI, Code, Data, Security</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-slate-900/40 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-cyan-300">Phase 1 Complete</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Next.js, TypeScript, Tailwind, motion, animejs & shadcn foundation are configured and wired to <code className="text-cyan-400 font-mono">src/data/portfolio.ts</code>.
            </div>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
            Phase 2 Ready
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto w-full pt-8 border-t border-slate-800/60 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© 2026 {owner.name}. All verified data wired via TypeScript.</div>
        <div className="flex gap-4 font-mono">
          <a href={owner.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <a href={owner.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          <a href={`mailto:${owner.email}`} className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
