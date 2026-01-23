 "use client";

import React, { useEffect, useRef, useState } from "react";
import { useFloating, offset, flip, shift, autoUpdate, useClick, useDismiss, useRole, useInteractions, FloatingFocusManager, useTransitionStyles } from "@floating-ui/react";
import SimpleCalendar from "./SimpleCalendar"; // Make sure SimpleCalendar is correctly exported

/**
 * Props:
 * - size: base diameter in px (number) - default 160
 * - showDigital: boolean - default true
 * - showDate: boolean - default true
 * - showAmPm: boolean - default true
 */
export default function Clock({
  size = 160,
  showDigital = true,
  showDate = true,
  showAmPm = true,
}) {
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState({ time: "--:--:--", ampm: "", date: "00-00-0000" }); 
  const faceRef = useRef(null);
  const rafRef = useRef(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date()); // Default to today

  // Floating UI integration
  const { refs, floatingStyles, context } = useFloating({
    open: calendarOpen,
    onOpenChange: setCalendarOpen,
    middleware: [offset(10), flip(), shift()], // Offset calendar by 10px, flip if no space, shift to stay in viewport
    whileElementsMounted: autoUpdate, // Keep position updated
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  // Transition styles for smooth appearance/disappearance
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200, // Animation duration in ms
    initial: {
      opacity: 0,
      transform: 'scale(0.95)', // Start slightly smaller
    },
    open: {
      opacity: 1,
      transform: 'scale(1)', // Grow to normal size
    },
    close: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dhaka";

    function getParts() {
      const now = new Date();

      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: showAmPm,
        timeZone: tz,
      });

      const partsObj = fmt.formatToParts(now).reduce((acc, p) => {
        if (p.type) acc[p.type] = p.value;
        return acc;
      }, {});

      const ms = now.getMilliseconds();
      const secondFloat = Number(partsObj.second ?? now.getSeconds()) + ms / 1000;
      const minuteFloat = Number(partsObj.minute ?? now.getMinutes()) + secondFloat / 60;
      let hourNumber = Number(partsObj.hour ?? now.getHours());
      if (showAmPm) hourNumber = hourNumber % 12;
      const hourFloat = hourNumber + minuteFloat / 60;

      const timeText = `${partsObj.hour ?? "00"}:${partsObj.minute ?? "00"}:${partsObj.second ?? "00"}`;
      const ampmText = showAmPm ? (partsObj.dayPeriod ?? "") : "";
      const dateText = `${partsObj.day ?? "--"}-${partsObj.month ?? "--"}-${partsObj.year ?? "----"}`;

      return {
        hourFloat,
        minuteFloat,
        secondFloat,
        timeText,
        ampmText,
        dateText,
      };
    }

    function animate() {
      const p = getParts();
      if (faceRef.current) {
        const hourDeg = (p.hourFloat / 12) * 360;
        const minuteDeg = (p.minuteFloat / 60) * 360;
        const secondDeg = (p.secondFloat / 60) * 360;

        const hourEl = faceRef.current.querySelector("[data-hand='hour']");
        const minuteEl = faceRef.current.querySelector("[data-hand='minute']");
        const secondEl = faceRef.current.querySelector("[data-hand='second']");

        if (hourEl) hourEl.style.transform = `translateX(-50%) translateY(-100%) rotate(${hourDeg}deg)`;
        if (minuteEl) minuteEl.style.transform = `translateX(-50%) translateY(-100%) rotate(${minuteDeg}deg)`;
        if (secondEl) secondEl.style.transform = `translateX(-50%) translateY(-100%) rotate(${secondDeg}deg)`;
      }

      setDisplay({ time: p.timeText, ampm: p.ampmText, date: p.dateText });
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, showAmPm]);

  function handleDateSelect(d) {
    setSelectedDate(d);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    setDisplay(prev => ({ ...prev, date: `${dd}-${mm}-${yyyy}` }));
    setCalendarOpen(false);
  }

  // Server-side placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex flex-col items-center select-none" style={{ width: size }}>
        <div className="rounded-full bg-gray-200 animate-pulse" style={{ width: size, height: size }} />
        {showDigital && <div className="mt-2 h-4 w-24 rounded bg-gray-200 animate-pulse" />}
        {showDate && <div className="mt-1 h-3 w-28 rounded bg-gray-200 animate-pulse" />}
      </div>
    );
  }

  // Derived sizes
  const diameter = size;
  const tickDistance = diameter / 2 - Math.max(8, diameter * 0.06);

  return (
    <div
      className="inline-flex flex-col items-center select-none"
      style={{ width: diameter }}
      aria-label="Clock"
    >
      <div
        ref={faceRef}
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: diameter,
          height: diameter,
          background: "linear-gradient(180deg, #ffffff, #f3f7ff)",
          boxShadow: "0 10px 30px rgba(12,18,40,0.12), inset 0 -6px 12px rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Glow ring */}
        <div
          aria-hidden
          className="absolute -inset-1 rounded-full opacity-80"
          style={{
            background: "conic-gradient(from 120deg, #7c3aed, #ec4899, #f97316, #06b6d4)",
            filter: "blur(14px)",
            zIndex: 0,
          }}
        />

        {/* Hour hand */}
        <div
          data-hand="hour"
          className="absolute origin-bottom"
          style={{
            width: Math.max(5, diameter * 0.035),
            height: `${diameter * 0.36}px`,
            background: "linear-gradient(180deg,#111827,#4b5563)",
            borderRadius: 9999,
            left: "50%",
            top: "50%",
            transform: `translateX(-50%) translateY(-100%) rotate(0deg)`,
            transition: "transform 90ms linear",
            zIndex: 20,
          }}
        />

        {/* Minute hand */}
        <div
          data-hand="minute"
          className="absolute origin-bottom"
          style={{
            width: Math.max(3, diameter * 0.025),
            height: `${diameter * 0.50}px`,
            background: "linear-gradient(180deg,#374151,#9ca3af)",
            borderRadius: 9999,
            left: "50%",
            top: "50%",
            transform: `translateX(-50%) translateY(-100%) rotate(0deg)`,
            transition: "transform 80ms linear",
            zIndex: 18,
          }}
        />

        {/* Second hand */}
        <div
          data-hand="second"
          className="absolute origin-bottom"
          style={{
            width: Math.max(2, diameter * 0.01),
            height: `${diameter * 0.58}px`,
            background: "linear-gradient(180deg,#ff6b6b,#ffd166)",
            borderRadius: 9999,
            left: "50%",
            top: "50%",
            transform: `translateX(-50%) translateY(-100%) rotate(0deg)`,
            transition: "transform 40ms linear",
            zIndex: 16,
          }}
        />

        {/* Center pin */}
        <div
          style={{
            width: Math.max(10, diameter * 0.055),
            height: Math.max(10, diameter * 0.055),
            background: "radial-gradient(circle at 30% 30%, #fff, #e6eefc)",
            borderRadius: "9999px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 30,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        />

        {/* Ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const major = i % 3 === 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: major ? Math.max(4, diameter * 0.03) : Math.max(2, diameter * 0.015),
                height: major ? Math.max(10, diameter * 0.07) : Math.max(6, diameter * 0.04),
                backgroundColor: major ? "#94a3b8" : "#cbd5e1",
                borderRadius: 9999,
                transformOrigin: "bottom center",
                transform: `translateX(-50%) translateY(calc(-100% - ${tickDistance}px)) rotate(${angle}deg)`,
                zIndex: 10,
              }}
            />
          );
        })}
      </div>

      {showDigital && (
        <div className="mt-2 text-2xl font-semibold text-gray-800">
          {display.time}
          {showAmPm && <span className="ml-1 text-base font-medium text-gray-600">{display.ampm}</span>}
        </div>
      )}

      {showDate && (
        <div className="mt-1 relative">
          <button
            ref={refs.setReference} // Set the reference element for Floating UI
            {...getReferenceProps()} // Apply Floating UI's reference props
            className="text-xs text-gray-700/90 px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-expanded={calendarOpen}
            aria-haspopup="dialog"
            aria-label="Open calendar"
          >
            {display.date}
          </button>

          {/* Render the calendar using Floating UI's floating element */}
          {isMounted && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating} // Set the floating element for Floating UI
                style={{ ...floatingStyles, ...transitionStyles }} // Apply dynamic positioning and animation styles
                {...getFloatingProps()} // Apply Floating UI's floating props
                className="z-50" // Ensure it appears above other content
              >
                <SimpleCalendar
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  onClose={() => setCalendarOpen(false)}
                />
              </div>
            </FloatingFocusManager>
          )}
        </div>
      )}
    </div>
  );
}