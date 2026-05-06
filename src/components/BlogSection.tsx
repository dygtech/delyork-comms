import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  { img: blog1, title: "Your Partner In Creative Growth", category: "Development", date: "September 23, 2025" },
  { img: blog2, title: "Innovative Strategies, Stunning Results", category: "Technology", date: "September 23, 2025" },
  { img: blog3, title: "Crafting Digital Solutions For Tomorrow", category: "Development", date: "September 23, 2025" },
];

const BlogSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest">Latest News & Posts</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Learn From Journal Insight{" "}
            <span className="text-primary italic">Of Blenco</span>
          </h2>
          <p className="text-foreground/60 text-sm mt-4 max-w-xl mx-auto">
            At our Creative Digital Agency, we bring your ideas life beach
            crafting engaging, impactful digital experiences that captivate audiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.a
              href="#"
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-card relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-body">
                  {post.category}
                </span>
                <h3 className="font-heading text-lg font-bold mt-3">{post.title}</h3>
                <p className="text-foreground/50 text-xs mt-2">— {post.date}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
