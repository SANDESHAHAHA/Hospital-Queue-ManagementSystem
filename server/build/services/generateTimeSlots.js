function generateTimeSlots(startTime, endTime, duration, breakStart, breakEnd) {
    const slots = [];
    const toMinutes = (time) => {
        const [h = 0, m = 0] = time.split(":").map(Number);
        return h * 60 + m;
    };
    const formatTime = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };
    let start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const breakStartMin = breakStart ? toMinutes(breakStart) : null;
    const breakEndMin = breakEnd ? toMinutes(breakEnd) : null;
    // validate inputs and avoid infinite loops
    if (isNaN(start) || isNaN(end) || duration <= 0 || start >= end) {
        return slots;
    }
    while (start + duration <= end) {
        const slotEnd = start + duration;
        const overlapsBreak = breakStartMin !== null &&
            breakEndMin !== null &&
            start < breakEndMin &&
            slotEnd > breakStartMin;
        if (!overlapsBreak) {
            slots.push(`${formatTime(start)}-${formatTime(slotEnd)}`);
        }
        start += duration;
    }
    return slots;
}
export default generateTimeSlots;
//# sourceMappingURL=generateTimeSlots.js.map