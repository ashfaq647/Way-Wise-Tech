import type { CSSProperties } from "react";
import "./motion.css";

/**
 * Separate letter boxes lose the font's kerning, which widened these labels by up to 5px. This puts
 * it back, in em, measured from Outfit for the current labels. A new label with other tight pairs
 * would still work, only slightly wider.
 */
const KERNING: Record<string, number> = {
  ta: -0.013,
  rt: -0.015,
  " Y": -0.028,
  Yo: -0.145,
  ro: -0.032,
  ct: -0.008,
  re: -0.032,
  Se: -0.005,
  rv: -0.023,
  ce: -0.0105,
  Co: -0.013,
  nt: -0.006,
  et: -0.0115,
  " T": -0.016,
  To: -0.122,
};

/**
 * A link label whose letters roll upward one after another when the link is hovered or focused.
 * CSS only. Screen readers get the plain text, not the separate letters.
 */
export function StaggerText({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <span className="ww-stagger">
      <span className="sr-only">{text}</span>
      <span className="ww-stagger__text" aria-hidden="true">
        {characters.map((character, index) => {
          const kerning = KERNING[character + characters[index + 1]];
          return (
            <span
              key={index}
              className="ww-stagger__char"
              style={
                {
                  "--ww-c": index,
                  marginRight: kerning ? `${kerning}em` : undefined,
                } as CSSProperties
              }
            >
              {character}
            </span>
          );
        })}
      </span>
    </span>
  );
}
