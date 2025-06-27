"use client"

import { useState } from 'react';

export default function GradientTheoryGuide() {
  const [activeTab, setActiveTab] = useState('theory');

  const gradientExamples = [
    {
      name: "Dark Dashboard Base",
      gradient: "from-slate-900 via-slate-800 to-slate-900",
      description: "Subtle depth without distraction",
      use: "Main backgrounds, dashboard containers"
    },
    {
      name: "Accent Overlay",
      gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
      description: "Barely visible color hint",
      use: "Hover states, subtle emphasis"
    },
    {
      name: "Card Depth",
      gradient: "from-slate-800/50 to-slate-900/50",
      description: "Creates visual hierarchy",
      use: "Cards, panels, sections"
    },
    {
      name: "Button Active",
      gradient: "from-blue-600 to-blue-700",
      description: "Clear interaction feedback",
      use: "Primary actions, CTAs"
    }
  ];

  return (
    <div>
      <div className="h-fit min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full fixed top-0">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Professional Gradient Design Theory
          </h1>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-lg">
            {['theory', 'principles', 'examples', 'practice'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Theory Tab */}
          {activeTab === 'theory' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">The Psychology of Professional Gradients</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-slate-300">Why Subtle Gradients Work</h3>
                    <ul className="space-y-2 text-slate-400">
                      <li>• Create depth without overwhelming content</li>
                      <li>• Guide user attention subconsciously</li>
                      <li>• Add visual interest to flat designs</li>
                      <li>• Establish visual hierarchy</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-slate-300">Color Theory Foundation</h3>
                    <ul className="space-y-2 text-slate-400">
                      <li>• Monochromatic: Different shades of same color</li>
                      <li>• Analogous: Adjacent colors on color wheel</li>
                      <li>• Temperature: Warm vs cool undertones</li>
                      <li>• Opacity: Transparency creates layering</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-medium mb-2 text-blue-400">Monochromatic</h4>
                  <p className="text-sm text-slate-400">Same hue, different lightness. Creates harmony and sophistication.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-900 p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-medium mb-2 text-blue-400">Analogous</h4>
                  <p className="text-sm text-slate-400">Neighboring colors. Adds interest while maintaining cohesion.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-medium mb-2 text-blue-400">Transparency</h4>
                  <p className="text-sm text-slate-400">Opacity creates depth and allows content to show through.</p>
                </div>
              </div>
            </div>
          )}

          {/* Principles Tab */}
          {activeTab === 'principles' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">The 5 Core Principles</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-medium mb-2">1. Subtlety Over Boldness</h3>
                    <p className="text-slate-400 mb-4">Professional gradients whisper, they don't shout. The gradient should enhance, not dominate.</p>
                    <div className="flex gap-4">
                      <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-4 rounded-lg text-center">
                        <span className="text-sm">❌ Too Bold</span>
                      </div>
                      <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg text-center">
                        <span className="text-sm">✅ Just Right</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-medium mb-2">2. Directional Purpose</h3>
                    <p className="text-slate-400 mb-4">Gradient direction should guide the eye toward important content.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-slate-800 to-transparent p-4 rounded-lg">
                        <span className="text-sm">→ Horizontal flow</span>
                      </div>
                      <div className="bg-gradient-to-b from-slate-800 to-transparent p-4 rounded-lg">
                        <span className="text-sm">↓ Vertical depth</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-medium mb-2">3. Contextual Relevance</h3>
                    <p className="text-slate-400">Different UI elements need different gradient approaches.</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-lg font-medium mb-2">4. Consistent Color Temperature</h3>
                    <p className="text-slate-400">Warm gradients for energy, cool for professionalism, neutral for versatility.</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-6">
                    <h3 className="text-lg font-medium mb-2">5. Accessibility First</h3>
                    <p className="text-slate-400">Ensure sufficient contrast and readability across all gradient areas.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Real-World Gradient Applications</h2>
              {/* Dashboard Recreation */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700/50 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">D</span>
                    </div>
                    <div>
                      <span className="text-white font-medium">Days left in your trial</span>
                      <span className="ml-2 bg-slate-700 px-2 py-1 rounded text-sm">14</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all">
                    Upgrade Now
                  </button>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                    <h4 className="text-slate-300 text-sm mb-1">Total Chats</h4>
                    <p className="text-2xl font-bold text-white">100%</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-lg border border-slate-700/30">
                    <h4 className="text-slate-300 text-sm mb-1">Avg Chats</h4>
                    <p className="text-2xl font-bold text-white">80%</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/50 p-4 rounded-lg border border-blue-700/30">
                    <h4 className="text-blue-300 text-sm mb-1">Active Users</h4>
                    <p className="text-2xl font-bold text-white">1,234</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/20 to-slate-900/50 p-4 rounded-lg border border-green-700/30">
                    <h4 className="text-green-300 text-sm mb-1">Growth</h4>
                    <p className="text-2xl font-bold text-white">+12%</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 rounded-lg border border-slate-700/30">
                  <h3 className="text-white font-medium mb-4">Chart Area</h3>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 60, 80, 45, 70, 90, 65, 85].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Gradient Library */}
              <div className="grid md:grid-cols-2 gap-4">
                {gradientExamples.map((example, i) => (
                  <div key={i} className={`bg-gradient-to-br ${example.gradient} p-6 rounded-xl border border-slate-700/50`}>
                    <h4 className="font-medium mb-2">{example.name}</h4>
                    <p className="text-sm text-slate-400 mb-2">{example.description}</p>
                    <p className="text-xs text-slate-500">{example.use}</p>
                    <code className="text-xs bg-slate-900/50 px-2 py-1 rounded mt-2 block">{example.gradient}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Hands-On Practice</h2>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Step-by-Step Gradient Creation</h3>
                <div className="space-y-6">
                  <div className="border border-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-yellow-400">Step 1: Choose Your Base Colors</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-900 p-3 rounded text-center">
                        <div className="w-full h-8 bg-slate-900 rounded mb-2"></div>
                        <span className="text-xs">slate-900</span>
                      </div>
                      <div className="bg-slate-800 p-3 rounded text-center">
                        <div className="w-full h-8 bg-slate-800 rounded mb-2"></div>
                        <span className="text-xs">slate-800</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded text-center">
                        <div className="w-full h-8 bg-slate-700 rounded mb-2"></div>
                        <span className="text-xs">slate-700</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-yellow-400">Step 2: Add Direction</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded text-center">
                        <span className="text-sm">to-r (horizontal)</span>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded text-center">
                        <span className="text-sm">to-br (diagonal)</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-yellow-400">Step 3: Fine-tune with Opacity</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-4 rounded text-center">
                        <span className="text-sm">/30 opacity</span>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded text-center">
                        <span className="text-sm">/50 opacity</span>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 p-4 rounded text-center">
                        <span className="text-sm">/70 opacity</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-700/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-yellow-400">Step 4: Add Accent Colors (Optional)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-900 p-4 rounded text-center">
                        <span className="text-sm">Blue accent</span>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-900 p-4 rounded text-center">
                        <span className="text-sm">Purple accent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Common Gradient Patterns</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg"></div>
                    <div>
                      <h4 className="font-medium">Background Base</h4>
                      <code className="text-sm text-slate-400">from-slate-800 to-slate-900</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50"></div>
                    <div>
                      <h4 className="font-medium">Card/Panel</h4>
                      <code className="text-sm text-slate-400">from-slate-800/50 to-slate-900/50</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg"></div>
                    <div>
                      <h4 className="font-medium">Button/CTA</h4>
                      <code className="text-sm text-slate-400">from-blue-600 to-blue-700</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
