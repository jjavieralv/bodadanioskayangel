"use client";
import { useEffect, useRef } from "react";

const STATE = { CHASE: "chase", GRAB: "grab", SLEEP: "sleep" };

export default function OttoFollower() {
  const wrapRef = useRef(null);
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const tailRef = useRef(null);
  const earFRef = useRef(null);
  const earBRef = useRef(null);
  const tongueRef = useRef(null);
  const lidLRef = useRef(null);
  const lidRRef = useRef(null);
  const leg0 = useRef(null);
  const leg1 = useRef(null);
  const leg2 = useRef(null);
  const leg3 = useRef(null);
  const cursorRef = useRef(null);
  const zRef = useRef(null);

  useEffect(() => {
    const legRefs = [leg0, leg1, leg2, leg3];
    const legCx = [30, 38, 58, 66];
    const legPhase = [0, Math.PI, Math.PI, 0];

    const hideStyle = document.createElement("style");
    hideStyle.textContent =
      "*, *::before, *::after { cursor: none !important; }";

    const s = {
      x: -120,
      y: window.innerHeight - 80,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      facing: 1,
      bodyAngle: 0,
      lastMove: 0,
      cursorX: window.innerWidth / 2,
      cursorY: window.innerHeight / 2,
      state: STATE.CHASE,
      stateStart: 0,
      wanderTx: 0,
      wanderTy: 0,
      nextWander: 0,
      runPhase: 0,
      visible: false,
      sleepAmt: 0,
      raf: 0,
    };

    function pickWander(now) {
      const m = 120;
      s.wanderTx = m + Math.random() * Math.max(0, window.innerWidth - 2 * m);
      s.wanderTy = m + Math.random() * Math.max(0, window.innerHeight - 2 * m);
      s.nextWander = now + 2400 + Math.random() * 1800;
    }

    function setState(ns, now) {
      if (s.state === ns) return;
      const prev = s.state;
      s.state = ns;
      s.stateStart = now;

      if (prev === STATE.GRAB && ns !== STATE.GRAB) {
        if (hideStyle.parentNode) hideStyle.remove();
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
      if (ns === STATE.GRAB) {
        document.head.appendChild(hideStyle);
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
        pickWander(now);
      }
    }

    const onMove = (e) => {
      const now = performance.now();
      s.cursorX = e.clientX;
      s.cursorY = e.clientY;
      s.lastMove = now;
      if (!s.visible && wrapRef.current) {
        s.visible = true;
        wrapRef.current.style.opacity = "1";
      }
      if (s.state !== STATE.CHASE) setState(STATE.CHASE, now);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let last = performance.now();
    const tick = (now) => {
      const elapsed = Math.min(40, now - last);
      last = now;
      const frame = elapsed / 16.67;

      const dt = now - s.lastMove;
      const distToCursor = Math.hypot(s.cursorX - s.x, s.cursorY - s.y);

      if (s.state === STATE.CHASE) {
        if (s.visible && dt > 2000 && distToCursor < 60) {
          setState(STATE.GRAB, now);
        }
      } else if (s.state === STATE.GRAB) {
        if (dt > 10000) setState(STATE.SLEEP, now);
        else if (now > s.nextWander) pickWander(now);
      }

      if (s.state === STATE.CHASE) {
        s.tx = s.cursorX;
        s.ty = s.cursorY;
      } else if (s.state === STATE.GRAB) {
        s.tx = s.wanderTx;
        s.ty = s.wanderTy;
      }

      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      const dist = Math.hypot(dx, dy);

      let ease;
      if (s.state === STATE.SLEEP) ease = 0;
      else if (s.state === STATE.GRAB) ease = 0.05;
      else ease = Math.min(0.13, 0.07 + dist / 3000);

      const vx = dx * ease;
      const vy = dy * ease;
      s.x += vx * frame;
      s.y += vy * frame;

      const speed = Math.hypot(vx, vy);
      if (Math.abs(vx) > 0.5) s.facing = vx > 0 ? 1 : -1;

      const moving = speed > 0.4;
      const running = speed > 1.8;

      const targetTilt = Math.min(8, speed * 0.6);
      s.bodyAngle += (targetTilt - s.bodyAngle) * 0.12 * frame;

      s.runPhase += (moving ? 0.18 + speed * 0.025 : 0.025) * frame;

      if (s.state === STATE.SLEEP) {
        s.sleepAmt = Math.min(1, s.sleepAmt + 0.05 * frame);
      } else {
        s.sleepAmt = Math.max(0, s.sleepAmt - 0.18 * frame);
      }
      const sleep = s.sleepAmt;

      const breathe =
        sleep > 0.5
          ? Math.sin(now / 1400) * 1.8
          : Math.sin(now / 900) * 0.7;
      const yLower = sleep * 14;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${s.x - 50}px, ${
          s.y - 40 + yLower + breathe
        }px, 0)`;
      }
      if (bodyRef.current) {
        const ang = (1 - sleep) * s.bodyAngle;
        bodyRef.current.style.transform = `scaleX(${s.facing}) rotate(${ang}deg)`;
      }

      if (headRef.current) {
        if (sleep > 0.1) {
          const drop = sleep * 6;
          const tilt = sleep * 12;
          headRef.current.setAttribute(
            "transform",
            `translate(${-3 * sleep} ${drop}) rotate(${tilt} 74 28)`
          );
        } else {
          const lookY = Math.max(-7, Math.min(6, dy * 0.04 * s.facing));
          const bob = moving ? Math.sin(s.runPhase * 2) * 0.9 : 0;
          headRef.current.setAttribute(
            "transform",
            `rotate(${lookY} 74 28) translate(0 ${bob})`
          );
        }
      }

      if (earFRef.current && earBRef.current) {
        const drive = moving
          ? Math.sin(s.runPhase + Math.PI / 2) * Math.min(24, 10 + speed * 4)
          : Math.sin(now / 1100) * 4;
        const drive2 = moving
          ? Math.sin(s.runPhase + Math.PI / 2 + 0.5) * Math.min(18, 7 + speed * 3)
          : Math.sin(now / 1000 + 0.4) * 3;
        const sleepDroop = sleep * 12;
        earFRef.current.setAttribute(
          "transform",
          `rotate(${drive + sleepDroop} 68 27)`
        );
        earBRef.current.setAttribute(
          "transform",
          `rotate(${drive2 - sleepDroop * 0.6} 68 18)`
        );
      }

      if (tailRef.current) {
        let rate, amp;
        if (sleep > 0.5) {
          rate = 1.5;
          amp = 5;
        } else if (s.state === STATE.GRAB) {
          rate = 18;
          amp = 38;
        } else if (running) {
          rate = 26;
          amp = 42;
        } else if (moving) {
          rate = 14;
          amp = 30;
        } else {
          rate = 6;
          amp = 24;
        }
        const a = Math.sin((now * rate) / 1000) * amp;
        tailRef.current.setAttribute("transform", `rotate(${a} 22 38)`);
      }

      const swingAmp = moving ? Math.min(20, 6 + speed * 3.5) : 0;
      const foldAmt = sleep * 55;
      for (let i = 0; i < 4; i++) {
        const r = legRefs[i].current;
        if (!r) continue;
        const swing = Math.sin(s.runPhase + legPhase[i]) * swingAmp * (1 - sleep);
        const foldDir = i < 2 ? -1 : 1;
        r.setAttribute(
          "transform",
          `rotate(${swing + foldDir * foldAmt} ${legCx[i]} 57)`
        );
      }

      if (lidLRef.current && lidRRef.current) {
        const op = String(sleep);
        lidLRef.current.style.opacity = op;
        lidRRef.current.style.opacity = op;
      }

      if (tongueRef.current) {
        const out =
          (running || s.state === STATE.GRAB) && sleep < 0.2 ? "1" : "0";
        tongueRef.current.style.opacity = out;
      }

      if (cursorRef.current && s.state === STATE.GRAB) {
        const mx = s.x + 36 * s.facing - 4;
        const my = s.y - 10 - 4;
        cursorRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }

      if (zRef.current) {
        if (sleep > 0.3) {
          const cycle = ((now - s.stateStart) / 2000) % 1;
          const zx = s.x + 32 * s.facing;
          const zy = s.y - 32 - cycle * 38;
          const op = (1 - cycle) * sleep;
          zRef.current.style.transform = `translate3d(${zx}px, ${zy}px, 0) scale(${
            0.6 + cycle * 0.5
          })`;
          zRef.current.style.opacity = String(op);
        } else {
          zRef.current.style.opacity = "0";
        }
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(s.raf);
      if (hideStyle.parentNode) hideStyle.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden
        className="no-print fixed top-0 left-0 pointer-events-none z-30 hidden md:block transition-opacity duration-500"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <div
          ref={bodyRef}
          style={{ transformOrigin: "50px 65px", willChange: "transform" }}
        >
          <ChubbyPoodle
            tailRef={tailRef}
            headRef={headRef}
            earFRef={earFRef}
            earBRef={earBRef}
            tongueRef={tongueRef}
            lidLRef={lidLRef}
            lidRRef={lidRRef}
            legRefs={[leg0, leg1, leg2, leg3]}
          />
        </div>
      </div>
      <svg
        ref={cursorRef}
        aria-hidden
        width="22"
        height="24"
        viewBox="0 0 22 24"
        className="no-print fixed top-0 left-0 pointer-events-none z-40 hidden md:block"
        style={{
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      >
        <path
          d="M 2 2 L 2 19 L 6 15 L 9 22 L 12 21 L 9 14 L 14 14 Z"
          fill="white"
          stroke="#1a1a2e"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <div
        ref={zRef}
        aria-hidden
        className="no-print fixed top-0 left-0 pointer-events-none z-30 hidden md:block font-serif text-2xl font-bold"
        style={{ opacity: 0, color: "#a08fc4", willChange: "transform" }}
      >
        z
      </div>
    </>
  );
}

function ChubbyPoodle({
  tailRef,
  headRef,
  earFRef,
  earBRef,
  tongueRef,
  lidLRef,
  lidRRef,
  legRefs,
}) {
  return (
    <svg
      width="100"
      height="75"
      viewBox="0 0 100 75"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="#fdfdff"
        stroke="#a08fc4"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <g ref={tailRef}>
          <ellipse cx="22" cy="38" rx="3.5" ry="4.5" />
          <circle cx="15" cy="30" r="7" />
          <circle cx="10" cy="26" r="3" />
        </g>
        <rect ref={legRefs[0]} x="27" y="57" width="6" height="13" rx="3" />
        <rect ref={legRefs[1]} x="35" y="57" width="6" height="13" rx="3" />
        <circle cx="28" cy="47" r="14" />
        <circle cx="40" cy="42" r="15" />
        <circle cx="52" cy="43" r="15" />
        <circle cx="64" cy="46" r="13" />
        <ellipse cx="60" cy="36" rx="6" ry="7" />
        <rect ref={legRefs[2]} x="55" y="57" width="6" height="13" rx="3" />
        <rect ref={legRefs[3]} x="63" y="57" width="6" height="13" rx="3" />
      </g>
      <g ref={headRef}>
        <g
          fill="#fdfdff"
          stroke="#a08fc4"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <g ref={earBRef}>
            <ellipse cx="68" cy="22" rx="4" ry="7" />
          </g>
          <circle cx="74" cy="28" r="12" />
          <circle cx="74" cy="14" r="6.5" />
          <circle cx="79" cy="10" r="3" />
          <g ref={earFRef}>
            <ellipse cx="68" cy="34" rx="5.5" ry="10" />
          </g>
          <ellipse cx="86" cy="32" rx="6.5" ry="4.5" />
        </g>
        <circle cx="72" cy="26" r="2.4" fill="#3a2c4d" />
        <circle cx="78" cy="26" r="2.4" fill="#3a2c4d" />
        <circle cx="72.7" cy="25.3" r="0.8" fill="white" />
        <circle cx="78.7" cy="25.3" r="0.8" fill="white" />
        <path
          ref={lidLRef}
          d="M 69 26 Q 72 28.5 75 26"
          stroke="#3a2c4d"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />
        <path
          ref={lidRRef}
          d="M 75 26 Q 78 28.5 81 26"
          stroke="#3a2c4d"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />
        <circle cx="69" cy="32" r="2.4" fill="#ffb8c8" opacity="0.55" />
        <circle cx="81" cy="32" r="2.4" fill="#ffb8c8" opacity="0.55" />
        <circle cx="90" cy="30" r="2.2" fill="#3a2c4d" />
        <path
          d="M 86 33 Q 88 34.5 90 33"
          stroke="#3a2c4d"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          ref={tongueRef}
          cx="89"
          cy="35"
          rx="2.2"
          ry="1.4"
          fill="#ff7aa8"
          style={{ opacity: 0, transition: "opacity 0.2s" }}
        />
      </g>
    </svg>
  );
}
