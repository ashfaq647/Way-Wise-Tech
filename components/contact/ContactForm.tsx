import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { contactMessage, contactOffices, type ContactField } from "@/lib/content/contact";

/*
  Every size is the design's 1920 value times --u: 1px at 1920, scaling with the width down to 1280
  (two cards side by side, as drawn), then fixed steps on the stacked layout below xl. Font sizes
  have readable minimums, and inputs never go under 16px, so phones do not zoom on focus.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

const control =
  "block w-full rounded-[calc(var(--u)*8)] border border-[#c7cdd9] bg-white px-[calc(var(--u)*20)] text-[max(16px,calc(var(--u)*19))] text-navy transition-colors duration-200 placeholder:text-steel focus:border-navy focus:outline-none";

/** Office details icons, drawn to the reference in a 36x26 box: one text line plus its gutter. */
function InfoIcon({ name }: { name: "pin" | "phone" | "clock" }) {
  return (
    <svg viewBox="0 0 36 26" aria-hidden="true" className="h-[1.3em] w-[1.8em] shrink-0" fill="currentColor">
      {name === "pin" && (
        <path
          fillRule="evenodd"
          d="M9 20.1C6.3 17.4 1.7 13.5 1.7 9.6a7.3 7.3 0 0 1 14.6 0c0 3.9-4.6 7.8-7.3 10.5Zm0-8.7a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3Z"
        />
      )}
      {name === "phone" && (
        <path
          transform="translate(-0.9 3.4) scale(0.81 0.86)"
          d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.98.98 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99Z"
        />
      )}
      {name === "clock" && (
        <g fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="9" cy="13.9" r="7.1" />
          <path d="M9 9.9v4.4h3" strokeLinecap="square" />
        </g>
      )}
    </svg>
  );
}

function Field({ field }: { field: ContactField }) {
  const id = `contact-${field.name}`;
  return (
    <div className={field.type === "textarea" ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="block text-[max(17px,calc(var(--u)*20))] leading-[1.25] font-medium tracking-[-0.01em] text-black"
      >
        {field.label}
        {field.required && (
          <span aria-hidden="true" className="text-brand">
            {" "}
            *
          </span>
        )}
      </label>
      <div className="relative mt-[calc(var(--u)*11.2)]">
        {field.type === "textarea" ? (
          <textarea
            id={id}
            name={field.name}
            required={field.required}
            placeholder={field.placeholder}
            className={`${control} h-[max(120px,calc(var(--u)*153))] resize-none py-[calc(var(--u)*13.5)]`}
          />
        ) : field.type === "select" ? (
          <>
            <select
              id={id}
              name={field.name}
              required={field.required}
              defaultValue=""
              className={`${control} h-[max(44px,calc(var(--u)*55))] cursor-pointer appearance-none pr-[calc(var(--u)*56)] text-steel`}
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 14 7"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-[calc(var(--u)*24)] h-[calc(var(--u)*7)] min-h-[6px] w-[calc(var(--u)*14)] min-w-[12px] -translate-y-1/2 text-ink"
            >
              <path d="m0.6 0.6 6.4 5.8 6.4-5.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </>
        ) : (
          <input
            id={id}
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            className={`${control} h-[max(44px,calc(var(--u)*55))]`}
          />
        )}
      </div>
    </div>
  );
}

/**
 * "Send Us a Message" and "Our Offices" on the Contact Us page, from Frame 2147239030.png (2026-11-17, 942
 * frame). At 1920 two white cards, 820px and 660px wide and 40px apart in a 1520px row from x 180 (as
 * drawn), each its own height, sit on #f4f0e9; the offices card has a 1px #d0d8e0
 * border. Below xl the cards stack, the form fields are two across from sm, and each office photo
 * stays beside its details.
 */
export function ContactForm() {
  const { eyebrow, heading, description, fields, submitLabel } = contactMessage;
  const offices = contactOffices;
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-message-heading contact-offices-heading"
      className={`bg-[#f4f0e9] ${unit}`}
    >
      <Container className="py-12 md:py-16 xl:py-[calc(var(--u)*65)]">
        {/* The cards keep their own heights, as drawn (806 and 812px at 1920). */}
        <div className="grid gap-6 xl:max-w-[calc(var(--u)*1520)] xl:grid-cols-[minmax(0,820fr)_minmax(0,660fr)] xl:items-start xl:gap-[calc(var(--u)*40)]">
          {/* Form card. Visual only: there is no form backend, so nothing typed here is sent. */}
          <Reveal
            each
            className="rounded-2xl bg-white p-5 sm:p-8 xl:rounded-[calc(var(--u)*16)] xl:px-[calc(var(--u)*40)] xl:pt-[calc(var(--u)*27.5)] xl:pb-[calc(var(--u)*29)]"
          >
            <SectionEyebrow weight="bold" tracking="0.06em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="contact-message-heading"
              className="mt-3 text-[clamp(28px,8.2vw,calc(var(--u)*40))] leading-[1.2083] font-semibold tracking-[-0.02em] text-navy xl:mt-[calc(var(--u)*9.25)]"
            >
              <MaskLine order={1}>
                {heading.first} <span className="text-brand">{heading.second}</span>
              </MaskLine>
            </h2>
            <p
              style={revealOrder(2)}
              className="ww-rise mt-3 text-[max(16px,calc(var(--u)*20))] leading-[1.6] text-ink-muted xl:mt-[calc(var(--u)*3.4)]"
            >
              {description}
            </p>

            <form aria-labelledby="contact-message-heading" style={revealOrder(3)} className="ww-rise">
              <div className="mt-6 grid gap-x-[calc(var(--u)*20)] gap-y-5 sm:grid-cols-2 xl:mt-[calc(var(--u)*23.3)] xl:gap-y-[calc(var(--u)*23.8)]">
                {fields.map((field) => (
                  <Field key={field.name} field={field} />
                ))}
              </div>
              <button
                type="button"
                className="mt-6 h-[max(48px,calc(var(--u)*56))] w-full rounded-[calc(var(--u)*12)] bg-brand text-[max(16px,calc(var(--u)*17))] font-semibold tracking-[0.035em] text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy xl:mt-[calc(var(--u)*23.5)]"
              >
                {submitLabel}
              </button>
            </form>
          </Reveal>

          {/* Offices card. */}
          <Reveal
            each
            className="rounded-2xl border border-[#d0d8e0] bg-white p-5 sm:p-8 xl:rounded-[calc(var(--u)*16)] xl:px-[calc(var(--u)*40)] xl:pt-[calc(var(--u)*37.5)] xl:pb-[calc(var(--u)*40)]"
          >
            <SectionEyebrow weight="bold" tracking="0.06em" className="ww-rise">
              {offices.eyebrow}
            </SectionEyebrow>
            <h2
              id="contact-offices-heading"
              className="mt-3 text-[clamp(28px,8.2vw,calc(var(--u)*40))] leading-[1.2083] font-semibold tracking-[-0.02em] text-navy xl:mt-[calc(var(--u)*13.25)] min-[1360px]:whitespace-nowrap"
            >
              {/* One line from 1360px (as drawn at 1920; below that its 28px minimum would not fit), wrapping naturally on narrower cards. */}
              <MaskLine order={1}>
                {offices.heading.first}{" "}
                <span className="text-brand">{`${offices.heading.accent} ${offices.heading.second}`}</span>
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-3 text-[max(16px,calc(var(--u)*20))] leading-[1.6] text-ink-muted xl:mt-[calc(var(--u)*15.4)]"
            >
              {offices.description}
            </p>

            <ul className="mt-6 xl:mt-[calc(var(--u)*23.5)]">
              {offices.offices.map((office, index) => (
                <li
                  key={office.name}
                  style={revealOrder(index)}
                  className={`ww-rise flex items-start gap-4 sm:gap-[calc(var(--u)*24)] ${
                    index > 0 ? "mt-5 border-t border-[#e1e1e1] pt-5 xl:mt-[calc(var(--u)*24)] xl:pt-[calc(var(--u)*24)]" : ""
                  }`}
                >
                  <div
                    style={{ aspectRatio: `${office.image.width} / ${office.image.height}` }}
                    className="relative h-[88px] shrink-0 sm:h-[calc(var(--u)*150)]"
                  >
                    <AssetImage
                      src={office.image.src}
                      alt={office.image.alt}
                      sizes="(min-width: 1280px) 151px, (min-width: 640px) 136px, 88px"
                      className="object-contain"
                    />
                  </div>
                  {/* Its last line ends 0.8px below the photo; the design spaces the rows by the photo alone. */}
                  <div className="min-w-0 flex-1 xl:-mb-[calc(var(--u)*0.8)] xl:pt-[calc(var(--u)*1.3)]">
                    <h3 className="text-[max(18px,calc(var(--u)*24))] leading-[1.25] font-semibold text-[#043461]">
                      {office.name}
                    </h3>
                    <ul className="mt-1.5 space-y-[calc(var(--u)*4)] text-[max(15px,calc(var(--u)*20))] leading-[1.3] text-ink-muted xl:mt-[calc(var(--u)*7.5)]">
                      <li className="flex">
                        <InfoIcon name="pin" />
                        <span className="min-w-0">
                          <span className="sr-only">Address: </span>
                          {office.address}
                        </span>
                      </li>
                      <li className="flex">
                        <InfoIcon name="phone" />
                        <span className="min-w-0">
                          <span className="sr-only">Phone: </span>
                          {office.phone}
                        </span>
                      </li>
                      <li className="flex">
                        <InfoIcon name="clock" />
                        <span className="min-w-0">
                          <span className="sr-only">Hours: </span>
                          {office.hours}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
