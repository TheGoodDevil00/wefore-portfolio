import { useState } from "react";
import { ArrowRight, Loader2, Send } from "lucide-react";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessType: "",
    customBusinessType: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2Z5D3FweIbX7RIFALDClRWw9u7izwXd13L53OZLM-YNb5LG4ksgQnHSpGWft-FCB5/exec";

    if (!GOOGLE_SCRIPT_URL) {
      alert("Configuration Required: Please set up your Google Sheets webhook URL in the code.");
      setIsLoading(false);
      return;
    }

    try {
      const finalBusinessType = formData.businessType === "Other"
        ? formData.customBusinessType
        : formData.businessType;

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          businessType: finalBusinessType,
          timestamp: new Date().toISOString(),
        }),
      });

      alert("Request Sent! We'll get back to you within 24 hours.");

      setFormData({
        name: "",
        businessType: "",
        customBusinessType: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      alert("Error: Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const businessTypes = [
    "E-commerce",
    "SaaS / Tech",
    "Restaurant / Food",
    "Fashion / Beauty",
    "Real Estate",
    "Healthcare",
    "Education",
    "Other",
  ];

  return (
    <section id="contact" className="py-12 md:py-24 bg-transparent border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-display text-[24px] md:text-display-sm text-ebon-depth text-center mb-2 md:mb-4 font-semibold tracking-tight">
          Start A Project
        </h2>
        <p className="font-body text-[13px] md:text-body text-mist-gray text-center mb-8 md:mb-16 max-w-xl mx-auto">
          Ready to transform your social media? Let's talk.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 md:space-y-6"
        >
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="name" className="font-body text-[12px] md:text-[14px] text-ebon-depth ml-4 block">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-round w-full text-[14px] md:text-[16px] py-3 md:py-4"
              />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="email" className="font-body text-[12px] md:text-[14px] text-ebon-depth ml-4 block">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-round w-full text-[14px] md:text-[16px] py-3 md:py-4"
              />
            </div>
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="phone" className="font-body text-[12px] md:text-[14px] text-ebon-depth ml-4 block">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (234) 567-8900"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-round w-full text-[14px] md:text-[16px] py-3 md:py-4"
            />
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="businessType" className="font-body text-[12px] md:text-[14px] text-ebon-depth ml-4 block">Business Type</label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="input-round w-full appearance-none text-[14px] md:text-[16px] py-3 md:py-4"
            >
              <option value="" disabled>Select your business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {formData.businessType === "Other" && (
              <input
                id="customBusinessType"
                name="customBusinessType"
                type="text"
                placeholder="Please specify your business type"
                value={formData.customBusinessType || ""}
                onChange={handleChange}
                required
                className="input-round w-full mt-3 text-[14px] md:text-[16px] py-3 md:py-4"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 md:mt-8 flex items-center justify-center gap-2 text-whisper-white bg-ebon-depth hover:bg-ebon-depth/90 px-8 py-3.5 md:py-4 rounded-full font-body font-medium text-[14px] md:text-[16px] transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Sending...
              </>
            ) : (
              <>
                Send Request
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
