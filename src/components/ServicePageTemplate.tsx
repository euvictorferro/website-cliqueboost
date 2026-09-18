import { ServiceHero } from "./ServiceHero";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { DashProofSection } from "./DashProofSection";
import { ProcessSteps } from "./ProcessSteps";
import { FinalCTA } from "./FinalCTA";
import type { ServiceContent } from "@/content/services";

export function ServicePageTemplate({ content }: { content: ServiceContent }) {
  return (
    <>
      <ServiceHero eyebrow={content.eyebrow} title={content.title} painHook={content.painHook} />
      <ProblemSection title={content.problem.title} points={content.problem.points} />
      <SolutionSection title={content.solution.title} items={content.solution.items} />
      <DashProofSection angle={content.dashAngle} />
      <ProcessSteps title={content.process.title} steps={content.process.steps} />
      <FinalCTA title={content.cta.title} subtitle={content.cta.subtitle} />
    </>
  );
}
