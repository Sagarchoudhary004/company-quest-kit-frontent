import { Heart, MapPin, Briefcase, IndianRupee, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/data/companies";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";

const CompanyCard = ({ company, index = 0 }: { company: Company; index?: number }) => {
  const { favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(company.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative rounded-2xl gradient-card border border-border/60 p-6 hover:shadow-elegant hover:-translate-y-1 transition-smooth overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full gradient-primary opacity-0 group-hover:opacity-10 blur-2xl transition-smooth" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl gradient-soft border border-border grid place-items-center text-2xl">
            {company.logo}
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg leading-tight">{company.name}</h3>
            <span className="text-xs text-muted-foreground">{company.category} · {company.type}</span>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(company.id)}
          className="p-2 rounded-lg hover:bg-muted transition-smooth"
          aria-label="Toggle favorite"
        >
          <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{company.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {company.skills.slice(0, 4).map(s => (
          <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">{s}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
        <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {company.role}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {company.location.split(" / ")[0]}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/60">
        <div>
          <div className="text-xs text-muted-foreground">Package</div>
          <div className="font-display font-bold text-xl text-gradient inline-flex items-center">
            <IndianRupee className="h-4 w-4" />{company.package} LPA
          </div>
        </div>
        <Link to={`/companies/${company.id}`}>
          <Button variant="hero" size="sm">
            Apply <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
