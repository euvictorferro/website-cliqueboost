import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SERVICES } from "@/content/services";

export default function Page() {
  return <ServicePageTemplate content={SERVICES.websites} />;
}
