"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
    image: string;
    title: string;
    description: string;
    date: string;
}

export default function GalleryCard({ image, title, description, date }: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [0.5, -0.5], [15, -15]), { stiffness: 450, damping: 50 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [15, -15]), { stiffness: 450, damping: 50 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group h-[400px] w-full rounded-[2.5rem] overflow-hidden glass border-white/10 shadow-2xl scale-100 hover:scale-[1.02] cursor-none"
        >
            {/* Background Image with Zoom Layer */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.img
                    src={`/assets/images/${image}`}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120 opacitiy-80 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
            </div>

            {/* Content Overlay */}
            <div
                style={{ transform: "translateZ(80px)" }}
                className="absolute inset-0 flex flex-col justify-end p-8 pointer-events-none"
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-pink-400 bg-pink-500/10 py-1 px-3 rounded-full border border-pink-500/20">
                            {date}
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight group-hover:text-pink-100 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {description}
                    </p>
                </div>
            </div>

            {/* Glow Effect */}
            <div
                style={{ transform: "translateZ(100px)" }}
                className="absolute top-4 right-8 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(255,107,157,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
