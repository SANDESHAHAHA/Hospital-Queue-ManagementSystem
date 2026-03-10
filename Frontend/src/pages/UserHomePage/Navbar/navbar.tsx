import { useState } from "react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useAppSelector } from "../../../store/hooks";
import type { User } from "../../../globals/types/authTypes";
import { useSignOut } from "../../../globals/hooks/Auth/useSignOut";



const navLinks = [
  { label: "Dashboard", href: "#", active: false },
  { label: "Doctors", href: "#", active: true },
  { label: "Appointments", href: "#", active: false },
  { label: "Feed", href: "/feed", active: false },
  { label: "Admin", href: "/admin", active: false },
];

function UserProfileDialog() {
  const user = useAppSelector((state) => state.auth.user) as User;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors flex items-center gap-2.5 font-medium">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          View Full Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden rounded-2xl border-green-100">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 px-6 pt-8 pb-16 relative">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">My Profile</DialogTitle>
          </DialogHeader>
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src={user?.image as string} />
              </Avatar>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="pt-14 px-6 pb-6 space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">{user?.userName}</h2>
                <p className="text-green-600 font-semibold text-sm">{user?.role}</p>
              </div>

            </div>
          </div>

          <Separator className="bg-gray-100" />

          <div className="space-y-3">
            {[
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: user?.email,
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Phone",
                value: user?.phoneNumber,
              }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-gray-100" />

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
            Edit Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user) as User;
  
  const signOutMutation = useSignOut()

  const handleLogout = ()=>{
    signOutMutation.mutate()
  }


  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="font-extrabold text-gray-900 text-lg tracking-tight">
            MediCare <span className="text-green-600">HMS</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                link.active
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-500 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Apply for Doctor Button */}
          <Button className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Apply for Doctor
          </Button>

          {/* Notification Bell */}
          <button className="relative w-9 h-9 rounded-lg border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors shadow-sm">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-500 border border-white" />
          </button>

          {/* User Avatar + Popover */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-green-50 border border-transparent hover:border-green-100 transition-all group">
                <Avatar className="h-8 w-8 border-2 border-green-200">
                  <AvatarImage src={user?.image as string} />
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-gray-800 leading-tight">{user?.userName}</p>
                  <p className="text-xs text-green-600 font-medium">{user?.role}</p>
                </div>
                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-600 transition-colors hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-64 p-2 rounded-2xl border border-gray-100 shadow-xl mt-2">
              {/* User Summary */}
              <div className="flex items-center gap-3 px-3 py-3 bg-green-50 rounded-xl mb-2 border border-green-100">
                <Avatar className="h-10 w-10 border-2 border-green-200">
                  <AvatarImage src={user?.image as string} />
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.userName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5">
                <UserProfileDialog />

              </div> 

              <Separator className="my-2 bg-gray-100" />

              <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2.5 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </PopoverContent>
          </Popover>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-lg border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                link.active
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-500 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}