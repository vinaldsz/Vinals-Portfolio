import { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Mail, MapPin, ChevronDown, Check } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const EMAIL = "dsouza.vi@northeastern.edu";
const SUBJECTS = ["Job Opportunity", "Collaboration", "General Inquiry", "Other"];

// Shared field styling for the native input/textarea controls (no shared Input
// primitive — see SPEC "no shadcn"; Radix is used only for Select + Label below).
const fieldClasses =
  "w-full rounded-lg border border-input bg-[hsl(var(--glass-bg)/0.4)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <LabelPrimitive.Root
      htmlFor={htmlFor}
      className="mb-2 block font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"
    >
      {children}
    </LabelPrimitive.Root>
  );
}

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend — build a mailto: the OS mail client opens pre-filled.
    const mailSubject = `Portfolio Contact from ${name}${subject ? ` — ${subject}` : ""}`;
    const mailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    // Cosmetic ~700ms "SENDING…" state around the synchronous mailto navigation.
    setStatus("");
    setIsSending(true);
    window.setTimeout(() => {
      window.location.href = mailto;
      setIsSending(false);
      setStatus("Opening your email client…");
    }, 700);
  };

  return (
    <section id="contact" className="scroll-mt-16 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-10 shrink-0 bg-primary" />
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
              Get In Touch
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Contact info */}
            <div className="lg:col-span-5">
              <h3 className="font-display text-2xl font-bold text-foreground">Let's Connect</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                I'm always open to discussing new projects, creative ideas, or opportunities to be
                part of your vision.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-foreground/90 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Location
                    </p>
                    <p className="text-foreground/90">San Francisco, CA</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Availability
                    </p>
                    <p className="text-foreground/90">Open to new opportunities</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-panel rounded-xl p-6 md:p-8 lg:col-span-7">
              <div className="grid gap-5">
                <div>
                  <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={fieldClasses}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={fieldClasses}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                  <SelectPrimitive.Root
                    name="subject"
                    required
                    value={subject}
                    onValueChange={setSubject}
                  >
                    <SelectPrimitive.Trigger
                      id="contact-subject"
                      className={cn(fieldClasses, "flex items-center justify-between gap-2 [&[data-placeholder]]:text-muted-foreground/50")}
                    >
                      <SelectPrimitive.Value placeholder="Select a subject" />
                      <SelectPrimitive.Icon>
                        <ChevronDown size={16} className="text-muted-foreground" />
                      </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Portal>
                      <SelectPrimitive.Content
                        position="popper"
                        sideOffset={6}
                        className="glass-panel z-50 max-h-60 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg p-1 shadow-xl"
                      >
                        <SelectPrimitive.Viewport>
                          {SUBJECTS.map((option) => (
                            <SelectPrimitive.Item
                              key={option}
                              value={option}
                              className="relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm text-foreground/90 outline-none data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary"
                            >
                              <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center text-primary">
                                <Check size={14} />
                              </SelectPrimitive.ItemIndicator>
                              <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                            </SelectPrimitive.Item>
                          ))}
                        </SelectPrimitive.Viewport>
                      </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                  </SelectPrimitive.Root>
                </div>

                <div>
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project…"
                    className={cn(fieldClasses, "resize-y")}
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSending} className="w-full">
                  {isSending ? "SENDING…" : "Send Message"}
                </Button>

                <p aria-live="polite" className="min-h-5 text-center text-sm text-primary">
                  {status}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
