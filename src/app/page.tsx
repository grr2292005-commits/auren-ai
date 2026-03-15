import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { ResourceEstimator } from "@/components/sections/resource-estimator";
import Reviews from "@/components/sections/reviews";
import { PromptPlayground } from "@/components/sections/prompt-playground";
import { Pricing } from "@/components/sections/pricing";
import { Team } from "@/components/sections/team";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <Hero />

      {/* Trust Strip */}
      <section className="py-12 border-y border-white/5 bg-black/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">Empowering teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale contrast-125">
            <span className="text-xl font-bold">STELLAR</span>
            <span className="text-xl font-bold">NOVA</span>
            <span className="text-xl font-bold">QUANTUM</span>
            <span className="text-xl font-bold">ORBIT</span>
            <span className="text-xl font-bold">VORTEX</span>
          </div>
        </div>
      </section>

      <Features />

      <Reviews />

      {/* Workflow Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                A new way to <br /> reason with AI.
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Think deeply with reasoned paths",
                    description: "Toggle on reasoning mode to guide the model through multi-step logic and validation."
                  },
                  {
                    title: "Ship components instantly",
                    description: "Use the canvas to draft, iterate, and preview UI components in real-time."
                  },
                  {
                    title: "Connect your entire stack",
                    description: "Deep integration with your repositories, docs, and team workflows."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold border border-amber-500/30">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full" />
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200"
                  alt="Workflow Illustration"
                  className="rounded-lg w-full h-[400px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResourceEstimator />
      <Team />

      <PromptPlayground />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}

