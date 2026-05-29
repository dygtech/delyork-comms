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
  { name: "BellaNaija", src: bellaNaija },
  { name: "Bank of Industry", src: boi },
  { name: "Canon", src: canon },
  { name: "CNN", src: cnn },
  { name: "Dangote", src: dangote },
  { name: "DSTV", src: dstv },
  { name: "GAC Motors", src: gacMotors },
  { name: "Gionee", src: gionee },
  { name: "Gree", src: gree },
  { name: "Islamic Development Bank", src: isdb },
  { name: "Lagos State Government", src: lasg },
  { name: "Lontor", src: lontor },
  { name: "LSETF", src: lsetf },
  { name: "MAN", src: man },
  { name: "Mastercard", src: mastercard },
  { name: "NNPC", src: nnpc },
  { name: "Ogun State Government", src: ogsg },
  { name: "Pepsi", src: pepsi },
  { name: "Swypa", src: swypa },
  { name: "Tabs Connect", src: tabsConnect },
  { name: "Tecno", src: tecno },
  { name: "Tribeca", src: tribeca },
  { name: "UBA", src: uba },
  { name: "YAPPI", src: yappi }
];

const ClientLogo = ({ src, name, index }: { src: string; name: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="bg-white rounded-xl p-6 h-32 md:h-40 flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-gray-100"
    >
      <img
        src={src}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain transition-all duration-300"
      />
    </motion.div>
  );
};

const ClientsSection = () => {
  return (
    <section className="py-24 lg:py-40 bg-white overflow-hidden">
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
            The <span className="text-primary italic">brands & institutions</span> <br className="hidden md:block" />
            that trust us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client, idx) => (
            <ClientLogo
              key={idx}
              src={client.src}
              name={client.name}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
