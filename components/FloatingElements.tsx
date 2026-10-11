export default function FloatingElements() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
      style={{ contain: 'strict', transform: 'translateZ(0)' }}
    >
      <div
        className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full animate-blob opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(148,163,184,0.15) 0%, rgba(71,85,105,0) 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      ></div>

      <div
        className="absolute top-1/3 right-0 w-[45rem] h-[45rem] rounded-full animate-blob animation-delay-2000 opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(100,116,139,0.12) 0%, rgba(30,41,59,0) 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      ></div>
    </div>
  );
}