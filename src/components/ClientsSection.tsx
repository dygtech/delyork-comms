import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

import bellaNaija from "../assets/clients/bella-naija.png";
import boi from "../assets/clients/boi.jpeg";
import canon from "../assets/clients/canon.jpg";
import cnn from "../assets/clients/cnn.jpg";
import dangote from "../assets/clients/dangote.jpg";
import dstv from "../assets/clients/dstv.jpg";
import gacMotors from "../assets/clients/gac-motors.jpg";
import gionee from "../assets/clients/gionee.jpg";
import gree from "../assets/clients/gree.jpg";
import isdb from "../assets/clients/isdb.png";
import lasg from "../assets/clients/lasg.jpg";
import lontor from "../assets/clients/lontor.jpg";
import lsetf from "../assets/clients/lsetf.png";
import man from "../assets/clients/man.jpeg";
import mastercard from "../assets/clients/mastercard.svg";
import nnpc from "../assets/clients/nnpc.jpg";
import ogsg from "../assets/clients/ogsg.jpeg";
import pepsi from "../assets/clients/pepsi.jpg";
import swypa from "../assets/clients/swypa.jpg";
import tabsConnect from "../assets/clients/tabs-connect.jpg";
import tecno from "../assets/clients/tecno.jpg";
import tribeca from "../assets/clients/tribeca.png";
import uba from "../assets/clients/uba.jpg";
import yappi from "../assets/clients/yappi.jpg";

const clients = [
  { name: "Mastercard", src: mastercard },
  { name: "Islamic Development Bank", src: isdb },
  { name: "Lagos State Government", src: lasg },
  { name: "Ogun State Government", src: ogsg },
  { name: "NNPC", src: nnpc },
  { name: "MAN", src: man },
  { name: "Dangote", src: dangote },
  { name: "GAC Motors", src: gacMotors },
  { name: "YAPPI", src: yappi },
  { name: "UBA", src: uba },
  { name: "BellaNaija", src: bellaNaija },
  { name: "Bank of Industry", src: boi },
  { name: "Canon", src: canon },
  { name: "CNN", src: cnn },
  { name: "DSTV", src: dstv },
  { name: "Gionee", src: gionee },
  { name: "Gree", src: gree },
  { name: "Lontor", src: lontor },
  { name: "LSETF", src: lsetf },
  { name: "Pepsi", src: pepsi },
  { name: "Swypa", src: swypa },
  { name: "Tabs Connect", src: tabsConnect },
  { name: "Tecno", src: tecno },
  { name: "Tribeca", src: tribeca },
];

const ClientsSection = () => {
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...clients, ...clients];

  return (
    <section id="partners" className="py-24 lg:py-40 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-black/60 text-sm uppercase tracking-[0.3em] font-bold font-body">Our Network</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-black">
            The <span className="text-primary">brands & institutions</span> <br className="hidden md:block" />
            that trust us.
          </h2>
        </motion.div>
      </div>

      {/* Full-width scrolling strip — outside the container so it bleeds edge-to-edge */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track flex gap-4 w-max">
          {marqueeItems.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-white rounded-xl p-5 h-28 w-40 md:h-32 md:w-48 flex items-center justify-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={client.src}
                alt={`${client.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

