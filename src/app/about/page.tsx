"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VanGogh3DCard } from "./components/VanGogh3DCard/VanGogh3DCard";
import { ScrollReveal } from "../../components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <motion.main
      className="relative py-16 md:py-20 px-[7.5%] md:!pl-26 2xl:!px-0 2xl:!pl-5 w-full max-w-7xl mx-auto overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-labelledby="about-title"
    >
      <header className="text-center mb-14 text-lg" role="banner">
        <ScrollReveal
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1
            id="about-title"
            className="text-4xl md:text-6xl font-bold text-foreground drop-shadow-md"
          >
            Sobre o Van Gogh Univers
          </h1>
        </ScrollReveal>

        <ScrollReveal
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Uma experiência digital imersiva que une arte, emoção e tecnologia —
            inspirada na vida e na visão de Vincent van Gogh.
          </p>
        </ScrollReveal>
      </header>

      <ScrollReveal className="mb-14">
        <VanGogh3DCard />
      </ScrollReveal>

      <section
        aria-labelledby="vision-title"
        className="grid gap-10 text-lg md:grid-cols-2"
      >
        <ScrollReveal
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="h-full bg-background/60 backdrop-blur-md border-border">
            <CardContent className="p-8 space-y-4">
              <h2
                id="vision-title"
                className="text-2xl font-semibold text-foreground"
              >
                Nossa Visão
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Acreditamos que a arte deve ser acessível, viva e inspiradora. O{" "}
                <strong>Van Gogh Univers</strong> conecta o passado e o
                presente, permitindo que a intensidade das cores e emoções do
                artista sejam sentidas de forma autêntica e contemporânea.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Nosso objetivo é oferecer uma experiência que vá além da
                contemplação — uma imersão na mente criativa de Van Gogh.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="h-full bg-background/60 backdrop-blur-md border-border">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Tecnologia e Arte
              </h2>
              <p className="text-muted-foreground text-justify leading-relaxed">
                Criado com <strong>Next.js</strong>,{" "}
                <strong>Framer Motion</strong> e <strong>Three.js</strong>, o
                projeto traduz o movimento e a textura das pinceladas em
                experiências interativas 3D que evocam a profundidade emocional
                das obras originais.
              </p>
              <p className="text-muted-foreground text-justify leading-relaxed">
                Cada detalhe visual foi cuidadosamente desenvolvido para
                respeitar a essência da arte clássica enquanto explora as
                possibilidades infinitas do digital.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </section>

      <Separator className="my-14" />

      <section
        aria-labelledby="immersive-title"
        className="max-w-4xl text-lg mx-auto text-center space-y-6"
      >
        <ScrollReveal>
          <h2 id="immersive-title" className="text-3xl font-semibold mb-4">
            Uma Experiência Imersiva
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-muted-foreground leading-relaxed">
            O <strong>Van Gogh Univers</strong> transforma a contemplação em
            descoberta. Ao navegar pelas galerias, o visitante interage com
            obras em movimento, observa detalhes invisíveis a olho nu e
            compreende a emoção presente em cada traço.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-muted-foreground leading-relaxed">
            Tudo é dinâmico — as cores reagem, as formas respiram e a arte ganha
            vida através da tecnologia. É um convite para mergulhar nas emoções
            de Van Gogh e enxergar o mundo através de seus olhos.
          </p>
        </ScrollReveal>
      </section>

      <Separator className="my-14" />

      <ScrollReveal className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/assets/van-gogh-portrait.jpg"
          alt="Retrato de Vincent van Gogh"
          fill
          className="object-cover object-center"
          priority
        />
      </ScrollReveal>

      <Separator className="my-14" />

      <section
        aria-labelledby="legacy-title"
        className="space-y-6 text-lg text-muted-foreground text-center leading-relaxed"
      >
        <ScrollReveal>
          <h2
            id="legacy-title"
            className="text-3xl font-semibold text-foreground text-center mb-4"
          >
            O Legado de Van Gogh
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Van Gogh nos ensinou que a arte é uma forma de cura e expressão
            universal. Mesmo em meio à dor e à solidão, ele encontrou nas cores
            um meio de eternizar sua alma. Este projeto é uma homenagem à sua
            coragem e à sua visão incompreendida — um testemunho de que a beleza
            pode nascer do caos.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <blockquote className="italic text-center text-muted-foreground pt-4">
            “A arte é para consolar aqueles que são quebrados pela vida.”
            <br />– Vincent van Gogh
          </blockquote>
        </ScrollReveal>
      </section>
    </motion.main>
  );
}
