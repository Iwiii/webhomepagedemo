/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Sparkles, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 py-6 px-10 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">Lovart<span className="text-violet-400">.ai</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium transition-all border border-white/10">
          开始创作
        </button>
      </div>
    </nav>
  );
};

interface PartProps {
  scrollYProgress: MotionValue<number>;
}

// Part 1: Hero Zoom & Fade
const Part1 = ({ scrollYProgress }: PartProps) => {
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/ai-art-1/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <motion.div style={{ opacity: textOpacity, y: textY }} className="z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6">
          释放 <span className="text-gradient">无限</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
          向下滚动，开启 AI 艺术的进化之旅。
        </p>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20 flex flex-col items-center gap-2 text-zinc-500"
        >
          <MousePointer2 className="w-6 h-6" />
          <span className="text-xs uppercase tracking-widest">向下滚动</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Part 2: Feature Reveal (Horizontal Slide)
const Part2 = ({ scrollYProgress }: PartProps) => {
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#020617] overflow-hidden">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-transparent"></div>
      </motion.div>

      <motion.div style={{ x, opacity }} className="z-10 flex flex-col md:flex-row items-center gap-12 px-10 max-w-7xl">
        <div className="flex-1">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-8">
            <Zap className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">极速生成</h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            基于最新的扩散模型优化，Lovart 可以在几秒钟内将你的文字描述转化为高分辨率的艺术作品。
          </p>
        </div>
        <div className="flex-1 glass rounded-[2.5rem] p-4 aspect-square overflow-hidden">
          <img 
            src="https://picsum.photos/seed/fast-ai/800/800" 
            alt="Fast Generation" 
            className="w-full h-full object-cover rounded-[2rem]"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </div>
  );
};

// Part 3: 3D Perspective Shift
const Part3 = ({ scrollYProgress }: PartProps) => {
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-500, 0, -500]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black perspective-[2000px]">
      <motion.div 
        style={{ rotateX, scale, opacity, translateZ: z }}
        className="relative w-[80%] aspect-video glass rounded-[3rem] overflow-hidden shadow-2xl shadow-violet-500/20"
      >
        <img 
          src="https://picsum.photos/seed/3d-ai/1600/900" 
          alt="Interface" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">多维控制</h2>
          <p className="text-xl text-zinc-300 max-w-xl">
            不仅仅是生成，更是掌控。通过深度图、姿态估计和边缘检测，精准引导 AI 的每一步创作。
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Part 4: Grid Expansion
const Part4 = ({ scrollYProgress }: PartProps) => {
  const gridScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#020617] overflow-hidden">
      <motion.div style={{ scale: gridScale, opacity }} className="grid grid-cols-3 gap-4 w-[120%] h-[120%] rotate-12">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="glass rounded-3xl overflow-hidden aspect-square">
            <img 
              src={`https://picsum.photos/seed/grid-${i}/400/400`} 
              alt={`Art ${i}`} 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center z-10 px-6"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-8">加入社区</h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-xl mx-auto">
            与全球数百万创作者分享灵感，共同探索 AI 艺术的边界。
          </p>
          <button className="px-12 py-6 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-bold text-xl transition-all flex items-center gap-3 mx-auto">
            立即开始 <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const StickySection = ({ children, height = "300vh" }: { children: (progress: MotionValue<number>) => React.ReactNode, height?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar />
      <main>
        <StickySection height="200vh">
          {(progress) => <Part1 scrollYProgress={progress} />}
        </StickySection>
        
        <StickySection height="300vh">
          {(progress) => <Part2 scrollYProgress={progress} />}
        </StickySection>
        
        <StickySection height="300vh">
          {(progress) => <Part3 scrollYProgress={progress} />}
        </StickySection>
        
        <StickySection height="300vh">
          {(progress) => <Part4 scrollYProgress={progress} />}
        </StickySection>

        {/* Simple Footer */}
        <footer className="py-20 px-10 border-t border-white/5 text-center text-zinc-600">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Lovart.ai</span>
          </div>
          <p className="text-sm">© 2024 Lovart AI. 释放你的无限创意。</p>
        </footer>
      </main>
    </div>
  );
}
