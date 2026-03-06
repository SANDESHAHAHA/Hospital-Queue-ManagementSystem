
import { useState } from "react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Calendar } from "../../../components/ui/calendar";

// ─── Data ────────────────────────────────────────────────────────────────────

const user = {
  name: "John Doe",
  role: "Admin",
  email: "john.doe@medicare.com",
  phone: "+1 (555) 012-3456",
  department: "Hospital Administration",
  employeeId: "HMS-00421",
  joined: "March 2021",
  initials: "JD",
  status: "Active",
  lastLogin: "Today, 8:42 AM",
};


const doctors = [
  { id: 1, name: "Dr. Sarah Mitchell", specialty: "Cardiologist", department: "Cardiology", experience: "14 yrs", rating: 4.9, reviews: 312, nextSlot: "Today, 3:00 PM", available: true, languages: ["English", "French"], fee: "$120", initials: "SM", avatarBg: "bg-emerald-100 text-emerald-700", tags: ["Heart Disease", "Hypertension", "ECG"] },
  { id: 2, name: "Dr. James Okonkwo", specialty: "Neurologist", department: "Neurology", experience: "11 yrs", rating: 4.8, reviews: 245, nextSlot: "Tomorrow, 10:00 AM", available: true, languages: ["English", "Igbo"], fee: "$150", initials: "JO", avatarBg: "bg-teal-100 text-teal-700", tags: ["Migraine", "Epilepsy", "Stroke"] },
  { id: 3, name: "Dr. Priya Sharma", specialty: "Pediatrician", department: "Pediatrics", experience: "9 yrs", rating: 4.9, reviews: 408, nextSlot: "Today, 5:30 PM", available: true, languages: ["English", "Hindi"], fee: "$90", initials: "PS", avatarBg: "bg-green-100 text-green-700", tags: ["Child Health", "Vaccination", "Growth"] },
  { id: 4, name: "Dr. Marcus Chen", specialty: "Orthopedic Surgeon", department: "Orthopedics", experience: "17 yrs", rating: 4.7, reviews: 189, nextSlot: "Mon, 9:00 AM", available: false, languages: ["English", "Mandarin"], fee: "$200", initials: "MC", avatarBg: "bg-lime-100 text-lime-700", tags: ["Spine", "Joint Replacement", "Sports Injury"] },
  { id: 5, name: "Dr. Amara Diallo", specialty: "Dermatologist", department: "Dermatology", experience: "8 yrs", rating: 4.8, reviews: 274, nextSlot: "Today, 2:00 PM", available: true, languages: ["English", "Wolof"], fee: "$110", initials: "AD", avatarBg: "bg-emerald-100 text-emerald-700", tags: ["Acne", "Eczema", "Skin Cancer"] },
  { id: 6, name: "Dr. Elena Vasquez", specialty: "Endocrinologist", department: "Endocrinology", experience: "12 yrs", rating: 4.6, reviews: 156, nextSlot: "Tue, 11:00 AM", available: false, languages: ["English", "Spanish"], fee: "$130", initials: "EV", avatarBg: "bg-teal-100 text-teal-700", tags: ["Diabetes", "Thyroid", "Hormones"] },
  { id: 7, name: "Dr. Kwame Asante", specialty: "Ophthalmologist", department: "Ophthalmology", experience: "10 yrs", rating: 4.7, reviews: 201, nextSlot: "Today, 4:00 PM", available: true, languages: ["English", "Twi"], fee: "$100", initials: "KA", avatarBg: "bg-green-100 text-green-700", tags: ["Cataract", "Glaucoma", "Vision"] },
];

const timeSlots = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];

function BookingDialog({ doctor }:any) {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(1);

  return (
    <Dialog onOpenChange={() => { setStep(1); setSelectedSlot(null); }}>
      <DialogTrigger asChild>
        <Button
          disabled={!doctor.available}
          className={`px-6 h-10 font-semibold text-sm rounded-xl shrink-0 ${doctor.available ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          {doctor.available ? "Book Appointment" : "Unavailable"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-green-100">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Book Appointment</DialogTitle>
            <DialogDescription className="text-green-100 mt-1">with {doctor.name} · {doctor.specialty}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            {[1,2,3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Select Date</p>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border border-green-100 mx-auto"
                classNames={{ day_selected: "bg-green-600 text-white hover:bg-green-700", day_today: "text-green-700 font-bold" }} />
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">Select Time</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <button key={slot} onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${selectedSlot === slot ? "bg-green-600 text-white border-green-600 shadow" : "border-green-200 text-gray-700 hover:border-green-400 hover:bg-green-50"}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confirm Booking</p>
              <div className="bg-green-50 rounded-xl p-4 space-y-3 border border-green-100">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-green-200">
                    <AvatarFallback className={doctor.avatarBg}>{doctor.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-800">{doctor.name}</p>
                    <p className="text-sm text-green-600">{doctor.specialty}</p>
                  </div>
                </div>
                <Separator className="bg-green-200" />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-400 text-xs">Date</span><p className="font-semibold">{date?.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</p></div>
                  <div><span className="text-gray-400 text-xs">Time</span><p className="font-semibold">{selectedSlot}</p></div>
                  <div><span className="text-gray-400 text-xs">Fee</span><p className="font-semibold text-green-700">{doctor.fee}</p></div>
                  <div><span className="text-gray-400 text-xs">Type</span><p className="font-semibold">In-Person</p></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="px-6 pb-6 gap-2">
          {step > 1 && <Button variant="outline" onClick={() => setStep(s => s-1)} className="border-green-200 text-green-700 hover:bg-green-50">Back</Button>}
          <Button onClick={() => step < 3 ? setStep(s => s+1) : alert("✓ Appointment Confirmed!")}
            disabled={step === 2 && !selectedSlot}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold">
            {step === 3 ? "Confirm Booking" : "Continue →"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DoctorBlock({ doctor }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-5 hover:border-green-200 hover:shadow-md transition-all duration-200 group">
      {/* Avatar + status */}
      <div className="relative shrink-0">
        <Avatar className="h-14 w-14 border-2 border-gray-100 group-hover:border-green-200 transition-colors">
          <AvatarFallback className={`text-base font-bold ${doctor.avatarBg}`}>{doctor.initials}</AvatarFallback>
        </Avatar>
        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${doctor.available ? "bg-green-500" : "bg-gray-300"}`} />
      </div>

      {/* Info block */}
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-1 items-center">
        {/* Name + specialty */}
        <div className="sm:col-span-1">
          <p className="font-bold text-gray-900 text-sm truncate">{doctor.name}</p>
          <p className="text-xs text-green-600 font-medium">{doctor.specialty}</p>
        </div>

        {/* Tags */}
        <div className="sm:col-span-1 flex flex-wrap gap-1">
          {doctor.tags.slice(0, 2).map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100 font-medium">{t}</span>
          ))}
        </div>

        {/* Meta */}
        <div className="sm:col-span-1 flex items-center gap-4 text-xs text-gray-500">
          <div>
            <span className="text-gray-400">Exp.</span>
            <p className="font-bold text-gray-700">{doctor.experience}</p>
          </div>
          <div>
            <span className="text-gray-400">Fee</span>
            <p className="font-bold text-green-600">{doctor.fee}</p>
          </div>
          <div>
            <p className="text-gray-400">{doctor.reviews} reviews</p>
          </div>
        </div>

        {/* Slot */}
        <div className="sm:col-span-1">
          {doctor.available ? (
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 rounded-lg px-2.5 py-1.5 border border-green-100 w-fit">
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="font-semibold">{doctor.nextSlot}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100 w-fit">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
              <span className="font-medium">Not available</span>
            </div>
          )}
        </div>
      </div>

      {/* Book button — end */}
      <div className="shrink-0 ml-2">
        <BookingDialog doctor={doctor} />
      </div>
    </div>
  );
}


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availability, setAvailability] = useState("all");

  const specialties = [...new Set(doctors.map(d => d.specialty))];

  const filtered = doctors.filter(d => {
    const q = search.toLowerCase();
    return (
      (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) &&
      (specialty === "all" || d.specialty === specialty) &&
      (availability === "all" || (availability === "available" ? d.available : !d.available))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex flex-1 overflow-hidden">

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 py-8">

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <span>Dashboard</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                <span className="text-green-600 font-semibold">Doctors</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Available Doctors</h1>
                  <p className="text-sm text-gray-500 mt-0.5">Book an appointment with our trusted specialists</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-600"><span className="text-green-600 font-bold">{doctors.filter(d => d.available).length}</span> available now</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Doctors", value: doctors.length, emoji: "👨‍⚕️", bg: "bg-green-50 border-green-100" },
                { label: "Available Now", value: doctors.filter(d => d.available).length, emoji: "✅", bg: "bg-emerald-50 border-emerald-100" },
                { label: "Specialties", value: specialties.length, emoji: "🏥", bg: "bg-teal-50 border-teal-100" },
                { label: "Avg Rating", value: (doctors.reduce((a,d) => a+d.rating,0)/doctors.length).toFixed(1), emoji: "⭐", bg: "bg-lime-50 border-lime-100" },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-3.5 flex items-center gap-3 ${s.bg}`}>
                  <span className="text-xl">{s.emoji}</span>
                  <div>
                    <p className="text-xl font-extrabold text-gray-900 leading-none">{s.value}</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 mb-5 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <Input placeholder="Search by name or specialty…" value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-green-400 rounded-xl text-sm" />
              </div>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="sm:w-48 border-gray-200 rounded-xl text-sm">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="sm:w-40 border-gray-200 rounded-xl text-sm">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor List */}
            <div className="space-y-3">
              {filtered.length > 0 ? filtered.map(doc => (
                <DoctorBlock key={doc.id} doctor={doc} />
              )) : (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-semibold">No doctors found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

