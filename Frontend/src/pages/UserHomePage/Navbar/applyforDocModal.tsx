import { useState, type ChangeEvent } from "react"
import { createPortal } from "react-dom"
import type { applyforDocData } from "../../../globals/types/docTypes"
import { useApplyForDoctor } from "../../../globals/hooks/Doctor/useApplyForDoctor"
import { Loader2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"



export default function ApplyModal({closeModal}:{closeModal:()=>void}) {
  const [data,setData] = useState<applyforDocData>({
    licenseNumber:"",
    specialization:""
  })


  const [hint, setHint] = useState(
    "Your official board-issued license ID (auto-uppercased)."
  )
  const [hintColor, setHintColor] = useState("text-zinc-600")

  const validateLicense = (val:string) => {
    const pattern = /^[A-Z]{2}-\d{4}-\d{5,}$/

    if (val.length === 0) {
      setHint("Your official board-issued license ID (auto-uppercased).")
      setHintColor("text-zinc-600")
    } else if (pattern.test(val)) {
      setHint("✓ Valid license format")
      setHintColor("text-green-400")
    } else {
      setHint("Format should be: MD-2024-100342")
      setHintColor("text-red-400")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value.toUpperCase()
    const {name,value} = e.target
    validateLicense(val)

    setData({
        ...data,
        [name]: name === "licenseNumber" ? val : value
    })
  }
   const applyForDocMutation = useApplyForDoctor() 

   const handleSubmit = ()=>{
    applyForDocMutation.mutate(data)
   }
  const modal = (
    <div

      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-auto"
    >
      <div className="bg-zinc-900 border border-zinc-700/60 rounded-2xl w-full max-w-md shadow-2xl transform-gpu">

            <div className="flex items-start justify-between p-6 pb-5">
              <div>
                <h2 className="text-zinc-100 text-xl font-semibold">
                  Apply for Specialization
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Enter your license number and select your field.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-zinc-500 hover:text-zinc-200"
              >
                ✕
              </button>
            </div>

            <div className="h-px bg-zinc-700/50 mx-6"></div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="specialization" className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Specialization
                </Label>

                <Select
                  onValueChange={(val) =>
                    setData({
                      ...data,
                      specialization: val,
                    })
                  }
                  defaultValue={data.specialization}
                >
                  <SelectTrigger id="specialization" className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-xl px-3 py-2.5">
                    <SelectValue placeholder="— Select Specialization —" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Medical</SelectLabel>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Surgical</SelectLabel>
                      <SelectItem value="surgery">General Surgery</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="neurosurgery">Neurosurgery</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Other</SelectLabel>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                      <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
                      <SelectItem value="pathology">Pathology</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* License */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="licenseNumber" className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ">
                  License Number
                </Label>

                <Input
                  id="licenseNumber"
                  type="text"
                  placeholder="e.g. MD-2024-100342"
                  required
                  name="licenseNumber"
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border-zinc-700 text-zinc-200 text-sm rounded-xl px-3 py-2.5 font-mono tracking-widest"
                />

                <p className={`${hintColor} text-xs`}>
                  {hint}
                </p>
              </div>

            </div>

            <div className="h-px bg-zinc-700/50 mx-6"></div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-zinc-600 text-xs">
                All fields are required
              </p>

              <div className="flex gap-2">
                <Button variant="outline" onClick={closeModal} className="text-black-400 text-sm px-4 py-2 rounded-xl">
                  Cancel
                </Button>

                <Button onClick={handleSubmit} type="submit" className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl" disabled={applyForDocMutation.isPending}>
                  {applyForDocMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {applyForDocMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>

          </div>
        </div>
  )

  if (typeof document === "undefined") return null
  return createPortal(modal, document.body)
}