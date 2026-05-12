"use client";

import CRTOverlay from "@/components/CRTOverlay";
import FloatingParticles from "@/components/FloatingParticles";
import TerminalWindow from "@/components/TerminalWindow";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      <CRTOverlay />
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-yellow-300 drop-shadow-lg" style={{ textShadow: "4px 4px 0px rgba(0, 0, 0, 0.8)" }}>
            GRADUATION OS
          </h1>
          <p className="text-xl text-green-400 font-mono">v1.0 - MEMORY EDITION</p>
        </div>

        <div className="flex flex-col gap-8 items-center">
          <TerminalWindow />

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link
              href="/invite"
              className="px-8 py-3 bg-green-600 border-4 border-green-400 text-black font-bold hover:bg-green-500 transition-colors"
              style={{
                boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.5)",
              }}
            >
              VIEW INVITATIONS →
            </Link>
          </div>
        </div>
      </div>
    </main>
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
