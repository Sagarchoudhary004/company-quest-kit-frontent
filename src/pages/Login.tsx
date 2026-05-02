import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginRole, setLoginRole] = useState<"student" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pwd || (mode === "signup" && !name)) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    try {
      const endpoint = mode === "login" ? "/api/v1/auth/login" : "/api/v1/auth/register";
      const payload =
        mode === "login"
          ? { email, password: pwd }
          : { name, email, password: pwd, role: loginRole, preference: "tech" };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || "Authentication failed");

      login(data.data.user, data.data.token);
      const role = data.data.user?.role || loginRole;
      toast({ title: mode === "login" ? "Welcome back!" : "Account created!", description: role === "admin" ? "Admin login successful" : "Student login successful" });
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast({ title: "Auth failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center gradient-hero text-primary-foreground p-12 overflow-hidden">
        <div className="relative max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8"><GraduationCap className="h-6 w-6" /><span className="font-display font-bold text-xl">PlacePrep</span></Link>
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">Land your dream offer.</h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold mb-2">{mode === "login" ? "Sign in" : "Create account"}</h1>

          <div className="flex gap-2 mb-4">
            <Button type="button" variant={loginRole === "student" ? "hero" : "outline"} onClick={() => setLoginRole("student")}>Student</Button>
            <Button type="button" variant={loginRole === "admin" ? "hero" : "outline"} onClick={() => setLoginRole("admin")}>Admin</Button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && <Field icon={User} label="Full name" value={name} onChange={setName} placeholder="Aarav Sharma" />}
            <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@college.edu" />
            <Field icon={Lock} label="Password" type="password" value={pwd} onChange={setPwd} placeholder="********" />
            <Button type="submit" variant="hero" size="lg" className="w-full mt-6">{mode === "login" ? `${loginRole} Sign In` : `Create ${loginRole} account`} <ArrowRight className="h-4 w-4" /></Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

type FieldProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
};

const Field = ({ icon: Icon, label, value, onChange, placeholder, type = "text" }: FieldProps) => (
  <div>
    <Label className="text-sm mb-1.5 block">{label}</Label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input value={value} onChange={(e) => onChange(e.target.value)} type={type} placeholder={placeholder} className="pl-10 h-11" />
    </div>
  </div>
);

export default Login;
