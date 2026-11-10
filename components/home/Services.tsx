import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";

const services = [
  {
    title: "UI/UX & Product Design",
    href: "/services/ui-ux-product-design",
    description:
      "We create clean, modern, and easy-to-use designs that help businesses deliver better digital experiences.",
    image: assets.serviceUiUx,
    alt: "Tablet and desktop monitor showing interface designs",
  },
  {
    title: "Custom Software Development",
    href: "/services/custom-software-development",
    description:
      "We build custom software that simplifies daily work, improves efficiency, and supports your business growth.",
    image: assets.serviceCustomSoftware,
    alt: "Monitor, laptop and phone showing code and software screens beside a server stack",
  },
  {
    title: "Web Development",
    href: "/services/web-development",
    description:
      "We develop fast, secure, and responsive websites that help businesses attract customers and grow online.",
    image: assets.serviceWeb,
    alt: "Desktop monitor showing a website beside a code editor",
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    description:
      "We build user-friendly iOS and Android apps that make your services easy to access anywhere.",
    image: assets.serviceMobile,
    alt: "Two phones showing a property app with app store icons",
  },
  {
    title: "AI, Data & Automation",
    href: "/services/ai-data-automation",
    description:
      "We create smart AI solutions that automate tasks, improve decisions, and help businesses save time.",
    image: assets.serviceAi,
    alt: "Laptop showing a data dashboard beside a small robot",
  },
  {
    title: "Branding & Digital Growth",
    href: "/services/branding-digital-growth",
    description:
      "We help businesses improve their online visibility through SEO, branding, and digital marketing strategies.",
    image: assets.serviceBranding,
    alt: "Laptop and phone showing a brand website with a camera and marketing icons",
  },
];

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="bg-[#eae2dd]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[60px] lg:pb-[63px] xl:px-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:gap-0">
          <div>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[18px]">
              <span className="h-[3px] w-[22px] shrink-0 bg-brand" aria-hidden="true" />
              Our Services
            </p>
            <h2
              id="services-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:text-[clamp(34px,2.71vw,52px)]"
            >
              From First Idea to
              <br />
              Scalable <span className="text-brand">Digital Product</span>
            </h2>
          </div>

          <div className="lg:pt-3.5">
            <p className="text-[18px] leading-[1.45] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
              From design and development to AI and digital growth, we help businesses build better
              digital products.
            </p>
            <ButtonLink
              href="#"
              variant="outline"
              className="mt-4 h-[51px] px-6 text-[18px] lg:text-[20px]"
            >
              View All Services
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-[25px] xl:gap-x-10">
          {services.map((service) => (
            <li key={service.title}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.18)] transition-[translate,box-shadow] duration-300 ease-out focus-within:shadow-[0_8px_20px_rgba(35,31,32,0.1)] hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:focus-within:-translate-y-1 motion-safe:hover:-translate-y-1">
                <div className="relative aspect-[987/400]">
                  <AssetImage
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pt-5 pb-6 xl:px-10">
                  <h3 className="text-[20px] leading-[1.286] font-semibold text-ink lg:text-[clamp(20px,1.458vw,28px)]">
                    {/*
                      The title is the link; its ::after covers the whole card, so the card is
                      clickable while the article and its focus-within lift stay as they were.
                    */}
                    <Link
                      href={service.href}
                      className="outline-none after:absolute after:inset-0 after:rounded-2xl after:outline-offset-[-3px] focus-visible:after:outline-2 focus-visible:after:outline-ink"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[17px] leading-[1.5] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(15px,1.042vw,20px)]">
                    {service.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
