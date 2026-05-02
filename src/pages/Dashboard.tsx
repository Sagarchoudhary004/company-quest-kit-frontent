import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";
import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { Star, Building, Rocket, ArrowRight, Code2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { track, setTrack, user, appliedCompanies, favorites } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!track) navigate("/");
  }, [track, navigate]);

  if (!track) return null;

  const filtered = companies.filter((c) => c.type === track);
  const sections = [
    { key: "Dream", title: "Dream Companies", icon: Star, desc: "Top-tier brands. The dream offers.", color: "from-amber-500 to-orange-600" },
    { key: "Service", title: "Service-Based Companies", icon: Building, desc: "Stable, large-scale and reliable.", color: "from-blue-500 to-cyan-600" },
    { key: "Startup", title: "Startups", icon: Rocket, desc: "Fast-paced. High growth. Real ownership.", color: "from-violet-500 to-fuchsia-600" },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-sm text-muted-foreground mb-2">{user ? `Welcome back, ${user.name}` : "Welcome"}</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Your <span className="text-gradient">{track}</span> Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTrack(track === "Tech" ? "Non-Tech" : "Tech")}>
              {track === "Tech" ? <Briefcase className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
              Switch to {track === "Tech" ? "Non-Tech" : "Tech"}
            </Button>
            <Link to="/companies"><Button variant="hero">Browse all <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Companies", value: filtered.length },
            { label: "Applied", value: appliedCompanies.length },
            { label: "Saved", value: favorites.length },
            { label: "Categories", value: 3 },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl gradient-card border border-border/60 p-5">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="font-display font-bold text-2xl mt-1 text-gradient">{s.value}</div>
            </motion.div>
          ))}
        </div>

        {appliedCompanies.length > 0 && (
          <div className="rounded-2xl gradient-card border border-border/60 p-5 mb-10">
            <h2 className="font-display text-2xl font-bold mb-4">Applied Companies ({appliedCompanies.length})</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {appliedCompanies.map((item) => (
                <div key={item.companyId} className="rounded-xl border border-border/60 p-3 bg-background/60">
                  <div className="font-semibold">{item.companyName}</div>
                  <div className="text-sm text-muted-foreground">Status: {item.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.map((sec) => {
          const list = filtered.filter((c) => c.category === sec.key);
          if (!list.length) return null;
          return (
            <section key={sec.key} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${sec.color} grid place-items-center text-white shadow-md`}>
                  <sec.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">{sec.title}</h2>
                  <p className="text-sm text-muted-foreground">{sec.desc}</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">{list.length} companies</div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((c, i) => <CompanyCard key={c.id} company={c} index={i} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
