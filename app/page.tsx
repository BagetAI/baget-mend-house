"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Hammer, Users, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [appliance, setAppliance] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  const DB_ID = "77f56fc5-8f2e-4d7a-901b-58ba86a7ab09";

  useEffect(() => {
    fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/count`)
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`https://app.baget.ai/api/public/databases/${DB_ID}/rows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { email, name, appliance_to_fix: appliance },
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setAppliance("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-sm flex items-center justify-center">
            <Hammer className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-header font-bold tracking-tight">Mend House</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#how-it-works" className="hover:text-brand-primary transition">How it Works</a>
          <a href="#workshops" className="hover:text-brand-primary transition">Workshops</a>
          <a href="#join" className="hover:text-brand-primary transition font-bold text-brand-primary underline underline-offset-4">Join Waitlist</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-block bg-brand-accent/20 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Opening May 2026 in your neighborhood
          </div>
          <h1 className="text-5xl md:text-7xl leading-tight">
            Don't Toss It, <span className="text-brand-primary italic">Fix It.</span>
          </h1>
          <p className="text-xl text-brand-secondary/80 leading-relaxed max-w-lg">
            Mend House is a cozy neighborhood spot where broken appliances get a second life through community-led repair workshops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#join" className="bg-brand-primary text-white px-8 py-4 rounded-sm flex items-center justify-center gap-2 font-bold hover:bg-brand-primary/90 transition shadow-lg">
              Secure Your Bench <ArrowRight className="w-4 h-4" />
            </a>
            {count !== null && count > 0 && (
              <div className="flex items-center gap-2 text-sm text-brand-secondary/60 italic px-4 py-4">
                Join {count + 42} neighbors already on the list
              </div>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-sm shadow-2xl">
          <Image 
            src="/images/a-warm-sunlit-interior-of-a-cozy-neighb.png" 
            alt="Mend House Interior" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-brand-secondary text-brand-neutral py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl">The Mending Process</h2>
            <p className="text-brand-neutral/60 max-w-2xl mx-auto">We demystify the "black box" of modern consumer electronics and help you find the $5 fix for your $300 appliance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: Hammer, 
                title: "Bring Your Broken", 
                desc: "Got a toaster that won't toast? A kettle that won't boil? Bring it to the House." 
              },
              { 
                icon: Users, 
                title: "Guided Repair", 
                desc: "Our expert techs walk you through diagnostics and repair. You are the hero of the fix." 
              },
              { 
                icon: Heart, 
                title: "Back to Life", 
                desc: "Apply a 'Fixed' sticker and take your working appliance home. No waste, just skill." 
              }
            ].map((step, i) => (
              <div key={i} className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <step.icon className="text-brand-primary w-6 h-6" />
                </div>
                <h3 className="text-2xl">{step.title}</h3>
                <p className="text-brand-neutral/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="join" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-brand-secondary/10 p-8 md:p-12 rounded-sm shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl">Join the First Fix</h2>
            <p className="text-brand-secondary/60 italic">Our first batch of workshops starts in May. Be the first to know when benched slots open.</p>
          </div>

          {status === "success" ? (
            <div className="bg-brand-neutral p-8 text-center rounded-sm space-y-4">
              <CheckCircle2 className="w-12 h-12 text-brand-primary mx-auto" />
              <h3 className="text-2xl">You're on the list!</h3>
              <p>We'll reach out soon with the workshop schedule and early-bird membership pricing.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-brand-primary font-bold underline"
              >
                Sign up another neighbor
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Mender" 
                    className="w-full p-4 bg-brand-neutral border-none focus:ring-2 focus:ring-brand-primary transition rounded-sm outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com" 
                    className="w-full p-4 bg-brand-neutral border-none focus:ring-2 focus:ring-brand-primary transition rounded-sm outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">What needs fixing?</label>
                <input 
                  type="text" 
                  value={appliance}
                  onChange={(e) => setAppliance(e.target.value)}
                  placeholder="KitchenAid Mixer, Dyson Vacuum, etc." 
                  className="w-full p-4 bg-brand-neutral border-none focus:ring-2 focus:ring-brand-primary transition rounded-sm outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-brand-primary text-white py-5 rounded-sm font-bold text-lg uppercase tracking-widest hover:bg-brand-primary/90 transition shadow-lg disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join the Waitlist"}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
              )}
              <p className="text-[10px] text-center text-brand-secondary/40 uppercase tracking-widest pt-4">
                Repairs are performed by owners under technical supervision. Mend House is not responsible for post-repair appliance longevity.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-secondary/10 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Hammer className="text-brand-primary w-4 h-4" />
          <span className="font-header font-bold">Mend House</span>
        </div>
        <p className="text-sm text-brand-secondary/40 italic">
          &copy; 2026 Mend House. Restoration through education.
        </p>
      </footer>
    </main>
  );
}
