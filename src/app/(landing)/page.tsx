import { MaxWidthWrapper } from "@/components/utils/max-width-wrapper"
import { Check } from "lucide-react"
import { ShinyButton } from "@/components/utils/shiny-button"
import { Heading } from "@/components/utils/heading"

const Page = () => {

  return (
    <>
      <section className="relative py-24 sm:py-9 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Smart Fashion Management,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Streamlining Your Operations Effortlessly
                </span>
              </Heading>
            </div>

            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              <span>April</span><span className="italic">Wind</span> is the smartest way to manage your fashion business, 
              helping you streamline{" "}
              <span className="font-semibold text-gray-700">
                orders, client updates, and overall operations
              </span>{" "}
              with ease and efficiency.
            </p>

            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {[
                "Instant insights into crucial business activities",
                "Track sales, new orders, or any other event",
                "Operational efficiency",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-in"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Go to Dashboard
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page