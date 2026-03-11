import { useState, type ChangeEvent } from "react"
import { createPortal } from "react-dom"
import type { applyforDocData } from "../../../globals/types/docTypes"
import { useApplyForDoctor } from "../../../globals/hooks/Doctor/useApplyForDoctor"



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
        [name]:value
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
                <label id="specialization" className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Specialization
                </label>

                <select
                  onChange={handleChange}
                  name="specialization"
                  className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-xl px-3 py-2.5"
                >
                  <option value="" >— Select Specialization —</option>

                  <optgroup label="Medical">
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="oncology">Oncology</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="radiology">Radiology</option>
                  </optgroup>

                  <optgroup label="Surgical">
                    <option value="surgery">General Surgery</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="neurosurgery">Neurosurgery</option>
                  </optgroup>

                  <optgroup label="Other">
                    <option value="emergency">Emergency Medicine</option>
                    <option value="anesthesiology">Anesthesiology</option>
                    <option value="pathology">Pathology</option>
                  </optgroup>
                </select>
              </div>

              {/* License */}
              <div className="flex flex-col gap-1.5">
                <label id="licenseNumber" className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ">
                  License Number
                </label>

                <input
                  type="text"
                  placeholder="e.g. MD-2024-100342"
                  required
                  name="licenseNumber"
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-xl px-3 py-2.5 font-mono tracking-widest"
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
                <button
                  onClick={closeModal}
                  className="text-zinc-400 hover:text-zinc-100 text-sm border border-zinc-700 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>

                <button
                onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </div>

          </div>
        </div>
  )

  if (typeof document === "undefined") return null
  return createPortal(modal, document.body)
}