import { useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialApplications = [
  {
    id: "APP-001",
    name: "Dr. Lena Hoffman",
    email: "lena.hoffman@mail.com",
    phone: "+1 (555) 310-2244",
    specialty: "Cardiologist",
    department: "Cardiology",
    experience: "12 yrs",
    qualification: "MD, FACC – Johns Hopkins University",
    hospital: "City Heart Institute",
    licenseNo: "MED-443821",
    appliedDate: "Mar 01, 2026",
    status: "pending",
    initials: "LH",
    avatarBg: "bg-emerald-100 text-emerald-700",
    bio: "Specialist in interventional cardiology with over 12 years of clinical experience managing complex cardiac conditions.",
    documents: ["Medical License", "FACC Certificate", "ID Proof"],
  },
  {
    id: "APP-002",
    name: "Dr. Ravi Nair",
    email: "ravi.nair@mail.com",
    phone: "+1 (555) 422-9901",
    specialty: "Neurologist",
    department: "Neurology",
    experience: "8 yrs",
    qualification: "MD, DM Neurology – AIIMS Delhi",
    hospital: "NeuroPlus Hospital",
    licenseNo: "MED-882310",
    appliedDate: "Mar 02, 2026",
    status: "pending",
    initials: "RN",
    avatarBg: "bg-teal-100 text-teal-700",
    bio: "Experienced neurologist focused on epilepsy, stroke rehabilitation, and neurodegenerative disease management.",
    documents: ["Medical License", "DM Certificate", "ID Proof"],
  },
  {
    id: "APP-003",
    name: "Dr. Fatima Al-Rashid",
    email: "fatima.alrashid@mail.com",
    phone: "+1 (555) 234-0087",
    specialty: "Pediatrician",
    department: "Pediatrics",
    experience: "6 yrs",
    qualification: "MBBS, DCH – University of Cairo",
    hospital: "Little Stars Children's Clinic",
    licenseNo: "MED-220934",
    appliedDate: "Mar 03, 2026",
    status: "pending",
    initials: "FA",
    avatarBg: "bg-green-100 text-green-700",
    bio: "Dedicated pediatrician with expertise in neonatal care, childhood immunization, and adolescent health.",
    documents: ["Medical License", "DCH Certificate", "ID Proof"],
  },
  {
    id: "APP-004",
    name: "Dr. Tomás Reyes",
    email: "tomas.reyes@mail.com",
    phone: "+1 (555) 512-3374",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: "15 yrs",
    qualification: "MD, MS Orthopedics – Universidad de Barcelona",
    hospital: "BoneWell Surgical Center",
    licenseNo: "MED-678120",
    appliedDate: "Mar 04, 2026",
    status: "approved",
    initials: "TR",
    avatarBg: "bg-lime-100 text-lime-700",
    bio: "Senior orthopedic surgeon specializing in joint replacement and complex spine surgeries with an international fellowship.",
    documents: ["Medical License", "MS Certificate", "Fellowship Proof"],
  },
  {
    id: "APP-005",
    name: "Dr. Yuki Tanaka",
    email: "yuki.tanaka@mail.com",
    phone: "+1 (555) 788-4422",
    specialty: "Dermatologist",
    department: "Dermatology",
    experience: "9 yrs",
    qualification: "MD, DVD – Osaka University",
    hospital: "SkinFirst Dermatology",
    licenseNo: "MED-334572",
    appliedDate: "Mar 04, 2026",
    status: "rejected",
    initials: "YT",
    avatarBg: "bg-rose-100 text-rose-700",
    bio: "Dermatologist with extensive experience in cosmetic and medical dermatology including laser therapy and skin oncology.",
    documents: ["Medical License", "DVD Certificate"],
    rejectReason: "Incomplete document submission — missing ID proof.",
  },
  {
    id: "APP-006",
    name: "Dr. Chiamaka Eze",
    email: "chiamaka.eze@mail.com",
    phone: "+1 (555) 901-6630",
    specialty: "Endocrinologist",
    department: "Endocrinology",
    experience: "7 yrs",
    qualification: "MBBS, MD Internal Medicine – University of Lagos",
    hospital: "MetaBalance Clinic",
    licenseNo: "MED-119045",
    appliedDate: "Mar 05, 2026",
    status: "pending",
    initials: "CE",
    avatarBg: "bg-emerald-100 text-emerald-700",
    bio: "Endocrinologist with research experience in diabetes mellitus, thyroid disorders, and metabolic syndrome.",
    documents: ["Medical License", "MD Certificate", "ID Proof"],
  },
  {
    id: "APP-007",
    name: "Dr. Patrick Osei",
    email: "patrick.osei@mail.com",
    phone: "+1 (555) 667-8812",
    specialty: "Radiologist",
    department: "Radiology",
    experience: "11 yrs",
    qualification: "MBBS, DMRD – University of Ghana",
    hospital: "ClearView Imaging Center",
    licenseNo: "MED-550387",
    appliedDate: "Mar 05, 2026",
    status: "pending",
    initials: "PO",
    avatarBg: "bg-teal-100 text-teal-700",
    bio: "Diagnostic radiologist skilled in MRI, CT interpretation, and interventional radiology procedures.",
    documents: ["Medical License", "DMRD Certificate", "ID Proof"],
  },
];

const navLinks = [
  { label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: false },
  { label: "Doctor Approvals", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", active: true, badge: 5 },
  { label: "Doctors", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", active: false },
  { label: "Patients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", active: false },
  { label: "Appointments", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: false },
  { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z", active: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <Badge variant="outline" className={`capitalize text-xs font-semibold px-2.5 py-0.5 ${map[status]}`}>
      {status === "pending" && "● "}
      {status}
    </Badge>
  );
}

// ─── Detail Dialog ────────────────────────────────────────────────────────────

function ApplicationDetailDialog({ app, onApprove, onReject }) {
  const [rejectNote, setRejectNote] = useState("");
  const [tab, setTab] = useState("details");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs font-semibold text-green-700 hover:text-green-800 hover:underline underline-offset-2 transition-colors">
          View Details
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden rounded-2xl border-green-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 pt-6 pb-14 relative">
          <DialogHeader>
            <DialogTitle className="text-white font-bold text-lg">Application Review</DialogTitle>
            <p className="text-green-100 text-xs mt-0.5">{app.id} · Applied {app.appliedDate}</p>
          </DialogHeader>
        </div>

        {/* Avatar overlap */}
        <div className="px-6 -mt-10 flex items-end gap-4 mb-2">
          <Avatar className="h-16 w-16 border-4 border-white shadow-lg shrink-0">
            <AvatarFallback className={`text-xl font-extrabold ${app.avatarBg}`}>{app.initials}</AvatarFallback>
          </Avatar>
          <div className="pb-1">
            <p className="font-extrabold text-gray-900 text-base leading-tight">{app.name}</p>
            <p className="text-green-600 text-sm font-medium">{app.specialty}</p>
          </div>
          <div className="ml-auto pb-1">
            <StatusBadge status={app.status} />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full bg-gray-50 rounded-xl mb-4 h-9">
              <TabsTrigger value="details" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg">Details</TabsTrigger>
              <TabsTrigger value="documents" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg">Documents</TabsTrigger>
              {app.status === "pending" && (
                <TabsTrigger value="action" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg">Take Action</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="details" className="space-y-3 mt-0">
              <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">{app.bio}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Email", value: app.email },
                  { label: "Phone", value: app.phone },
                  { label: "Qualification", value: app.qualification },
                  { label: "Hospital", value: app.hospital },
                  { label: "Experience", value: app.experience },
                  { label: "License No.", value: app.licenseNo },
                  { label: "Department", value: app.department },
                  { label: "Applied On", value: app.appliedDate },
                ].map(f => (
                  <div key={f.label} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{f.label}</p>
                    <p className="text-xs font-semibold text-gray-800 mt-0.5 truncate">{f.value}</p>
                  </div>
                ))}
              </div>
              {app.status === "rejected" && app.rejectReason && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-red-600 mb-1">Rejection Reason</p>
                  <p className="text-xs text-red-500">{app.rejectReason}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <div className="space-y-2">
                {app.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{doc}</p>
                        <p className="text-[10px] text-gray-400">PDF · Submitted</p>
                      </div>
                    </div>
                    <button className="text-xs text-green-700 font-semibold hover:underline">View</button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {app.status === "pending" && (
              <TabsContent value="action" className="mt-0 space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-gray-800 mb-1">Approve Application</p>
                  <p className="text-xs text-gray-500 mb-3">The doctor will be notified and added to the active roster.</p>
                  <Button onClick={() => onApprove(app.id)} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
                    ✓ Approve Doctor
                  </Button>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-gray-800 mb-1">Reject Application</p>
                  <p className="text-xs text-gray-500 mb-2">Provide a reason — this will be sent to the applicant.</p>
                  <Textarea
                    placeholder="Enter rejection reason…"
                    value={rejectNote}
                    onChange={e => setRejectNote(e.target.value)}
                    className="text-sm mb-3 border-red-200 focus:border-red-400 rounded-xl resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={() => rejectNote.trim() && onReject(app.id, rejectNote)}
                    disabled={!rejectNote.trim()}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-100 font-semibold rounded-xl"
                  >
                    ✕ Reject Application
                  </Button>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Application Row ──────────────────────────────────────────────────────────

function ApplicationRow({ app, onApprove, onReject }) {
  return (
    <div className={`bg-white border rounded-2xl px-5 py-4 flex items-center gap-5 transition-all duration-200 hover:shadow-md group
      ${app.status === "pending" ? "border-gray-100 hover:border-green-200" : app.status === "approved" ? "border-green-100" : "border-red-100 opacity-80"}`}>

      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="h-12 w-12 border-2 border-gray-100">
          <AvatarFallback className={`font-bold text-sm ${app.avatarBg}`}>{app.initials}</AvatarFallback>
        </Avatar>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-x-4 gap-y-1 items-center">
        {/* Name */}
        <div>
          <p className="font-bold text-gray-900 text-sm truncate">{app.name}</p>
          <p className="text-xs text-green-600 font-medium">{app.specialty}</p>
        </div>

        {/* Qualification */}
        <div className="hidden sm:block">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Qualification</p>
          <p className="text-xs font-semibold text-gray-700 truncate">{app.qualification.split("–")[0].trim()}</p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs">
          <div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Exp.</p>
            <p className="font-bold text-gray-700">{app.experience}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Applied</p>
            <p className="font-semibold text-gray-600">{app.appliedDate}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">ID</p>
            <p className="font-mono text-gray-500 text-[11px]">{app.id}</p>
          </div>
        </div>

        {/* Status + View */}
        <div className="flex items-center gap-3">
          <StatusBadge status={app.status} />
          <ApplicationDetailDialog app={app} onApprove={onApprove} onReject={onReject} />
        </div>
      </div>

      {/* Action buttons (pending only) */}
      {app.status === "pending" && (
        <div className="shrink-0 flex items-center gap-2 ml-2">
          <button
            onClick={() => onApprove(app.id)}
            className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-green-200 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            Approve
          </button>
          <button
            onClick={() => onReject(app.id, "Rejected by admin.")}
            className="h-9 px-4 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 text-xs font-bold rounded-xl border border-red-200 hover:border-red-300 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            Reject
          </button>
        </div>
      )}

      {app.status === "approved" && (
        <div className="shrink-0 ml-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Approved
          </span>
        </div>
      )}

      {app.status === "rejected" && (
        <div className="shrink-0 ml-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-200">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Rejected
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ open }) {
  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          </div>
          <span className="font-extrabold text-gray-900 text-lg tracking-tight">MediCare <span className="text-green-600">HMS</span></span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Admin Panel</p>
        {navLinks.map(link => (
          <a key={link.label} href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${link.active ? "bg-green-600 text-white shadow-sm" : "text-gray-500 hover:bg-green-50 hover:text-green-700"}`}>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
            </svg>
            {link.label}
            {link.badge && (
              <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${link.active ? "bg-white text-green-700" : "bg-amber-100 text-amber-700"}`}>{link.badge}</span>
            )}
          </a>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
          <Avatar className="h-8 w-8 border-2 border-green-200 shrink-0">
            <AvatarFallback className="bg-green-100 text-green-700 text-xs font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">Admin User</p>
            <p className="text-[10px] text-green-600 font-medium">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ setSidebarOpen, pendingCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16 flex items-center px-5 gap-4">
      <button onClick={() => setSidebarOpen(o => !o)}
        className="w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors lg:hidden">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow lg:hidden">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        </div>
        <span className="font-extrabold text-gray-900 text-base lg:hidden">MediCare <span className="text-green-600">HMS</span></span>
      </div>
      <div className="hidden lg:block">
        <p className="text-base font-extrabold text-gray-900">Doctor Approval Dashboard</p>
        <p className="text-xs text-gray-400">{pendingCount} application{pendingCount !== 1 ? "s" : ""} awaiting review</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />}
        </button>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-green-50 border border-green-100">
          <Avatar className="h-7 w-7 border-2 border-green-200">
            <AvatarFallback className="bg-green-100 text-green-700 text-[10px] font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">Admin User</p>
            <p className="text-[10px] text-green-600 font-medium">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [apps, setApps] = useState(initialApplications);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "approved" } : a));
    showToast("Doctor approved successfully.", "success");
  };

  const handleReject = (id, reason) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: "rejected", rejectReason: reason } : a));
    showToast("Application rejected.", "error");
  };

  const pending = apps.filter(a => a.status === "pending");
  const approved = apps.filter(a => a.status === "approved");
  const rejected = apps.filter(a => a.status === "rejected");
  const specialties = [...new Set(apps.map(a => a.specialty))];

  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.name.toLowerCase().includes(q) || a.specialty.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)) &&
      (statusFilter === "all" || a.status === statusFilter) &&
      (specialtyFilter === "all" || a.specialty === specialtyFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar setSidebarOpen={setSidebarOpen} pendingCount={pending.length} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        {sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 py-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
              <span>Dashboard</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              <span className="text-green-600 font-semibold">Doctor Approvals</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Applied", value: apps.length, icon: "📋", bg: "bg-blue-50 border-blue-100", val: "text-blue-700" },
                { label: "Pending Review", value: pending.length, icon: "⏳", bg: "bg-amber-50 border-amber-100", val: "text-amber-600" },
                { label: "Approved", value: approved.length, icon: "✅", bg: "bg-green-50 border-green-100", val: "text-green-700" },
                { label: "Rejected", value: rejected.length, icon: "❌", bg: "bg-red-50 border-red-100", val: "text-red-600" },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 flex items-center gap-3 ${s.bg}`}>
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className={`text-2xl font-extrabold leading-none ${s.val}`}>{s.value}</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pending alert banner */}
            {pending.length > 0 && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                <p className="text-sm font-semibold text-amber-700">{pending.length} doctor application{pending.length > 1 ? "s" : ""} pending your review.</p>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 mb-5 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <Input placeholder="Search by name, specialty, or ID…" value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-green-400 rounded-xl text-sm" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:w-40 border-gray-200 rounded-xl text-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="sm:w-48 border-gray-200 rounded-xl text-sm">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* List header */}
            <div className="hidden sm:grid grid-cols-4 gap-4 px-5 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Doctor</span>
              <span>Qualification</span>
              <span>Details</span>
              <span>Status</span>
            </div>

            {/* Applications */}
            <div className="space-y-3">
              {filtered.length > 0 ? filtered.map(app => (
                <ApplicationRow key={app.id} app={app} onApprove={handleApprove} onReject={handleReject} />
              )) : (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="font-semibold text-gray-600">No applications found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold transition-all
          ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}