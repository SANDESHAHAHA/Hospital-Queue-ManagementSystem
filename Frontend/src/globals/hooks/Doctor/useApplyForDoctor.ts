import { useMutation } from "@tanstack/react-query";
import { applyForDocSchema, type applyforDocData } from "../../types/docTypes";
import { AuthenticatedAPI } from "../../../axiosInstance";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

function showInlineToast(message: string, duration = 3000) {
    if (typeof document === "undefined") return;

    const el = document.createElement("div");
    el.setAttribute(
        "class",
        "fixed top-6 right-6 z-50 bg-green-600 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300"
    );

    el.innerHTML = `
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>${message}</span>
    `;

    document.body.appendChild(el);

    // auto-hide animation (slide up)
    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateY(-8px)";
    }, duration - 300);

    setTimeout(() => el.remove(), duration);
}

export function useApplyForDoctor(onSuccessClose?: () => void) {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: applyforDocData) => {
            const parsed = applyForDocSchema.safeParse(data);
            if (!parsed.success) {
                // print validation error to console for devs
                console.log(z.treeifyError(parsed.error));
                throw new Error("validation failed");
            }
            return await AuthenticatedAPI.post("/applyDoctor", data);
        },
        onSuccess: () => {
            showInlineToast("You will be notified after your approval of request ✓");

            if (onSuccessClose) {
                try {
                    onSuccessClose();
                } catch (err) {
                    console.error(err);
                }
            }

            navigate({ to: "/home" });
        },
    });
}