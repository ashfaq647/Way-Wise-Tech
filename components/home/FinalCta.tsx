import { AssetImage } from "@/components/ui/AssetImage";
import { assets } from "@/lib/assets";

const promises = ["We will respond to you within 24 hrs", "We’ll sign an NDA if requested."];

const team = [
  { name: "Firoz Bari", role: "Chairman", photo: assets.ctaChairman, tile: "bg-[#ffb8b0]" },
  { name: "Seung Lee", role: "CEO", photo: assets.ctaCeo, tile: "bg-[#c6cfff]" },
  { name: "Fiona Bari", role: "CFO", photo: assets.ctaCfo, tile: "bg-[#ffeff2]" },
];

const fieldStyles =
  "block w-full rounded-xl border border-[#b4bccd] bg-white px-4 text-[16px] text-[#0d1d44] transition-colors duration-200 placeholder:text-[#757575] focus:border-[#0d1d44] focus:outline-none";

const fields = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
];

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-[#f2e6d6]">
      <AssetImage
        src={assets.ctaBackground}
        alt=""
        sizes="(max-width: 767px) 640vw, (max-width: 1023px) 300vw, 100vw"
        className="object-cover"
      />

      <div className="relative mx-auto grid w-full max-w-[1344px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:min-h-[clamp(720px,56.25vw,1080px)] lg:grid-cols-[minmax(0,754fr)_minmax(0,550fr)] lg:gap-0 lg:py-12 xl:px-5">
        <div className="min-w-0 lg:pr-6">
          <h2
            id="final-cta-heading"
            className="text-[clamp(32px,8.6vw,56px)] leading-[1.094] font-semibold text-[#0d1d44] lg:text-[clamp(40px,3.333vw,64px)]"
          >
            Have a Project Idea?
            <br />
            <span className="text-brand">Let’s get started</span>
          </h2>
          <p className="mt-[19px] max-w-[29.5em] text-[18px] leading-[1.45] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.25vw,24px)] lg:leading-[1.333]">
            We&apos;ll schedule a call to discuss your idea. After discovery sessions, we&apos;ll
            send a proposal, and upon approval, we&apos;ll get started.
          </p>

          <ul className="mt-[19px] space-y-2.5">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex items-center gap-3 text-[17px] leading-[30px] text-[#1b3447] lg:text-[clamp(17px,1.25vw,24px)]"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-[#067717]"
                >
                  <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.75" />
                  <path
                    d="m6.5 10.8 2.8 2.8 5.2-5.6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {promise}
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid max-w-[622px] grid-cols-3 gap-2 sm:gap-[17px] lg:mt-[38px]">
            {team.map((person) => (
              <li key={person.name} className="rounded-lg bg-white p-2 sm:p-4 sm:pb-[15px]">
                <div
                  className={`relative aspect-[330/358] overflow-hidden rounded-lg ${person.tile}`}
                >
                  <AssetImage
                    src={person.photo}
                    alt={person.name}
                    sizes="(min-width: 640px) 165px, 28vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-[15px] text-[15px] leading-6 font-medium text-[#1b3447] sm:text-[20px]">
                  {person.name}
                </p>
                <p className="mt-[3px] text-[13px] leading-[22px] text-[#3d4e5c] sm:text-[16px]">
                  {person.role}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual only: there is no form backend yet, so nothing typed here is sent anywhere. */}
        <form className="rounded-[20px] bg-white p-5 sm:p-10 sm:pt-[31px]">
          <h3 className="text-center text-[24px] leading-[1.15] font-semibold text-[#0d1d44] sm:text-[32px] sm:leading-9 lg:text-[clamp(24px,1.667vw,32px)] lg:leading-[1.125]">
            Lets Talk About Your Next
            <br />
            Project with Expert
          </h3>
          <p className="mt-[25px] text-center text-[15px] leading-6 text-[#0d1d44] sm:text-[17px]">
            Provide your project details, and we&apos;ll contact you shortly.
          </p>

          <div className="mt-[23px] space-y-5">
            {fields.map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                aria-label={field.label}
                placeholder={field.label}
                autoComplete={field.autoComplete}
                className={`${fieldStyles} h-12`}
              />
            ))}
            <textarea
              name="details"
              aria-label="Project Details"
              placeholder="Project Details"
              rows={3}
              className={`${fieldStyles} h-[98px] resize-none py-3`}
            />
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center rounded-[14px] bg-brand px-4 text-center text-[14px] leading-5 font-semibold text-white uppercase transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-[16px]"
            >
              Start Our Free Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
