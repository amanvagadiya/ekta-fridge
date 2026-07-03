import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, MessageCircle, Send, CheckCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Seo from "@/components/seo/Seo";

const heroContact = "/uploads/hero-contact.jpg";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Shop-No-10, Pirojpura Road, Chhapi Highway,TA-Vadgam,Dist-Banaskantha, Gujarat - 385210" },
  { icon: Phone, label: "Phone", value: "+91-81285-51508", href: "tel:+918128551508" },
  { icon: Mail, label: "Email", value: "amanvagadiya00@gmail.com", href: "mailto:amanvagadiya00@gmail.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 9AM–8PM, Sun: 9AM–8PM" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fromSuccess = new URLSearchParams(window.location.search).get("success");
      if (fromSuccess === "true") {
        setSubmitted(true);
      }
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const subjectLine = form.subject
        ? `${form.name} - ${form.subject} | EKTA FRIDGE`
        : `${form.name} - New Inquiry | EKTA FRIDGE`;

      const payload = {
        "Name": form.name,
        "Email": form.email,
        "Phone": form.phone || "Not provided",
        "Subject": form.subject || "General Inquiry",
        "Message": form.message,
        "_subject": subjectLine,
        "_replyto": form.email,
        "_captcha": "false",
        "_template": "box"
      };

      const response = await fetch("https://formsubmit.co/ajax/fe63920dbdcc43c3070624e07f9d67c9", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to send message");
      }

      const data = await response.json();
      if (data.success) {
        setSentEmail(form.email);
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setSentEmail("");
        }, 5000);
      } else {
        throw new Error(data.message || "Unable to send message");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof DOMException && error.name === "AbortError") {
        setSubmitError("Request timed out. Please check your internet connection and try again.");
      } else {
        setSubmitError("Unable to send your message right now. Please try again later.");
      }
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

  return (
    <main className="pb-20 min-h-screen">
      <Seo
        title="Contact EKTA FRIDGE | Chhapi"
        description="Contact EKTA FRIDGE for electronics and home appliance inquiries. Visit our Chhapi store or call us for AC, fridge, deep freezer and air cooler support."
        path="/contact"
        image={heroContact}
        keywords={["Ekta Fridge contact", "Ekta Fridge Chhapi phone number", "electronics shop contact"]}
      />
      <PageHero
        title="Get In Touch"
        subtitle="We'd love to hear from you. Reach out anytime!"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact Us" },
        ]}
        backgroundImage={heroContact}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="premium-card p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                {item.href ? (
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="premium-card-elevated p-8">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">Your message has been sent successfully. We will respond soon.</p>
                  {sentEmail && (
                    <p className="text-sm text-muted-foreground mt-2">Sent from: <span className="font-medium text-foreground">{sentEmail}</span></p>
                  )}
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value={form.subject ? `${form.subject} - Contact Form` : "Contact Form Message"} />
                  <input type="hidden" name="_replyto" value={form.email} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <div>
                    <input required name="fullName" type="text" placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input required name="email" type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <select name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass}>
                    <option value="">Select Subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="other">Other</option>
                  </select>
                  <div>
                    <textarea required name="message" placeholder="Your Message *" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>
                  {submitError && <p className="text-sm text-destructive mb-2">{submitError}</p>}
                  <button type="submit" className="btn-primary flex items-center gap-2" disabled={isSubmitting}>
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div className="premium-card overflow-hidden">
              <iframe
                title="EKTA FRIDGE Location"
                src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1772616302007!5m2!1sen!2sin!6m8!1m7!1sS106YktznIdW0ms6fIvLjA!2m2!1d24.02625626195359!2d72.38367760184968!3f28.81569545869556!4f6.812282427736591!5f0.7820865974627469" 
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading font-semibold text-foreground mb-4">Follow Us</h3>
          <div className="flex justify-center gap-3">
            {[
              { icon: Instagram, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Youtube, href: "#" },
              { icon: MessageCircle, href: "https://wa.me/918128551508" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
