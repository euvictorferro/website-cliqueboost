import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { WeightLift } from "@/components/WeightLift";
import { FlowLoop } from "@/components/FlowLoop";
import { FaqList } from "@/components/FaqList";
import { StepsRow } from "@/components/StepsRow";
import { DashProofSection } from "@/components/DashProofSection";
import { CycleSystem } from "@/components/CycleSystem";
import { HeroTitle } from "@/components/HeroTitle";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HeroGlobe } from "@/components/HeroGlobe";
import { ChatPreview } from "@/components/ChatPreview";
import { ViralCases } from "@/components/ViralCases";
import { FinalCTA } from "@/components/FinalCTA";
import { DashMobileSection } from "@/components/DashMobileSection";
import { Testimonials } from "@/components/Testimonials";
import { ScheduleButton } from "@/components/ScheduleButton";
import { MOBILE_SCREENS } from "@/content/dashMobile";

export const metadata: Metadata = {
  title: "Clique Boost | Marketing for Brazilian professionals in the US",
  description:
    "Ads, AI customer follow-up, social media, websites, design and brand guidelines in one system, the BoostConnect method, for Brazilian professionals in the United States.",
  alternates: { canonical: "/en", languages: { "pt-BR": "/", "en-US": "/en" } },
};

/** Mesmo critério da versão em português: true só com o app publicado na App Store. */
const APP_STORE_LIVE = true;

export default function HomeEn() {
  return (
    <>
      <section className="relative cb-noise overflow-hidden">
        <HeroBackdrop />
        <div className="relative">
        <div className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28">
          <div className="relative w-full max-w-6xl mx-auto">
            <HeroGlobe className="absolute right-0 top-1/2 -translate-y-1/2 h-[min(100vh,780px)] w-full md:w-[58%] opacity-40 md:opacity-100" />
            <Reveal className="relative max-w-3xl pointer-events-none">
              <HeroTitle
                lines={["The ad brings the contact", "The follow-up decides", "if they become a client"]}
                accentFrom={1}
                srAfter={[".", "", "."]}
              />
              <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-xl mb-12">
                Clique Boost doesn't sell loose services. We build the system that takes the contact from the ad
                all the way to the sales conversation, for Brazilian professionals in the US. The AI replies and
                qualifies. A person closes.
              </p>
              <ScheduleButton className="pointer-events-auto cb-neon cb-press font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
                Book a call
              </ScheduleButton>
            </Reveal>
          </div>
        </div>
        </div>
      </section>

      <CycleSystem
        title="A system so the contact doesn't cool off on the way"
        steps={[
          { title: "Attract", description: "Content in formats that have already worked makes your name seen before the first contact." },
          { title: "Bring", description: "Ads bring the right contacts to your business." },
          { title: "Serve", description: "The AI replies and qualifies. A person steps in and closes." },
          { title: "Follow up", description: "You see the work in the Dash: Instagram metrics, content, tasks and calendar." },
        ]}
      />

      <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6">Chat with our assistant</h2>
            <p className="text-[var(--cb-muted)] text-lg leading-relaxed">
              See what AI customer service looks like. Here, the assistant introduces itself as AI, answers questions
              about Clique Boost and, whenever you want, hands the conversation over to a person. For your business, we
              design with you the name, the tone of voice and the flow.
            </p>
          </Reveal>
          <Reveal y={60} delay={0.15}>
            <ChatPreview
              lang="en"
              name="Virtual assistant"
              badge="AI"
              greeting="Hi! I'm Clique Boost's virtual assistant. I can explain how it works and, if you'd like, pass you to a person. What would you like to know?"
              replies={["How does it work?", "Which businesses is it for?", "I want to book a call"]}
              placeholder="Type your message"
              privacy="You are talking to an AI. Do not share passwords or card details."
            />
          </Reveal>
        </div>
      </section>

      <FlowLoop
        title="Ads and AI work together"
        items={[
          {
            title: "The ad brings",
            description: "Ads bring the right contacts to your business.",
          },
          {
            title: "The AI serves and qualifies",
            description: "It replies to the contact and asks the key questions. The flow is designed with you: if you prefer, the AI only qualifies and a person takes over. If the meeting doesn't close, the follow-up is also done by the AI.",
          },
          {
            title: "The cycle starts again",
            description: "We review what the customer service heard and adjust the next ad.",
          },
        ]}
      />

      <ViralCases
        title="Viral Method: formats that already worked, adapted to your niche"
        cases={[
          {
            title: "Realtor in Orlando",
            metric: "2 million",
            unit: "views",
            description: "A video passed 2 million views.",
          },
          {
            title: "Realtor in Florida",
            metric: "700 thousand",
            unit: "views",
            description: "A video passed 700 thousand views.",
          },
          {
            title: "Financial planning",
            metric: "300 thousand",
            unit: "views",
            description: "A video passed 300 thousand views, on a small profile.",
          },
        ]}
        total={{ value: 420000000, label: "accumulated views" }}
        note="Examples from our best-performing videos, between September and October 2026. Views measure reach, not sales. Results vary by profile."
      />

      <DashProofSection
        lang="en"
        tone="base"
        angle={APP_STORE_LIVE ? "It works in the browser and on mobile, and the app is available on the App Store." : "It works in the browser and on mobile, and the iPhone app is coming soon."}
      />

      <DashMobileSection lang="en" screens={MOBILE_SCREENS} live={APP_STORE_LIVE} appStoreHref="https://apps.apple.com/" />

      <WeightLift lang="en" title="What you stop carrying" />

      <FaqList
        title="Questions everyone asks"
        items={[
          {
            title: "I already have an agency or a team. Do I need to switch?",
            description: "Not necessarily. We start by looking at what you already have, and AI customer service can complement the work you already do.",
          },
          {
            title: "Is this a robot?",
            description: "It's a virtual assistant. It has the name and tone we define with you, and a person takes over the conversation when it's time. If someone asks, it tells the truth.",
          },
          {
            title: "Will the AI sound artificial to my client?",
            description: "We write the flow together with you, with your way of speaking and the right questions for your business, and we test it before going live.",
          },
          {
            title: "Which businesses is it for?",
            description: "For professionals in real estate, finance and insurance: realtors, insurance agents, mortgage brokers, financial advisors, accountants and interior designers.",
          },
          {
            title: "How much does it cost and how long does it take?",
            description: "It depends on what your business needs. In the conversation we show the path, and delivery timelines are agreed upfront.",
          },
        ]}
      />

      <StepsRow
        title="How we start"
        steps={[
          { title: "Diagnosis", description: "We map how your marketing works today, channel by channel." },
          { title: "Plan", description: "We design the strategy connecting the channels." },
          { title: "Execution", description: "Every team working with the same vision." },
          { title: "Follow-up", description: "One dashboard, one team, one strategy." },
        ]}
      />

      <Testimonials lang="en" />

      <FinalCTA
        title="Shall we look at how your contacts are handled today?"
        subtitle="In 30 minutes, we talk about your business and show how the BoostConnect would work for you."
        ctaLabel="Book a call"
      />
    </>
  );
}
