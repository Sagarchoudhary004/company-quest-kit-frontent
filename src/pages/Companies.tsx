import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { companies, roles } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Company } from "@/data/companies";
type ApiCompany = {
  _id: string;
  name: string;
  type: "Tech" | "Non-Tech";
  role: string;
  package: number;
  skillsRequired?: string[];
  description?: string;
  selectionProcess?: string[];
  eligibilityCriteria?: string;
  location?: string;
};

const Companies = () => {
  const [params, setParams] = useSearchParams();
  const initialType = (params.get("type") as "Tech" | "Non-Tech" | null) || "All";

  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>(initialType);
  const [role, setRole] = useState<string>("All");
  const [skill, setSkill] = useState<string>("");
  const [pkg, setPkg] = useState<number[]>([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [companyList, setCompanyList] = useState<Company[]>(companies);

  useEffect(() => {
    setType((params.get("type") as string) || "All");
  }, [params]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await fetch("/api/v1/companies?limit=100");
        const data = await res.json();
        const mapped = ((data?.data?.companies || []) as ApiCompany[]).map((c): Company => ({
          id: c._id,
          name: c.name,
          logo: "🏢",
          category: "Dream",
          type: c.type,
          role: c.role,
          package: c.package,
          skills: c.skillsRequired || [],
          description: c.description || `${c.name} is hiring for ${c.role}`,
          rounds: c.selectionProcess || [],
          process: (c.selectionProcess || []).join(" -> "),
          tips: ["Research company interview patterns", "Practice role-specific questions"],
          eligibility: c.eligibilityCriteria || "As per company guidelines",
          location: c.location || "India",
        }));
        if (mapped.length > 0) setCompanyList(mapped);
      } catch {
        // Keep local fallback data if backend is unreachable.
      }
    };
    loadCompanies();
  }, []);

  const allSkills = useMemo(() => Array.from(new Set(companyList.flatMap(c => c.skills))).sort(), [companyList]);

  const filtered = useMemo(() => {
    return companyList.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (type !== "All" && c.type !== type) return false;
      if (role !== "All" && c.role !== role) return false;
      if (skill && !c.skills.includes(skill)) return false;
      if (c.package < pkg[0] || c.package > pkg[1]) return false;
      return true;
    });
  }, [companyList, search, type, role, skill, pkg]);

  const clear = () => {
    setSearch(""); setType("All"); setRole("All"); setSkill(""); setPkg([0, 50]);
    setParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">All Companies</h1>
          <p className="text-muted-foreground">Search, filter and discover your next opportunity.</p>
        </div>

        {/* Search + filter toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search companies, descriptions..." className="pl-11 h-12 rounded-xl" />
          </div>
          <Button variant="outline" size="lg" onClick={() => setShowFilters(s => !s)} className="md:w-auto">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          {(search || type !== "All" || role !== "All" || skill || pkg[0] !== 0 || pkg[1] !== 50) && (
            <Button variant="ghost" size="lg" onClick={clear}><X className="h-4 w-4" /> Clear</Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="rounded-2xl gradient-card border border-border/60 p-5 mb-6 grid md:grid-cols-4 gap-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Non-Tech">Non-Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Skill</label>
              <Select value={skill || "all"} onValueChange={(v) => setSkill(v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Any skill" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">Any skill</SelectItem>
                  {allSkills.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Package: ₹{pkg[0]} – ₹{pkg[1]} LPA
              </label>
              <Slider value={pkg} onValueChange={setPkg} min={0} max={50} step={1} className="mt-3" />
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground mb-5">{filtered.length} companies found</div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-semibold mb-2">No matches</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters.</p>
            <Button variant="hero" onClick={clear}>Reset filters</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => <CompanyCard key={c.id} company={c} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
