import type { ServiceContent } from "@/content/services";

/** Páginas de serviço em inglês (/en/services/...). A chave é o mesmo slug da versão em português, que usa o Dash. */
export const SERVICES_EN: Record<string, ServiceContent> = {
  websites: {
    slug: "websites",
    title: "Your website is turning clients away before the first message",
    painHook: "If your site still looks like a 2015 business card, that is what the market reads about your business.",
    problem: {
      title: "A slow, generic site costs you opportunities every day",
      points: [
        "Visitors leave before they understand what you do",
        "Without optimization, Google simply does not show you",
        "A contact form nobody fills out",
        "No connection with the rest of your marketing",
      ],
    },
    solution: {
      title: "A website that works together with your strategy, not apart from it",
      items: [
        { title: "Custom design", description: "Visual identity applied with intention, not a generic template." },
        { title: "Real performance", description: "Fast loading and technical SEO from the first deploy." },
        { title: "Built into the funnel", description: "Connected to your traffic campaigns and automations." },
      ],
    },
    dashAngle: "On Websites, this means seeing where your visits come from and how many become leads.",
    process: {
      title: "How it works",
      steps: [
        { title: "Diagnosis", description: "We understand your audience, goal and competition." },
        { title: "Design & content", description: "We build the visual story of the site." },
        { title: "Development", description: "We build it with performance and SEO from the ground up." },
        { title: "Launch", description: "We publish it and track the first results." },
      ],
    },
    cta: {
      title: "Ready for a website that matches your business?",
      subtitle: "Talk to a consultant and see how we can build yours.",
    },
  },
  trafego: {
    slug: "trafego",
    title: "Spending on ads without a strategy is burning money",
    painHook:
      "You've already put money into ads and didn't see a clear return. The problem is almost never the budget, it's the structure behind it.",
    problem: {
      title: "Campaigns without strategy generate clicks, not clients",
      points: [
        "High spend, unpredictable results",
        "Without correct tracking, you don't know what works",
        "Creatives that don't speak to the right audience",
        "Nobody watching the campaign every day",
      ],
    },
    solution: {
      title: "Ad management with method, not guesswork",
      items: [
        { title: "Precise targeting", description: "The right audience, on the right platform, at the right time." },
        { title: "Constant testing", description: "Creatives and audiences tested in a continuous cycle." },
        { title: "Full tracking", description: "Every dollar spent tracked all the way to the conversion." },
      ],
    },
    dashAngle: "On Paid Ads, campaign follow-up is being integrated into the Dash, with the ads module in development.",
    process: {
      title: "How it works",
      steps: [
        { title: "Audit", description: "We analyze your history and investment potential." },
        { title: "Campaign structure", description: "We build the architecture of accounts and audiences." },
        { title: "Creatives & tests", description: "We produce and test variations continuously." },
        { title: "Continuous optimization", description: "Weekly adjustments based on real data." },
      ],
    },
    cta: {
      title: "Want to stop wasting your ad budget?",
      subtitle: "Talk to a consultant and see how we structure your traffic operation.",
    },
  },
  "social-media": {
    slug: "social-media",
    title: "Posting without a strategy is just noise, not growth",
    painHook:
      "You post, but your profile doesn't grow and doesn't generate sales. The problem is the lack of a system behind the content.",
    problem: {
      title: "Content without consistency doesn't build authority",
      points: [
        "Sporadic posts, no calendar",
        "Generic hooks that don't stop the scroll",
        "No metrics tracked closely",
        "Personal or business brand without a clear direction",
      ],
    },
    solution: {
      title: "A content system, not just one-off posts",
      items: [
        { title: "Strategic calendar", description: "Monthly planning with defined content pillars." },
        { title: "Data-driven scripts", description: "Hooks validated by real performance, not guesswork." },
        { title: "Community management", description: "Replies and engagement treated as part of the strategy." },
      ],
    },
    dashAngle: "On Social Media, this means tracking content, calendar and Instagram metrics in one place.",
    process: {
      title: "How it works",
      steps: [
        { title: "Profile diagnosis", description: "We analyze history, niche and competition." },
        { title: "Editorial line", description: "We define pillars, tone of voice and formats." },
        { title: "Production", description: "Script, recording/editing and publishing schedule." },
        { title: "Performance review", description: "Weekly adjustments based on real metrics." },
      ],
    },
    cta: {
      title: "Ready to turn your profile into a business asset?",
      subtitle: "Talk to a consultant and see how we structure your digital presence.",
    },
  },
  automacoes: {
    slug: "automacoes",
    title: "Your team wastes time on tasks AI can already handle",
    painHook:
      "While your team answers the same lead by hand for the fifth time, your competitors have already automated it.",
    problem: {
      title: "Manual processes cost time and sales",
      points: [
        "Leads waiting hours for a reply",
        "The team repeating the same task every day",
        "No automation between the tools you already use",
        "Data scattered, with no central view",
      ],
    },
    solution: {
      title: "AI applied to the real processes of your business",
      items: [
        { title: "Automated customer service", description: "Replies and lead qualification 24/7." },
        { title: "Integrated flows", description: "Your tools talking to each other, with no manual work." },
        { title: "Custom automation", description: "Built for your process, not a generic template." },
      ],
    },
    dashAngle: "With Automations, this means centralized tasks and flows, without losing track of what has already been done.",
    process: {
      title: "How it works",
      steps: [
        { title: "Mapping", description: "We identify the processes with the greatest automation potential." },
        { title: "Flow design", description: "We structure the logic and the integrations needed." },
        { title: "Implementation", description: "We build and test the automation." },
        { title: "Follow-up", description: "We monitor and adjust based on real use." },
      ],
    },
    cta: {
      title: "Want to take repetitive work off your team's plate?",
      subtitle: "Talk to a consultant and see what can be automated today.",
    },
  },
  "design-grafico": {
    slug: "design-grafico",
    title: "Inconsistent visuals make your brand look amateur",
    painHook:
      "Every piece looks like it came from a different company. That erodes trust before the client even talks to you.",
    problem: {
      title: "Without a visual standard, the brand loses strength",
      points: [
        "Pieces made in a rush, with no identity",
        "Materials that don't match each other",
        "No consistency across social media, website and sales material",
        "A brand that isn't remembered",
      ],
    },
    solution: {
      title: "Consistent design at every touchpoint",
      items: [
        { title: "Custom pieces", description: "Social media, presentations and sales materials." },
        { title: "Applied visual standard", description: "Every piece reinforcing the same identity." },
        { title: "Production agility", description: "Requests handled at the pace of your business." },
      ],
    },
    dashAngle: "With Graphic Design, this means seeing the delivered content and the calendar of pieces in one dashboard.",
    process: {
      title: "How it works",
      steps: [
        { title: "Brief", description: "We understand the goal of each request." },
        { title: "Art direction", description: "We apply the brand's visual identity." },
        { title: "Production", description: "We create the pieces within the defined standard." },
        { title: "Delivery & adjustments", description: "We refine based on your feedback." },
      ],
    },
    cta: {
      title: "Want a visually consistent brand?",
      subtitle: "Talk to a consultant and see how we standardize your visual communication.",
    },
  },
  "brand-guide": {
    slug: "brand-guide",
    title: "Without a brand guide, everyone interprets your identity their own way",
    painHook:
      "If you have to explain your brand from scratch to every new vendor, it's a sign it was never really documented.",
    problem: {
      title: "A brand without documentation doesn't scale",
      points: [
        "Colors and fonts applied inconsistently",
        "A tone of voice that changes depending on who writes",
        "Rework every time someone new joins the team",
        "A weak identity next to the competition",
      ],
    },
    solution: {
      title: "A complete guide to scale your brand with consistency",
      items: [
        { title: "Documented identity", description: "Colors, typography, logo and applications defined." },
        { title: "Tone of voice", description: "Clear guidelines on how the brand communicates." },
        { title: "Practical applications", description: "Real examples to guide any vendor." },
      ],
    },
    dashAngle: "With the Brand Guide, the whole content operation follows the same standard, visible in the dashboard.",
    process: {
      title: "How it works",
      steps: [
        { title: "Immersion", description: "We understand the essence and values of the brand." },
        { title: "Identity building", description: "We define the visual and verbal elements." },
        { title: "Documentation", description: "We bring everything together in a complete brand guide." },
        { title: "Application", description: "We guide its use at every touchpoint." },
      ],
    },
    cta: {
      title: "Ready to document your brand once and for all?",
      subtitle: "Talk to a consultant and see how we build your Brand Guide.",
    },
  },
};

/** Slug em inglês da URL → chave do serviço (usada no Dash e no conteúdo). */
export const EN_SERVICE_SLUGS: Record<string, string> = {
  websites: "websites",
  "paid-ads": "trafego",
  "social-media": "social-media",
  automations: "automacoes",
  "graphic-design": "design-grafico",
  "brand-guide": "brand-guide",
};
