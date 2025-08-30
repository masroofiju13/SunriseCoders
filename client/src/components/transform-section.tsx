
export default function TransformSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI Innovation</span>
          </h2>
        </div>

        <div className="glassmorphism rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Sunrise AI Excellence</h3>
              </div>
              <p className="text-gray-300 mb-6">We implement cutting-edge AI solutions that revolutionize how businesses operate, delivering measurable results and sustainable growth.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400" data-testid="text-satisfaction">97%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400" data-testid="text-efficiency">70%</div>
                  <div className="text-sm text-gray-400">Efficiency Improvement</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm">AI-Powered Intelligence</span>
                <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-sm">24/7 Automation</span>
                <span className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-sm">Seamless Integration</span>
                <span className="bg-pink-600/30 text-pink-300 px-3 py-1 rounded-full text-sm">AI Intelligence</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-red-400 mb-2">Traditional Operations</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Manual processes requiring constant oversight</li>
                  <li>• High operational costs and human error</li>
                  <li>• Limited availability and scalability</li>
                  <li>• Time-consuming administrative tasks</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-400 mb-2">AI Solutions</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Intelligent automation with learning capabilities</li>
                  <li>• Reduced costs and eliminated human error</li>
                  <li>• 24/7 availability with infinite scalability</li>
                  <li>• Streamlined operations and instant results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
