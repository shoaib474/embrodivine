import { useState } from "react";
import { CheckCircle , Scissors , Palette, Shield , } from "lucide-react";

const ServicesSec = () => {
  const [active, setActive] = useState(null);

  const mainServices = [
    {
      id: 1,
      title: "Digitizing",
      description:
        "Professional embroidery digitizing services covering all types of stitch-ready file creation for garments, caps, patches, and creative apparel.",
      image:"/images/digitizing.png",
      services: [
        {
          name: "Graphic",
          features: [
            "Custom artwork digitizing",
            "Vector to embroidery conversion",
            "Detailed stitch mapping",
            "Fabric-specific optimization",
            "Color blending",
            "Left chest & jacket back sizing",
          ],
        },
        {
          name: "Logo",
          features: [
            "Corporate logo digitizing",
            "Cap & flat logo formats",
            "Unlimited edits",
            "DST, PES, EMB & more",
            "Fast turnaround",
            "High-detail precision",
          ],
        },
        {
          name: "Applique",
          features: [
            "Tackle twill applique",
            "Patch-style embroidery",
            "Fabric placement guides",
            "Clean border stitching",
            "Sports jersey designs",
            "Cost-effective large fills",
          ],
        },
        {
          name: "3D Puff",
          features: [
            "Raised foam embroidery",
            "Perfect for caps & hats",
            "Clean edge precision",
            "Premium 3D finish",
            "Bold lettering",
            "Structured cap optimization",
          ],
        },
        {
          name: "Patch",
          features: [
            "Merrow border patches",
            "Velcro patch ready",
            "Iron-on compatible",
            "Custom badge designs",
            "High durability",
            "Detailed emblem stitching",
          ],
        },
        {
          name: "Custom (Quote Based)",
          features: [
            "Custom quote for every design",
            "High-quality embroidery digitizing",
            "Machine-ready file formats",
            "Fast turnaround time",
            "Accurate stitch conversion",
            "Support for all design types",
          ],
        },
      ],
    },

    {
      id: 2,
      title: "Vector Services",
      description:
        "High-quality vector conversion services for printing, branding, and scalable design needs.",
      image: "/images/vector.png",
      services: [
        {
          name: "Vector Conversion",
          features: [
            "Raster to vector conversion",
            "Clean scalable artwork",
            "Print-ready files",
            "Logo recreation",
            "Color separation",
            "Editable source files",
          ],
        },
        {
          name: "Vector Illustration",
          features: [
            "Custom illustrations",
            "Brand artwork design",
            "Minimal & detailed styles",
            "High-resolution output",
            "Marketing graphics",
            "Social media creatives",
          ],
        },
      ],
    },

    {
      id: 3,
      title: "Patch Production",
      description:
        "Durable and premium-quality patch manufacturing for brands, uniforms, and merchandise.",
      image: "/images/patches.jpeg",
      services: [
        {
          name: "Embroidered Patches",
          features: [
            "High-density stitching",
            "Custom shapes & sizes",
            "Merrow or heat cut borders",
            "Premium thread quality",
            "Brand identity patches",
            "Long-lasting durability",
          ],
        },
        {
          name: "PVC / Leather Patches",
          features: [
            "Modern 3D look",
            "Water-resistant material",
            "Fashion apparel use",
            "Custom molding options",
            "Luxury branding style",
            "Strong adhesion options",
          ],
        },
      ],
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  {/* Header */}
  <div className="text-center mb-16 space-y-4">
    <h2 className="text-3xl sm:text-4xl font-bold text-yellow-500">
      Our Core Services
    </h2>
    <p className="text-white text-lg max-w-2xl mx-auto">
      Professional embroidery solutions tailored to your needs
    </p>
  </div>

  {/* Accordion */}
  <div className="space-y-6">
    {mainServices.map((service) => {
      const isOpen = active === service.id;

      return (
        <div
          key={service.id}
          className="rounded-2xl border border-yellow-500/20 bg-[#1A1A1A] overflow-hidden transition-all duration-500"
        >
          {/* HEADER */}
          <button
            onClick={() => setActive(isOpen ? null : service.id)}
            className="w-full flex flex-col md:flex-row gap-6 p-6 text-left hover:bg-[#222] transition"
          >
            {/* IMAGE (ONLY MAIN SERVICE) */}
            <div className="md:w-40 w-full h-40 flex-shrink-0 rounded-xl overflow-hidden border border-yellow-500/20">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* TEXT */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-yellow-500">
                {service.title}
              </h3>

              <p className="text-white text-sm mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* ICON */}
            <div className="text-yellow-500 text-3xl self-start md:self-center">
              {isOpen ? "−" : "+"}
            </div>
          </button>

          {/* BODY */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
              {service.services.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-[#111] border border-yellow-500/10 rounded-xl p-5"
                >
                  <h4 className="text-lg font-semibold text-yellow-500 mb-3">
                    {sub.name}
                  </h4>

                  <ul className="space-y-2">
                    {sub.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-white text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section>
  );
};

export default ServicesSec;
