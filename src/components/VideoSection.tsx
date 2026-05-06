import { motion } from "framer-motion";
import { Play } from "lucide-react";
import videoThumb from "@/assets/video-thumb.jpg";

const VideoSection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto"
        >
          <img
            src={videoThumb}
            alt="Watch our video"
            className="w-full h-[400px] md:h-[500px] object-cover"
            loading="lazy"
            width={900}
            height={600}
          />
          <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-foreground/20 backdrop-blur-sm border border-foreground/30 flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-foreground fill-foreground" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
