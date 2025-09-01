export default function HeroSection() {
  return (
    <section 
      id="top"
      className="hero-bg min-h-screen flex items-center justify-center relative geometric-pattern"
    >
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI</span> Take Care of 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Everything</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          <span className="text-green-400 font-semibold">Lower costs, save time,</span> and experience 
          <span className="text-purple-400 font-semibold"> life-changing efficiency.</span>
        </p>
        
        <button 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 px-12 py-4 rounded-full text-white font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[320px]"
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          data-testid="button-book-call-hero"
        >
          Book my Free Call
        </button>
      </div>
    </section>
  );
}
