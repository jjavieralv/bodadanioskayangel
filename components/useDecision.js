"use client";
import { useEffect, useState, useCallback } from "react";

// Nombre de la clave de localStorage, no es un secreto.
const KEY = "decisiones_boda_v1"; // gitleaks:allow

function read() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(obj) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(obj));
  window.dispatchEvent(new Event("decisiones:change"));
}

export function useDecision() {
  const [store, setStore] = useState({});

  useEffect(() => {
    setStore(read());
    const onChange = () => setStore(read());
    window.addEventListener("decisiones:change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("decisiones:change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const set = useCallback((id, value) => {
    const current = read();
    if (value === null) delete current[id];
    else current[id] = value;
    write(current);
  }, []);

  const get = useCallback((id) => store[id] ?? null, [store]);

  const clear = useCallback(() => write({}), []);

  return { store, set, get, clear };
}
