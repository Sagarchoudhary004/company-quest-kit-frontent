import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Briefcase, Sparkles, ArrowRight, TrendingUp, Users, Target, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const Landing = () => {
  const { setTrack } = useApp();

  const stats = [
    { icon: Building2, label: "500+ Companies", value: "500+" },
    { icon: Users, label: "10K+ Students", value: "10K+" },
    { icon: TrendingUp, label: "Avg Package", value: "₹14 LPA" },
    { icon: Target, label: "Placement Rate", value: "94%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

        <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Your gateway to dream placements</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Placement <span className="text-gradient">Preparation</span><br />Portal
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Discover top tech and non-tech companies, master interview prep,
              and land the offer you've been working toward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/companies?type=Tech" onClick={() => setTrack("Tech")}>
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <Code2 className="h-5 w-5" /> Explore Tech Companies
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/companies?type=Non-Tech" onClick={() => setTrack("Non-Tech")}>
                <Button variant="glass" size="xl" className="w-full sm:w-auto group">
                  <Briefcase className="h-5 w-5" /> Explore Non-Tech Companies
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center hover:shadow-elegant transition-smooth">
                <s.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-display font-bold text-2xl">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Path selection */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Choose Your Path</h2>
          <p className="text-muted-foreground">Two worlds. Endless possibilities. Pick yours.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { type: "Tech", icon: Code2, title: "Tech Track", desc: "Software engineering, data, mobile and product roles at top product and service companies.",
              tags: ["Frontend", "Backend", "ML", "DevOps"], gradient: "from-blue-500 to-indigo-600" },
            { type: "Non-Tech", icon: Briefcase, title: "Non-Tech Track", desc: "Consulting, finance, marketing, HR and operations roles at MNCs and startups.",
              tags: ["Consulting", "Marketing", "Finance", "HR"], gradient: "from-violet-500 to-fuchsia-600" },
          ].map((p) => (
            <Link key={p.type} to={`/companies?type=${p.type}`} onClick={() => setTrack(p.type as "Tech" | "Non-Tech")}>
              <motion.div whileHover={{ y: -6 }}
                className="group relative h-full rounded-3xl gradient-card border border-border/60 p-8 overflow-hidden cursor-pointer hover:shadow-elegant transition-smooth">
                <div className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-smooth`} />
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${p.gradient} grid place-items-center text-white shadow-lg mb-5`}>
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-muted-foreground mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted">{t}</span>)}
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-3 gap-2 transition-all">
                  Explore companies <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          Built with ❤️ for college students · PlacePrep © 2026
        </div>
      </footer>
    </div>
  );
};

export default Landing;
