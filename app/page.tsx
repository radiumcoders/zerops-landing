import Navbar from "@/components/core/navbar"
import HeroGlobe from "@/components/core/hero-globe"
import WorksWithMarquee from "@/components/core/works-with-marquee"
import { Button } from "@/components/ui/button"
import SvgDividerHorizontal, {
  SvgDividerVertical,
} from "@/components/utils/svg-line"

export default function Page() {
  return (
    <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col overflow-x-hidden">
      <SvgDividerVertical className="left-0 hidden md:block" />
      <SvgDividerVertical className="right-0 hidden md:block" />
      <Navbar />
      <div className="flex h-full w-full flex-1 flex-col p-2 sm:p-3">
        <div className="general relative flex w-full flex-col items-center justify-center gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 lg:p-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="w-full text-center text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Cloud That Respects Developers
              </h1>
              <h1 className="w-fit max-w-full px-2 text-center text-3xl tracking-tighter text-brand bg-brand-muted sm:text-4xl md:text-5xl lg:text-6xl dark:bg-brand/10">
                Human And AI
              </h1>
            </div>
            <p className="mx-auto w-full max-w-2xl text-center text-sm tracking-tighter font-sans sm:text-base">
              Full Linux containers, managed services, and a private network —
              from agent environments to HA prod, only the scale changes.
            </p>
          </div>

          <div className="flex h-fit w-full max-w-md items-center justify-center sm:max-w-none">
            <Button
              size="lg"
              className="w-full font-sans text-sm font-semibold text-background sm:w-auto sm:text-base"
            >
              Try Now With Free $65 Credits
            </Button>
          </div>
          <SvgDividerHorizontal className="bottom-0" />
        </div>

        <section className="relative mt-auto flex min-h-[36svh] flex-1 flex-col justify-end overflow-hidden sm:min-h-[44svh] lg:min-h-[50svh]">
          <HeroGlobe />

          <div className="relative z-10 w-full p-2">
            <WorksWithMarquee />
          </div>
        </section>
      </div>
    </div>
  )
}
