import Navbar from "@/components/core/navbar"
import HeroGlobe from "@/components/core/hero-globe"
import WorksWithMarquee from "@/components/core/works-with-marquee"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SvgDividerHorizontal, {
  SvgDividerVertical,
} from "@/components/utils/svg-line"

export default function Page() {
  return (
    <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col">
      <SvgDividerVertical className="left-0" />
      <SvgDividerVertical className="right-0" />
      <Navbar />
      <div className="flex h-full w-full flex-1 flex-col p-2">
        <div className="general relative flex w-full flex-col items-center justify-center gap-4 p-10">
          <div>
            <h1 className="w-full text-center text-6xl font-semibold tracking-tighter">
              Cloud That Respects Developers
            </h1>
            <h1 className="w-full text-center text-6xl font-semibold tracking-tighter">
              Human Or AI
            </h1>
          </div>
          <p className="mx-auto w-full max-w-2xl text-center">
            Full Linux containers, managed services, and a private network —
            from agent environments to HA prod, only the scale changes.
          </p>

          <div className="flex h-fit w-full items-center justify-center gap-2">
            <Input
              placeholder="Is Zerops For You?"
              className="max-w-2xl border border-border bg-background text-2xl"
            />
            <Button>Ask Zerops AI</Button>
          </div>
          <SvgDividerHorizontal className="bottom-0" />
        </div>

        <section className="relative mt-auto flex min-h-[50svh] flex-1 flex-col justify-end overflow-hidden">
          <HeroGlobe />

          <div className="relative z-10 w-full p-2">
            <WorksWithMarquee />
          </div>
        </section>
      </div>
    </div>
  )
}