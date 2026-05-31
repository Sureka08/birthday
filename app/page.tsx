"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

type CollageItem = {
  src: string;
  left: string;
  top: string;
  size: number;
  delay: number;
  className?: string;
};

type Particle = {
  left: string;
  top: string;
  delay: number;
  size: number;
  icon: string;
};

const COLLAGE: CollageItem[] = [
  { src: "/p3.png", left: "4%", top: "8%", size: 170, delay: 0.15, className: "rotate-[-8deg]" },
  { src: "/p3.png", left: "77%", top: "9%", size: 150, delay: 0.45, className: "rotate-[8deg]" },
  { src: "/p3.png", left: "8%", top: "60%", size: 180, delay: 0.75, className: "rotate-[6deg]" },
  { src: "/p3.png", left: "74%", top: "60%", size: 190, delay: 1.05, className: "rotate-[-5deg]" },
  { src: "/p3.png", left: "44%", top: "72%", size: 140, delay: 1.35, className: "rotate-[10deg]" },
  { src: "/p2.jpeg", left: "31%", top: "18%", size: 360, delay: 0.6, className: "rotate-[-2deg]" },
];

const PARTICLES: Particle[] = Array.from({ length: 12 }).map((_, index) => ({
  left: ((4 + index * 7.7) % 88) + "%",
  top: ((8 + index * 10.9) % 82) + "%",
  delay: (index % 6) * 0.45,
  size: 10 + (index % 4) * 5,
  icon: index % 3 === 0 ? "♡" : index % 3 === 1 ? "✦" : "✧",
}));

function Scene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={"w-full max-w-6xl rounded-4xl transition-all duration-800 ease-out " + className}>
      {children}
    </section>
  );
}

export default function BirthdayPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!started) return;

    if (audioRef.current) {
      audioRef.current.volume = 0.32;
    }

    const timers = [
      window.setTimeout(() => setStep(1), 900),
      window.setTimeout(() => setStep(2), 3200),
      window.setTimeout(() => setStep(3), 6400),
    ];

    return () =>
      timers.forEach((timer) => window.clearTimeout(timer));
  }, [started]);

  const openSurprise = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050308] text-white antialiased">
      <audio ref={audioRef} loop preload="auto">
        <source src="/b2.mpeg" type="audio/mpeg" />
      </audio>

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,215,120,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(255,105,180,0.08),transparent_20%),linear-gradient(to_bottom,#09050d_0%,#050308_45%,#030205_100%)]" />

      <div className="absolute inset-0 -z-20 animate-bgZoom bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.02),transparent_34%),radial-gradient(circle_at_35%_70%,rgba(255,215,120,0.05),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(255,105,180,0.05),transparent_16%)] opacity-80 blur-2xl" />

      {/* Collage */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {COLLAGE.map((item, index) => (
          <div
            key={item.src + "-" + index}
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
              animationDelay: item.delay + "s",
            }}
            className={"absolute opacity-0 animate-collageFadeIn " + (item.className ?? "")}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/12 bg-white/5 shadow-[0_35px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm">
              <Image
                src={item.src}
                alt={`birthday-collage-${index}`}
                fill
                className="object-cover object-center grayscale sepia brightness-[0.82] animate-mainZoom"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-[-5] overflow-hidden">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            style={{
              left: particle.left,
              top: particle.top,
              fontSize: particle.size,
              animationDelay: particle.delay + "s",
            }}
            className="absolute text-amber-100/75 drop-shadow-[0_0_18px_rgba(255,210,120,0.35)] animate-particleFloat"
          >
            {particle.icon}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        {!started ? (
          <Scene className="border border-white/10 bg-black/30 px-6 py-7 shadow-[0_35px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-8 sm:py-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="max-w-xl font-serif text-4xl leading-tight text-[#fff5e8] sm:text-5xl md:text-7xl">
                  Happy Birthday Pirunthu 💖
                </h1>

                <p className="mx-auto max-w-xl text-sm leading-7 text-[#f8e8d2]/90 md:mx-0 md:text-base">
                  Today is all about you ✨
                </p>

                <button
                  type="button"
                  onClick={openSurprise}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-amber-200/30 bg-linear-to-r from-amber-200 via-amber-100 to-pink-200 px-7 py-3 text-sm font-semibold text-[#2f1b00] shadow-[0_18px_60px_rgba(255,205,120,0.24)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  Click Here ✨
                </button>
              </div>

              <div className="relative hidden md:block">
                <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-black/35 p-2 shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
                  <div className="relative aspect-4/5 overflow-hidden rounded-[26px]">
                    <Image
                      src="/p2.jpeg"
                      alt="birthday preview"
                      fill
                      priority
                      className="object-cover object-center animate-mainZoom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Scene>
        ) : (
          <div className="w-full max-w-6xl space-y-6 sm:space-y-8">
            <Scene
              className={`border border-white/10 bg-black/28 px-4 py-5 shadow-[0_35px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-6 sm:py-7 ${
                step >= 1
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 lg:flex-row lg:gap-10">
                <div className="relative w-full max-w-105 flex-none">
                  <div className="relative overflow-hidden rounded-[36px] border border-white/14 bg-black/40 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
                    <div className="relative aspect-4/5 overflow-hidden rounded-[30px]">
                      <Image
                        src="/p2.jpeg"
                        alt="main portrait"
                        fill
                        priority
                        className="object-cover object-center animate-mainZoom"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h2 className="font-serif text-4xl leading-tight text-[#fff6eb] sm:text-5xl lg:text-6xl">
                    Happy Birthday Pirunthu 💖
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#f9ead6]/86 lg:mx-0 lg:text-base">
                    A special birthday surprise made with memories, love, and warm wishes ✨
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">

                    <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">
                        Beautiful Memories
                      </p>

                      <p className="mt-2 text-sm text-[#f7e7d0]/90">
                        Every picture here holds a special memory with you 💖
                        
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">
                        Birthday Surprise
                      </p>

                      <p className="mt-2 text-sm text-[#f7e7d0]/90">
                        A small surprise made specially for your birthday ✨
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </Scene>

            <Scene
              className={`border border-white/10 bg-black/24 px-6 py-7 shadow-[0_35px_120px_rgba(0,0,0,0.66)] backdrop-blur-xl sm:px-8 sm:py-10 ${
                step >= 2
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-base leading-8 text-[#fff2df] sm:text-xl sm:leading-10 animate-textGlow">
                  Even if we don’t talk like before,
                  <br />
                  you’ll always be special to me 💖.
                </p>
              </div>
            </Scene>

            <Scene
              className={`border border-white/10 bg-black/26 px-5 py-6 shadow-[0_40px_140px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:px-6 sm:py-8 ${
                step >= 3
                  ? "scale-100 opacity-100"
                  : "scale-[0.98] opacity-0"
              }`}
            >
              <div className="flex flex-col-reverse items-center gap-7 lg:flex-row lg:gap-10">
                <div className="flex-1 text-center lg:text-left">
                  <p className="mb-3 text-xs uppercase tracking-[0.42em] text-amber-100/70">
                  💖💖💖
                  </p>

                  <h3 className="font-serif text-3xl leading-tight text-[#fff7ec] sm:text-4xl lg:text-5xl animate-titleGlow">
                    Stay happy, stay blessed, always 🫶  
                                    </h3>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#f7e8d2]/88 lg:mx-0 lg:text-base">
                    May your birthday be filled with happiness, beautiful memories, and endless smiles ✨
                    <br />
                    May this year bring you success, peace, and everything your heart truly desires ❤️
                    <br />
                    Keep smiling, keep shining, and always stay the amazing person you are 🌸
                  </p>
                </div>

                <div className="relative flex w-full max-w-110 flex-col gap-4 flex-none">
                  <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-black/35 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.72)]">
                    <div className="relative aspect-4/5 overflow-hidden rounded-[30px]">
                      <Image
                        src="/p3.png"
                        alt="final portrait"
                        fill
                        className="object-cover object-center animate-finalZoom"
                      />
                    </div>
                  </div>


                </div>
              </div>
            </Scene>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bgZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }

        @keyframes collageFadeIn {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes mainZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        @keyframes finalZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1.1); }
        }

        @keyframes particleFloat {
          0%,100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          50% {
            transform: translateY(-18px);
            opacity: 0.95;
          }
        }

        @keyframes textGlow {
          0%,100% {
            text-shadow: 0 0 0 rgba(255,215,120,0);
          }
          50% {
            text-shadow: 0 0 28px rgba(255,215,120,0.34);
          }
        }

        @keyframes titleGlow {
          0%,100% {
            text-shadow: 0 0 0 rgba(255,215,120,0);
          }
          50% {
            text-shadow: 0 0 24px rgba(255,215,120,0.22);
          }
        }

        @keyframes madeGlow {
          0%,100% {
            opacity: 0.82;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-bgZoom {
          animation: bgZoom 26s ease-in-out infinite alternate;
        }

        .animate-collageFadeIn {
          animation: collageFadeIn 1.35s ease forwards;
        }

        .animate-mainZoom {
          animation: mainZoom 28s ease-in-out infinite alternate;
        }

        .animate-finalZoom {
          animation: finalZoom 24s ease-in-out infinite alternate;
        }

        .animate-particleFloat {
          animation: particleFloat 14s ease-in-out infinite;
        }

        .animate-textGlow {
          animation: textGlow 3.8s ease-in-out infinite;
        }

        .animate-titleGlow {
          animation: titleGlow 4.8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
