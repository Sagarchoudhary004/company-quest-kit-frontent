import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { companies } from "@/data/companies";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, Heart, IndianRupee, MapPin, Briefcase, CheckCircle2, ListChecks, Lightbulb, GraduationCap, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, applyToCompany, appliedCompanies } = useApp();
  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Company not found</h1>
          <Link to="/companies"><Button variant="hero">Back to companies</Button></Link>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(company.id);
  const isApplied = appliedCompanies.some((item) => item.companyId === company.id);

  const handleApply = async () => {
    if (isApplied) return;
    const result = await applyToCompany({ id: company.id, name: company.name });
    toast({
      title: result.ok ? "Application submitted!" : "Apply failed",
      description: result.message,
      variant: result.ok ? "default" : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl gradient-hero text-primary-foreground p-8 md:p-12 mb-8 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur grid place-items-center text-4xl border border-white/20">{company.logo}</div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-1">{company.name}</h1>
                <div className="flex flex-wrap gap-3 text-sm opacity-90">
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{company.role}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{company.location}</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-md">{company.category}</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-md">{company.type}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-right">
                <div className="text-xs opacity-80">Package</div>
                <div className="font-display font-bold text-3xl inline-flex items-center"><IndianRupee className="h-6 w-6" />{company.package} LPA</div>
              </div>
              <div className="flex gap-2">
                <Button variant="glass" size="lg" onClick={() => toggleFavorite(company.id)}>
                  <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                  {isFav ? "Saved" : "Save"}
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleApply} disabled={isApplied}>
                  <Send className="h-4 w-4" /> {isApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-lg text-muted-foreground max-w-3xl mb-10">{company.description}</p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section icon={ListChecks} title="Selection Process" color="from-blue-500 to-indigo-600">
              <p className="text-muted-foreground">{company.process}</p>
            </Section>

            <Section icon={CheckCircle2} title="Interview Rounds" color="from-violet-500 to-purple-600">
              <ol className="space-y-3">
                {company.rounds.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="h-7 w-7 shrink-0 rounded-full gradient-primary text-primary-foreground grid place-items-center text-xs font-bold">{i + 1}</div>
                    <span className="font-medium">{r}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section icon={Lightbulb} title="Preparation Tips" color="from-amber-500 to-orange-600">
              <ul className="space-y-2">
                {company.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success mt-1 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="space-y-6">
            <Section icon={GraduationCap} title="Eligibility" color="from-emerald-500 to-teal-600">
              <p className="text-muted-foreground">{company.eligibility}</p>
            </Section>

            <Section icon={Briefcase} title="Required Skills" color="from-fuchsia-500 to-pink-600">
              <div className="flex flex-wrap gap-2">
                {company.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">{s}</span>
                ))}
              </div>
            </Section>

            <div className="rounded-2xl gradient-primary p-6 text-primary-foreground">
              <h3 className="font-display font-bold text-xl mb-2">Ready to apply?</h3>
              <p className="text-sm opacity-90 mb-4">Submit your interest and get prep resources sent to your email.</p>
              <Button variant="glass" className="w-full bg-white/20 text-white hover:bg-white/30 border-white/30" onClick={handleApply} disabled={isApplied}>
                <Send className="h-4 w-4" /> {isApplied ? `Applied to ${company.name}` : `Apply to ${company.name}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) => (
  <div className="rounded-2xl gradient-card border border-border/60 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${color} grid place-items-center text-white`}>
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="font-display font-semibold text-lg">{title}</h2>
    </div>
    {children}
  </div>
);

export default CompanyDetail;
