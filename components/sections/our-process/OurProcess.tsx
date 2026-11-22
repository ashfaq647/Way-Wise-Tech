"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { ourProcess } from "@/lib/content/process";
import { ProcessJourney, ProcessPill } from "./ProcessJourney";

/** Each icon is drawn in the coordinates of its 104px circle, so it scales and centres with it. */
function StepIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 104 104"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 size-full text-black duration-300 ease-out motion-safe:transition-[scale] motion-safe:group-hover/step:scale-[1.08] motion-safe:group-data-[state=active]/step:scale-[1.08] motion-safe:group-data-[state=done]/step:scale-[1.08]"
    >
      {children}
    </svg>
  );
}

/** Each step's circle colour and icon, in the same order as `ourProcess.steps`. */
const stepVisuals = [
  {
    circle: "bg-[#ecd4ba]",
    icon: (
      <g transform="translate(32 29)">
        <path
          d="M14 34.5 13.4 32.2 9.1 26.4a14 14 0 1 1 21.8 0l-4.3 5.8-.6 2.3"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M18 23.8h4v9.7h6v7.3q0 3-3 3H15q-3 0-3-3v-7.3h6zm-2 14v2h8v-2z"
        />
      </g>
    ),
  },
  {
    circle: "bg-[#f7c6c5]",
    icon: (
      <g transform="translate(37 35)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.4 3.3H20l6.8 6.9v18.2q0 1.7-1.7 1.7H4.5q-1.7 0-1.7-1.7V5q0-1.7 1.6-1.7zm1.15 2.8v21.2H24.1V12.75h-6.66V6.1z"
        />
        <path
          fill="currentColor"
          d="M9.55 10.1h3.9v2.67h-3.9zm-.1 5.23H20.1v2.77H9.45zm0 5.47H20.1v2.5H9.45z"
        />
      </g>
    ),
  },
  {
    circle: "bg-[#b7cdfc]",
    icon: (
      <g transform="translate(34 37)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.75 2.78h25.6q.53 0 .53.53v18.93q0 .53-.53.53H4.75q-.53 0-.53-.53V3.31q0-.53.53-.53zm2.13 2.55v14.79h21.34V5.33z"
        />
        <path fill="currentColor" d="M2.89 24.12H32.2v2.65H2.89z" />
      </g>
    ),
  },
  {
    circle: "bg-[#80d1ae]",
    icon: (
      <g transform="translate(34 41)" stroke="currentColor" strokeWidth="2.75">
        <path d="M10.75 4.35 4.27 10.83l6.38 6.37" />
        <path d="M26.25 4.35 32.6 10.7l-6.45 6.45" />
      </g>
    ),
  },
  {
    circle: "bg-[#c5b6f2]",
    icon: (
      <g transform="translate(35 37)">
        <path
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinejoin="round"
          d="M10 13.1 15.6 7C17.8 4.6 22 3.9 25.7 5c1 2 1.7 4.5 1.3 6.5-.3 2-.7 3-1.4 4.1l-5 5.1c-.9 2-1.1 4.3-1.5 6.2l-4.5-3.3-9.8-9.5z"
        />
        <circle cx="19.9" cy="11.9" r="2.7" fill="currentColor" />
        <path
          fill="currentColor"
          d="M6 19.6l2.8 2.1v2.2l4.1.1.1 1.3c-2 1.6-4.5 1.7-5.8.7-1-.8-1.2-2-1.2-3.5z"
        />
      </g>
    ),
  },
];

const steps = ourProcess.steps.map((step, index) => ({ ...step, ...stepVisuals[index] }));

/*
  One design on every page (owner, 2026-11-17), from `Frame 2147239038.png` (1920x942): the content
  centred in a 942px frame, an 18px eyebrow, a 53.5px heading on 60px lines, the description on the
  heading's bottom line, then the five steps.
*/
const l = {
  section: "flex items-center bg-[#faf5f1] lg:min-h-[clamp(628px,49.0625vw,942px)]",
  header: "grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:items-end lg:gap-0",
  eyebrow: "lg:text-[clamp(14px,0.9375vw,18px)] lg:tracking-[0.09em]",
  heading: "lg:mt-2 lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.1215]",
  description: "lg:mb-[clamp(9px,0.729vw,14px)]",
  steps: "lg:mt-[46px]",
};

export function OurProcess() {
  const panel = useRef<HTMLDivElement>(null);

  // Handled on the list, so the panel stays put while the pointer crosses the gap between steps.
  const movePanel = (event: PointerEvent<HTMLOListElement>) => {
    const box = panel.current;
    const step = (event.target as Element).closest("li");
    if (!box || !step || event.pointerType === "touch") return;
    const index = Array.from(event.currentTarget.children).indexOf(step);
    // A pointer over the steps takes the panel; ProcessRope leaves it alone until the pointer leaves.
    box.setAttribute("data-hover", "");

    // Coming from outside the list, it appears at the step instead of sliding across from the last one.
    if (!box.hasAttribute("data-active")) {
      box.style.transition = "opacity 250ms ease-out";
      box.style.setProperty("--ww-step", String(index));
      void box.offsetWidth;
      box.style.transition = "";
      box.setAttribute("data-active", "");
    } else {
      box.style.setProperty("--ww-step", String(index));
    }
  };

  // When the pointer leaves, the panel returns to the step the scroll rope has reached (if any).
  const releasePanel = () => {
    const box = panel.current;
    if (!box) return;
    box.removeAttribute("data-hover");
    const scrollStep = box.dataset.scrollStep;
    if (scrollStep === undefined) box.removeAttribute("data-active");
    else box.style.setProperty("--ww-step", scrollStep);
  };

  return (
    <section
      aria-labelledby="our-process-heading"
      className={l.section}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-12 lg:pb-[49px] xl:px-5">
        <Reveal className={l.header}>
          <div>
            <p className={`ww-rise flex items-center gap-2 text-[16px] leading-5 font-bold tracking-[0.09em] text-brand uppercase ${l.eyebrow}`}>
              <span
                className="h-[3px] w-[22px] shrink-0 -translate-y-px bg-brand"
                aria-hidden="true"
              />
              {ourProcess.eyebrow}
            </p>
            <h2
              id="our-process-heading"
              className={`mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-[#0d1d44] ${l.heading}`}
            >
              <MaskLine order={1}>{ourProcess.heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {ourProcess.heading.accent}
              </MaskLine>
            </h2>
          </div>

          <p
            style={revealOrder(3)}
            className={`ww-rise text-[18px] leading-[1.45] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)] ${l.description}`}
          >
            {ourProcess.description}
          </p>
        </Reveal>

        <Reveal className={`group/steps relative mt-10 ${l.steps}`}>
          <div ref={panel} className="ww-process__panel" aria-hidden="true" />
          <ProcessJourney />
          <ol
          onPointerOver={movePanel}
          onPointerLeave={releasePanel}
          className="relative grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12 xl:grid-cols-5 xl:gap-x-[clamp(32px,3.333vw,64px)]"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              style={{ transitionDelay: `${index * 110}ms` }}
              className="group/step min-w-0 duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-data-[reveal=pending]/steps:translate-y-4 motion-safe:group-data-[reveal=pending]/steps:opacity-0 motion-safe:group-data-[reveal=running]/steps:transition-[opacity,translate]"
            >
              <div
                className={`relative size-[104px] rounded-full duration-300 ease-out motion-safe:transition-[translate,box-shadow] motion-safe:group-hover/step:-translate-y-1 motion-safe:group-hover/step:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_rgb(35_31_32/0.12)] motion-safe:group-data-[state=active]/step:-translate-y-1 motion-safe:group-data-[state=active]/step:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_rgb(35_31_32/0.12)] motion-safe:group-data-[state=done]/step:-translate-y-1 motion-safe:group-data-[state=done]/step:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_rgb(35_31_32/0.12)] after:pointer-events-none after:absolute after:-inset-2 after:scale-90 after:rounded-full after:border-2 after:border-[#24a872]/50 after:opacity-0 after:transition-[opacity,scale] after:duration-500 group-data-[state=active]/step:after:scale-100 group-data-[state=active]/step:after:opacity-100 ${step.circle}`}
              >
                <StepIcon>{step.icon}</StepIcon>
              </div>
              {/* Journey states (ProcessJourney): steps not reached yet rest dimmed; a completed step's number turns green. */}
              <div className="transition-opacity duration-500 ease-out group-data-[state=todo]/step:opacity-45">
                <p
                  style={{ transitionDelay: `${index * 110 + 120}ms` }}
                  className="mt-6 text-[28px] leading-10 font-medium text-black duration-500 ease-out group-data-[state=done]/step:text-[#24a872] group-data-[state=active]/step:text-[#24a872] motion-safe:group-data-[reveal=pending]/steps:opacity-0 motion-safe:group-data-[reveal=running]/steps:transition-opacity lg:text-[clamp(26px,1.667vw,32px)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-[24px] leading-9 font-medium text-black lg:text-[clamp(20px,1.458vw,28px)]">
                  {step.title}
                </h3>
                <p className="mt-[23px] text-[17px] leading-[1.364] text-[#3d4e5c] max-[1599px]:text-pretty lg:text-[clamp(16px,1.146vw,22px)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
          </ol>
          <ProcessPill />
        </Reveal>
      </div>
    </section>
  );
}
