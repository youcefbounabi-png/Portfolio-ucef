import { motion, MotionValue } from 'motion/react'

type CloudProps = {
  cloudY: MotionValue<number>
}

export default function CloudTransition({ cloudY }: CloudProps) {
  return (
    <motion.img
      src="/cloud.png"
      alt=""
      className="absolute -bottom-[155px] sm:-bottom-[195px] md:-bottom-[275px] left-1/2 -translate-x-1/2 md:left-[-5vw] md:translate-x-0 w-[240vw] sm:w-[160vw] md:w-[110vw] min-w-[850px] md:min-w-0 max-w-none h-auto object-contain pointer-events-none select-none z-20 md:drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
      style={{
        y: cloudY,
        willChange: 'transform',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 1.2, ease: 'easeOut' } }}
    />
  )
}
