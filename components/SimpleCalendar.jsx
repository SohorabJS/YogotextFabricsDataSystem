// components/SimpleCalendar.jsx
import React, { useEffect, useRef, useState } from "react";

/* ---- SimpleCalendar: lightweight dynamic calendar UI ----
 - props:
    - selected (Date) : currently selected date
    - onSelect (date) : callback when user picks a date
    - onClose () : callback when popup should close
 - keyboard & click outside basic handling included
*/
function SimpleCalendar({ selected, onSelect, onClose }) {
  const [viewDate, setViewDate] = useState(selected ? new Date(selected) : new Date());
  const rootRef = useRef(null);

  // build calendar month matrix
  function getMonthMatrix(d) {
    const year = d.getFullYear();
    const month = d.getMonth();
    // first day of month
    const first = new Date(year, month, 1);
    const startDay = first.getDay(); // 0..6 (Sun..Sat)
    // we want weeks to start on Sunday (adjust if you want Mon)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();

    const cells = [];
    let dayCounter = 1;
    // 6 rows x 7 cols
    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let weekday = 0; weekday < 7; weekday++) {
        const cellIndex = week * 7 + weekday;
        // calculate date number and which month it belongs to
        const dateNum = cellIndex - startDay + 1;
        let cellDate;
        let inCurrentMonth = true;
        if (dateNum <= 0) {
          // prev month
          cellDate = new Date(year, month - 1, prevDays + dateNum);
          inCurrentMonth = false;
        } else if (dateNum > daysInMonth) {
          // next month
          cellDate = new Date(year, month + 1, dateNum - daysInMonth);
          inCurrentMonth = false;
        } else {
          cellDate = new Date(year, month, dateNum);
        }
        row.push({ date: cellDate, inCurrentMonth });
      }
      cells.push(row);
    }
    return cells;
  }

  const matrix = getMonthMatrix(viewDate);
  const today = new Date();
  const monthName = viewDate.toLocaleString("en-GB", { month: "long" });
  const year = viewDate.getFullYear();

  // close on click outside
  useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) onClose?.();
    }
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      className="w-[320px] bg-white rounded-lg shadow-xl ring-1 ring-black/8 p-3 text-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Previous month"
        >
          ◀
        </button>

        <div className="font-medium text-gray-800">
          {monthName} {year}
        </div>

        <button
          onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {matrix.flat().map((cell) => {
          const d = cell.date;
          const key = d.toISOString();
          const isToday =
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate();
          const isSelected =
            selected &&
            d.getFullYear() === selected.getFullYear() &&
            d.getMonth() === selected.getMonth() &&
            d.getDate() === selected.getDate();

          return (
            <button
              key={key}
              onClick={() => onSelect?.(d)}
              className={[
                "py-2 rounded",
                cell.inCurrentMonth ? "text-gray-800" : "text-gray-400",
                isSelected ? "bg-indigo-600 text-white" : "hover:bg-gray-100",
                isToday && !isSelected ? "border border-indigo-500" : "", // Highlight today if not selected
              ].filter(Boolean).join(" ")}
              aria-current={isToday ? "date" : undefined}
              title={d.toDateString()}
            >
              <div className="text-xs leading-none">{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => {
            const t = new Date();
            setViewDate(new Date(t.getFullYear(), t.getMonth(), 1));
            onSelect?.(t);
          }}
          className="text-xs text-gray-600 hover:underline"
        >
          Today
        </button>

        <button
          onClick={() => onClose?.()}
          className="text-xs text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SimpleCalendar; // This line makes it a default export