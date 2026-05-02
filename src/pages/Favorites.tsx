import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";
import { companies } from "@/data/companies";
import CompanyCard from "@/components/CompanyCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { favorites } = useApp();
  const list = companies.filter(c => favorites.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-destructive/10 grid place-items-center">
            <Heart className="h-6 w-6 text-destructive fill-destructive" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold">Saved Companies</h1>
            <p className="text-muted-foreground">{list.length} companies saved for later</p>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 rounded-3xl gradient-card border border-border/60">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="font-display text-xl font-semibold mb-2">No saved companies yet</h3>
            <p className="text-muted-foreground mb-6">Tap the heart on any company to save it here.</p>
            <Link to="/companies"><Button variant="hero">Browse companies</Button></Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((c, i) => <CompanyCard key={c.id} company={c} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
