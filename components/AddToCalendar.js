"use client";
import { useState } from "react";
import site from "@/content/site.json";

function toUtcString(dateIso, hoursToAdd = 0) {
  const d = new Date(dateIso);
  d.setHours(d.getHours() + hoursToAdd);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export default function AddToCalendar() {
  const [open, setOpen] = useState(false);

  const title = `Boda ${site.novios.nombres}`;
  const details = `Ceremonia en ${site.lugar.venue}, ${site.lugar.direccion}`;
  const start = toUtcString(site.fecha.iso);
  const end = toUtcString(site.fecha.iso, 12);

  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(site.lugar.direccion)}`;
  const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${site.fecha.iso}&location=${encodeURIComponent(site.lugar.direccion)}`;

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${Date.now()}@daniyangel
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${site.lugar.direccion}
END:VEVENT
END:VCALENDAR`;

  const icsDataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-lavanda-300 text-lavanda-700 hover:bg-white transition"
      >
        Añadir al calendario
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-soft border border-lavanda-200 overflow-hidden min-w-[180px]">
          <a href={google} target="_blank" rel="noopener" className="block px-4 py-2.5 text-sm hover:bg-lavanda-50">
            Google Calendar
          </a>
          <a href={outlook} target="_blank" rel="noopener" className="block px-4 py-2.5 text-sm hover:bg-lavanda-50">
            Outlook
          </a>
          <a href={icsDataUrl} download="boda-dani-angel.ics" className="block px-4 py-2.5 text-sm hover:bg-lavanda-50">
            Apple / iCal (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
