"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LOGIN_HREF, SECTION_IDS } from "./content";
import { ArrowRightIcon } from "./LandingIcons";
import { scrollToSection } from "./scrollToSection";

export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.home}
      aria-labelledby="hero-title"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-0"
    >
      <Image
        src="/landing/bg_landing_hero.webp"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-primary/40 via-primary/20 to-primary/10" />

      <div className="relative z-10 flex w-full max-w-7xl flex-col-reverse justify-center gap-8 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-x-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 lg:max-w-2xl"
        >
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl leading-tight font-bold text-on-primary drop-shadow-lg md:text-4xl lg:text-5xl"
          >
            Reservasi Fasilitas Kampus, <span className="font-extrabold text-primary-tint">Cukup dari Satu Tempat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl text-sm leading-relaxed text-on-primary md:text-base"
          >
            Pesan ruangan, GOR, dan kendaraan kampus Universitas Dian Nuswantoro. Lihat slot yang masih kosong, kirim
            permohonan, lalu pantau statusnya sampai disetujui admin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href={LOGIN_HREF}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-surface px-6 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-soft active:translate-y-0 active:bg-primary-tint"
            >
              Reservasi Sekarang
              {/* The one arrow on the page: it marks the main way in. */}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group relative"
        >
          <Image
            src="/landing/mock-device.webp"
            alt="Tampilan aplikasi reservasi di laptop dan ponsel"
            width={1100}
            height={899}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 550px, (min-width: 768px) 420px, 320px"
            className="w-[320px] drop-shadow-2xl transition-transform duration-700 md:w-[420px] md:group-hover:scale-105 lg:w-[550px]"
          />
        </motion.div>
      </div>

      <motion.a
        href={`#${SECTION_IDS.facilities}`}
        onClick={(event) => {
          event.preventDefault();
          scrollToSection(SECTION_IDS.facilities);
        }}
        aria-label="Lihat bagian fasilitas"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="group absolute bottom-6 left-1/2 hidden min-h-11 min-w-11 -translate-x-1/2 flex-col items-center justify-center space-y-2 rounded-full sm:flex md:bottom-8"
      >
        <span className="size-1 rounded-full bg-primary/40" />
        <span className="size-1 rounded-full bg-primary/60" />
        <span className="size-1.5 rounded-full bg-primary/80" />
      </motion.a>
    </section>
  );
}
