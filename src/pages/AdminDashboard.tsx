import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type Applicant = { name: string; email: string; status: string };
type OverviewItem = {
  companyId: string;
  companyName: string;
  type: string;
  role: string;
  totalApplicants: number;
  applicants: Applicant[];
};

const AdminDashboard = () => {
  const { user, token } = useApp();
  const navigate = useNavigate();
  const [overview, setOverview] = useState<OverviewItem[]>([]);
  const [totals, setTotals] = useState({ totalStudents: 0, totalCompanies: 0, totalApplications: 0 });
  const [form, setForm] = useState({ name: "", type: "Tech", package: "", role: "", skillsRequired: "", selectionProcess: "", eligibilityCriteria: "" });

  const headers = useMemo(() => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }), [token]);

  const applicantsTable = useMemo(
    () =>
      overview.flatMap((company) =>
        company.applicants.map((a) => ({
          companyName: company.companyName,
          studentName: a.name,
          studentEmail: a.email,
          status: a.status,
        }))
      ),
    [overview]
  );

  const loadOverview = async () => {
    try {
      const res = await fetch("/api/v1/admin/overview", { headers });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to load admin data");
      setOverview(data.data.companyApplications || []);
      setTotals({
        totalStudents: data.data.totalStudents || 0,
        totalCompanies: data.data.totalCompanies || 0,
        totalApplications: data.data.totalApplications || 0,
      });
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!user) return void navigate("/login");
    if (user.role !== "admin") return void navigate("/dashboard");
    loadOverview();
  }, [user, token]);

  const onAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        type: form.type,
        package: Number(form.package),
        role: form.role,
        skillsRequired: form.skillsRequired.split(",").map((x) => x.trim()).filter(Boolean),
        selectionProcess: form.selectionProcess.split(",").map((x) => x.trim()).filter(Boolean),
        eligibilityCriteria: form.eligibilityCriteria,
      };
      const res = await fetch("/api/v1/companies", { method: "POST", headers, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || "Could not create company");
      toast({ title: "Company added", description: `${form.name} created successfully` });
      setForm({ name: "", type: "Tech", package: "", role: "", skillsRequired: "", selectionProcess: "", eligibilityCriteria: "" });
      loadOverview();
    } catch (err) {
      toast({ title: "Create failed", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10 space-y-8">
        <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4">Students: <b>{totals.totalStudents}</b></div>
          <div className="rounded-xl border p-4">Companies: <b>{totals.totalCompanies}</b></div>
          <div className="rounded-xl border p-4">Applications: <b>{totals.totalApplications}</b></div>
        </div>

        <form onSubmit={onAddCompany} className="rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold text-xl">Add Company</h2>
          <Input placeholder="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid md:grid-cols-3 gap-3">
            <select className="h-10 rounded-md border px-3 bg-background" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="Tech">Tech</option><option value="Non-Tech">Non-Tech</option>
            </select>
            <Input placeholder="Package" value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} />
            <Input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <Input placeholder="Skills (comma separated)" value={form.skillsRequired} onChange={(e) => setForm({ ...form, skillsRequired: e.target.value })} />
          <Input placeholder="Selection Process (comma separated)" value={form.selectionProcess} onChange={(e) => setForm({ ...form, selectionProcess: e.target.value })} />
          <Input placeholder="Eligibility Criteria" value={form.eligibilityCriteria} onChange={(e) => setForm({ ...form, eligibilityCriteria: e.target.value })} />
          <Button type="submit">Add Company</Button>
        </form>

        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Applicants by Company</h2>
          {overview.length === 0 && <div className="text-muted-foreground">No applications yet.</div>}
          {overview.map((item) => (
            <div key={item.companyId} className="rounded-xl border p-4">
              <div className="font-semibold">{item.companyName} ({item.totalApplicants})</div>
              <div className="text-sm text-muted-foreground">{item.type} - {item.role}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-xl">Student Applications Table</h2>
          <div className="rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3">Student</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Company</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicantsTable.length === 0 && (
                  <tr><td className="p-3 text-muted-foreground" colSpan={4}>No applications found.</td></tr>
                )}
                {applicantsTable.map((row, i) => (
                  <tr key={`${row.studentEmail}-${row.companyName}-${i}`} className="border-t">
                    <td className="p-3">{row.studentName}</td>
                    <td className="p-3">{row.studentEmail}</td>
                    <td className="p-3">{row.companyName}</td>
                    <td className="p-3">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
