import ServicesService from "../sections/services/ServicesService";
import ServicesAdditional from "../sections/services/ServicesAdditional";
import ServicesHero from "../sections/services/ServicesHero";
import ServicesProcess from "../sections/services/ServicesProcess";
import ServicesFaq from "../sections/services/ServicesFaq";
import ServicesCTA from "../sections/services/ServicesCTA";

const Services = () => {
  return (
    <>
      <title>
        Services | Professional Embroidery Services | Custom Patches &
        Digitizing
      </title>

      <ServicesHero />

      {/* Main Services */}
      <ServicesService />

      {/* Additional Services */}
      <ServicesAdditional />

      {/* Process Section */}
      <ServicesProcess />

      {/* FAQ Section */}
      <ServicesFaq />

      {/* CTA Section */}
      <ServicesCTA/>
    </>
  );
};

export default Services;
