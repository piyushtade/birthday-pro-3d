"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Clock, Star, Quote, ChevronDown } from 'lucide-react';
import ThreeBackground from '@/components/ThreeBackground';
import GalleryCard from '@/components/GalleryCard';
import BirthdayCake from '@/components/BirthdayCake';

const MEMORIES = [
  { img: 'IMG20260128152800.jpg', title: 'Your Radiant Smile', desc: 'The light that brightens my darkest days.', date: 'JAN 28, 2026' },
  { img: 'IMG20260130130105.jpg', title: 'A New Chapter', desc: 'Starting every journey with you by my side.', date: 'JAN 30, 2026' },
  { img: 'IMG20260130130109.jpg', title: 'Pure Joy', desc: 'Nothing beats the happiness of being with you.', date: 'JAN 30, 2026' },
  { img: 'IMG20260130130111.jpg', title: 'Magic Moments', desc: 'Capturing the feeling of forever.', date: 'JAN 30, 2026' },
  { img: 'IMG20260130130243.jpg', title: 'Our Secret World', desc: 'A place where only love matters.', date: 'JAN 30, 2026' },
  { img: 'WhatsApp Image 2026-02-28 at 21.18.40.jpeg', title: 'The Best View', desc: 'My favorite scenery is always you.', date: 'FEB 28, 2026' },
];

const QUOTES = [
  "I fall deeper in love with you every single day. Every moment with you feels like magic.",
  "You're not just the woman I love; you're the woman I never knew I needed until I met you.",
  "Your smile is my favorite view. No one lights up my life like you do.",
  "You are my peace, my fire, my closest friend, and my favorite distraction."
];

export default function BirthdayPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [isBirthday, setIsBirthday] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const target = new Date('2026-03-01T00:00:00+05:30').getTime();
    const interval = setInterval(() => {
      const diff = target - new Date().getTime();
      if (diff <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' });
        setIsBirthday(true);
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTime({ d: String(d).padStart(2, '0'), h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#030014] selection:bg-pink-500/30">
      <ThreeBackground />

      {/* --- WELCOME OVERLAY --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="glass p-16 rounded-[4rem] text-center max-w-xl border-white/10 shadow-[0_0_100px_rgba(255,107,157,0.2)]"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="bg-gradient-to-tr from-pink-500 to-purple-500 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-8 shadow-glow">
                <Heart fill="white" size={48} />
              </motion.div>
              <h1 className="text-5xl font-black mb-6 tracking-tight gradient-text">A Love Story in 3D</h1>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">I&apos;ve created this futuristic digital world to celebrate the most beautiful person in my life. Ready for our celebration?</p>
              <button
                onClick={() => {
                  setIsOpen(true);
                  const aud = new Audio('/assets/song.mp3'); aud.loop = true; aud.play().catch(console.error);
                }}
                className="group relative px-10 py-5 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 border border-white/10"
              >
                <span className="relative z-10 text-xl font-bold flex items-center gap-2 text-white">Enter Your Reality <Sparkles className="text-pink-400" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl scale-120 group-hover:scale-150 transition-transform opacity-0 group-hover:opacity-100" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 pt-40 pb-20">
        {/* HERO */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="space-y-4">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-xl tracking-[1em] text-pink-500 font-extrabold uppercase drop-shadow-glow-pink"
            >
              {isBirthday ? 'Today is the Day' : 'Happy Birthday'}
            </motion.span>
            <h1 className="text-[12rem] md:text-[20rem] font-black gradient-text tracking-tighter leading-none mb-4 select-none drop-shadow-[0_0_50px_rgba(192,108,243,0.3)]">ARYA</h1>

            {isBirthday && (
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <span className="text-4xl md:text-6xl font-black text-white italic drop-shadow-glow">HAPPY BIRTHDAY MY LOVE! ❤️</span>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  You are the most precious person in my life. Every pixel, every light, and every piece of music in this portal is dedicated to you.
                </p>
              </motion.div>
            )}

            {!isBirthday && (
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="flex flex-col items-center gap-4 text-gray-500">
                <span className="text-sm tracking-[0.5em] uppercase font-bold">Scroll to explore our world</span>
                <ChevronDown className="animate-bounce" />
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* --- DYNAMIC SECTION: COUNTDOWN OR CAKE --- */}
        <section className="container mx-auto px-6 py-40">
          {!isBirthday ? (
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-20 rounded-[5rem] border-white/5 shadow-[0_0_80px_rgba(192,108,243,0.1)] relative group">
              <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                <div className="text-left">
                  <span className="text-purple-400 flex items-center gap-2 font-black uppercase tracking-widest mb-4"><Clock size={20} /> Midnight Magic</span>
                  <h3 className="text-5xl font-black mb-4">Starting the Journey</h3>
                  <p className="text-gray-400 max-w-sm text-lg leading-relaxed">The clock is ticking towards the most beautiful day of the year. Every second brings me closer to seeing your smile.</p>
                </div>
                <div className="flex gap-6 md:gap-12">
                  {[{ v: time.d, l: 'Days' }, { v: time.h, l: 'Hours' }, { v: time.m, l: 'Mins' }, { v: time.s, l: 'Secs' }].map((t, i) => (
                    <div key={i} className="text-center group-hover:scale-110 transition-transform duration-500">
                      <div className="text-6xl md:text-9xl font-black gradient-text drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] tabular-nums">{t.v}</div>
                      <span className="text-xs uppercase tracking-[0.4em] font-black text-gray-600 mt-4 block">{t.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center space-y-12">
              <div className="text-center space-y-4">
                <h3 className="text-5xl font-black gradient-text leading-tight">Make a Wish, Queen 👑</h3>
                <p className="text-gray-400">Click the cake to blow out the candles and see the final surprise.</p>
              </div>
              <BirthdayCake />
            </motion.div>
          )}
        </section>

        {/* GALLERY */}
        <section className="container mx-auto px-6 py-40">
          <div className="mb-20 text-center space-y-4">
            <span className="text-pink-500 font-black uppercase tracking-[0.8em] text-sm flex items-center justify-center gap-4"><Star fill="currentColor" size={14} /> Memories <Star fill="currentColor" size={14} /></span>
            <h2 className="text-7xl font-black tracking-tight drop-shadow-glow">Vault of Hearts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {MEMORIES.map((m, i) => (
              <GalleryCard key={i} image={m.img} title={m.title} description={m.desc} date={m.date} />
            ))}
          </div>
        </section>

        {/* STORY / QUOTES */}
        <section className="container mx-auto px-6 py-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {QUOTES.map((q, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className="glass p-16 rounded-[4rem] group hover:bg-white/5 transition-colors relative h-full">
                <Quote className="absolute top-8 left-8 text-pink-500/10 group-hover:text-pink-500/20 transition-all scale-[3] md:scale-[5]" />
                <p className="text-2xl md:text-3xl font-bold italic leading-relaxed text-gray-200 group-hover:text-white transition-colors relative z-10">{q}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-60 text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12">
            <div className="text-glow animate-pulse">
              <Heart size={120} fill="#ff6b9d" className="text-pink-500" />
            </div>
            <h2 className="text-6xl md:text-8xl font-black gradient-text tracking-tighter">
              {isBirthday ? 'HAPPY BIRTHDAY ARYA!' : 'Stay tuned for Midnight...'}
            </h2>
            <div className="px-8 py-3 glass rounded-full text-pink-400 font-bold tracking-widest uppercase text-sm border-pink-500/20 shadow-glow">
              {isBirthday ? 'Your beautiful journey begins now' : 'The magic begins soon 🌙'}
            </div>
          </motion.div>
        </section>
      </div>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #ff6b9d 0%, #c06cf3 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .drop-shadow-glow-pink {
          filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.8));
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 15px rgba(255, 107, 157, 0.6));
        }
        .shadow-glow {
          box-shadow: 0 0 30px rgba(255, 107, 157, 0.4);
        }
      `}</style>
    </div>
  );
}
