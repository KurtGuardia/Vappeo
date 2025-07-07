"use client";
export function HeroSection({
  quote
}) {
  return (
    (<div
      className="relative h-80 bg-gradient-to-br from-[#8B0000] via-[#C1121F] to-[#290000] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="text-5xl font-brand text-white mb-12 z-10 glow-effect">VAPPEO</div>
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden px-4">
        <div
          className="marquee whitespace-nowrap text-white font-semibold text-lg bg-black/30 backdrop-blur-sm rounded-full py-3 px-6">
          🎉 {quote} 🎉
        </div>
      </div>
    </div>)
  );
}
