'use client';

import React from 'react';
import { motion } from 'framer-motion';

const examplePortfolios = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Passionate frontend developer with expertise in React, Vue, and modern CSS. Focused on creating accessible and performant web experiences.",
    skills: ["React", "TypeScript", "CSS", "Next.js", "TailwindCSS"],
    featured: "Built an e-commerce platform that increased conversion rates by 23%",
    link: "#portfolio-alex"
  },
  {
    name: "Maya Patel",
    role: "Full Stack Engineer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Full stack developer with 5 years of experience building scalable web applications using modern JavaScript frameworks and cloud technologies.",
    skills: ["JavaScript", "Node.js", "AWS", "React", "MongoDB"],
    featured: "Developed a real-time analytics dashboard for Fortune 500 clients",
    link: "#portfolio-maya"
  },
  {
    name: "Carlos Rivera",
    role: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Backend specialist focused on building robust APIs and microservices. Experienced in high-load systems and database optimization.",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
    featured: "Created a microservice architecture handling 2M+ daily requests",
    link: "#portfolio-carlos"
  }
];

const ExampleSection = () => {
  return (
    <section id="examples" className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.1] -z-10" />
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3"
          >
            Examples
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Example Portfolios
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-foreground/70 max-w-2xl mx-auto"
          >
            See what kind of portfolios our AI can generate for you. 
            These are just examples - your portfolio will be unique to your skills and experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examplePortfolios.map((portfolio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card with hover effects */}
              <div className="card p-6 transition-all duration-300 group-hover:shadow-xl relative z-10
                             group-hover:-translate-y-1 bg-background/80 backdrop-blur-sm border-border/60
                             overflow-hidden">
                {/* Accent color background decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent/70 opacity-60 blur-2xl group-hover:opacity-80 transition-opacity" />
                
                {/* Profile header */}
                <div className="flex items-center mb-4 relative">
                  <div className="mr-4 h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                    <img 
                      src={portfolio.avatar} 
                      alt={portfolio.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{portfolio.name}</h3>
                    <p className="text-sm text-primary font-medium">{portfolio.role}</p>
                  </div>
                </div>
                
                {/* Bio */}
                <p className="text-sm text-foreground/80 mb-5 line-clamp-3">{portfolio.bio}</p>
                
                {/* Skills */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolio.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Featured project highlight */}
                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">Featured Project</h4>
                  <p className="text-sm italic text-foreground/90">&ldquo;{portfolio.featured}&rdquo;</p>
                </div>
                
                {/* View portfolio button */}
                <div className="mt-6 text-right">
                  <a
                    href={portfolio.link}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    View Portfolio
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#generator" 
            className="button px-6 py-3 inline-flex items-center"
          >
            Create Your Portfolio Now
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExampleSection; 