import ContactHero from "../sections/contact/ContactHero";
import ContactInfoCards from "../sections/contact/ContactInfoCards";
import ContactMain from "../sections/contact/ContactMain";
import ContactCTA from "../sections/contact/ContactCTA";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <title>Contact Us | Custom Embroidery Services</title>

      {/* Hero Section */}
      <ContactHero />

      {/* Contact Info Cards */}
      <ContactInfoCards />

      {/* Main Content */}
      <ContactMain />

      {/* CTA Section */}
      <ContactCTA />
    </div>
  );
};

export default Contact;
