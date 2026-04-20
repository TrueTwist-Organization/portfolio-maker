import React from 'react'
import { 
  Github, Twitter, Linkedin, Instagram, 
  ExternalLink, Code2, Briefcase, GraduationCap, 
  User, Award, Mail, Phone, MapPin 
} from 'lucide-react'

export default function TemplateSoumya({ p }) {
  const { details, skills, experience, projects, education } = p
  const accent = '#c770f0'

  return (
    <div className="soumya-template min-h-screen bg-[#0c0513] text-white font-sans selection:bg-[#c770f0] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap');
        
        .soumya-template {
          font-family: 'Raleway', sans-serif;
        }

        .purple {
          color: ${accent} !important;
        }

        .home-section {
          background-position: top center;
          background-repeat: no-repeat;
          padding-top: 100px;
          padding-bottom: 50px;
        }

        .wave {
          animation: wave-animation 2.1s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        @keyframes wave-animation {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .main-hero-img {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .tech-icons {
          background: rgba(255, 255, 255, 0.05);
          border: 1.7px solid rgba(200, 137, 230, 0.3);
          border-radius: 10px;
          transition: all 0.4s ease 0s !important;
        }

        .tech-icons:hover {
          transform: scale(1.05) !important;
          border-color: rgba(197, 115, 230, 0.8) !important;
          box-shadow: 0 0 15px rgba(197, 115, 230, 0.3);
        }

        .project-card {
          background: transparent;
          border: 1px solid rgba(119, 53, 136, 0.4);
          box-shadow: 0 4px 5px 3px rgba(119, 53, 136, 0.2);
          transition: all 0.5s ease 0s;
        }

        .project-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 15px 5px rgba(129, 72, 144, 0.4);
        }

        .resume-timeline-item {
          border-left: 2px solid #8a49a8;
          position: relative;
          padding-left: 30px;
          padding-bottom: 30px;
        }

        .resume-timeline-item::before {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          left: -9px;
          top: 0;
          background: #fff;
          border: 2px solid #8a49a8;
        }

        .social-icons-footer {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #700c86;
          transition: 0.5s;
        }

        .social-icons-footer:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px #801f95;
          color: #87209e;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="home-section max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Hi There! <span className="wave">👋🏻</span>
            </h1>
            <h1 className="text-5xl md:text-6xl font-extrabold uppercase">
              I'M <span className="purple">{details.name}</span>
            </h1>
            <div className="text-2xl md:text-3xl font-bold purple opacity-90">
              {details.title}
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {details.bio}
            </p>
          </div>
          <div className="hidden lg:flex justify-center">
            <img 
              src="/images/templates/portfolio-master/home-main.svg" 
              alt="home-img" 
              className="main-hero-img w-[450px] max-w-full"
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-20 lg:py-32 bg-[#0c0513] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold uppercase text-center lg:text-left">
              LET ME <span className="purple">INTRODUCE</span> MYSELF
            </h1>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                {details.bio}
              </p>
              {details.location && (
                <p className="flex items-center gap-3">
                   <MapPin className="purple" size={20} /> Based in <span className="purple font-bold">{details.location}</span>
                </p>
              )}
              {details.email && (
                <p className="flex items-center gap-3">
                   <Mail className="purple" size={20} /> <span className="purple font-bold">{details.email}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/images/templates/portfolio-master/avatar.svg" 
              alt="avatar" 
              className="w-64 md:w-80"
            />
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-16 uppercase">
          Professional <span className="purple">Skillset</span>
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills?.map((skill, i) => (
            <div key={i} className="tech-icons aspect-square flex flex-col items-center justify-center p-4 text-center group">
               <div className="w-12 h-12 mb-3 purple group-hover:scale-110 transition-transform">
                  <Code2 size={48} />
               </div>
               <span className="font-bold text-sm md:text-base">{skill.name}</span>
               <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{skill.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE & EDUCATION --- */}
      <section className="py-20 lg:py-32 bg-[rgba(17,16,16,0.2)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
             <h1 className="text-3xl md:text-4xl font-bold mb-12 uppercase flex items-center gap-4">
                <Briefcase className="purple" /> Experience
             </h1>
             <div className="space-y-2">
                {experience?.map((exp, i) => (
                  <div key={i} className="resume-timeline-item">
                    <div className="bg-[#5234795d] inline-block px-4 py-1.5 rounded text-sm font-bold purple mb-3">
                      {exp.from} - {exp.to}
                    </div>
                    <h3 className="text-xl font-bold uppercase">{exp.role}</h3>
                    <p className="text-purple-400 font-semibold mb-3">{exp.company}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
             </div>
          </div>

          {/* Education */}
          <div>
             <h1 className="text-3xl md:text-4xl font-bold mb-12 uppercase flex items-center gap-4">
                <GraduationCap className="purple" /> Education
             </h1>
             <div className="space-y-2">
                {education?.map((edu, i) => (
                  <div key={i} className="resume-timeline-item">
                    <div className="bg-[#5234795d] inline-block px-4 py-1.5 rounded text-sm font-bold purple mb-3">
                      {edu.from} - {edu.to}
                    </div>
                    <h3 className="text-xl font-bold uppercase">{edu.degree}</h3>
                    <p className="text-purple-400 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-gray-500 italic text-sm">{edu.field}</p>
                    {edu.grade && <p className="text-gray-400 text-xs mt-2 font-bold">Grade: {edu.grade}</p>}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 uppercase">
          My Recent <span className="purple">Works</span>
        </h1>
        <p className="text-center text-gray-400 mb-20">Here are a few projects I've worked on recently.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((proj, i) => (
            <div key={i} className="project-card rounded-xl overflow-hidden flex flex-col h-full bg-[#0c0513]/50">
              <div className="h-48 overflow-hidden bg-purple-900/20 flex items-center justify-center border-b border-purple-500/20">
                 <img src={proj.image || '/images/templates/portfolio-master/logo.png'} alt={proj.name} className="w-full h-full object-cover opacity-60" />
              </div>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                 <h3 className="text-xl font-bold text-center">{proj.name}</h3>
                 <p className="text-sm text-gray-400 text-center flex-1 leading-relaxed">
                   {proj.description}
                 </p>
                 <div className="pt-4 flex flex-wrap justify-center gap-2">
                    {proj.tech?.split(',').map((t, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {t.trim()}
                      </span>
                    ))}
                 </div>
                 <div className="flex gap-4 pt-4">
                   {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="flex-1 bg-[#623686] hover:bg-[#6d20c5d7] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">
                        <Github size={16} /> GitHub
                      </a>
                   )}
                   {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="flex-1 bg-[#623686] hover:bg-[#6d20c5d7] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">
                        <ExternalLink size={16} /> Demo
                      </a>
                   )}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="footer bg-[#0a0416] py-10 mt-20 border-t border-purple-500/10 mb-[-1px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8 items-center text-center">
           <p className="text-sm">Designed and Developed by {details.name}</p>
           <p className="text-sm">Copyright © {new Date().getFullYear()}</p>
           <div className="flex justify-center gap-4">
             {details.github && (
                <a href={details.github} className="social-icons-footer"><Github size={18} /></a>
             )}
             {details.linkedin && (
                <a href={details.linkedin} className="social-icons-footer"><Linkedin size={18} /></a>
             )}
             {details.twitter && (
                <a href={details.twitter} className="social-icons-footer"><Twitter size={18} /></a>
             )}
             {details.instagram && (
                <a href={details.instagram} className="social-icons-footer"><Instagram size={18} /></a>
             )}
           </div>
        </div>
      </footer>

    </div>
  )
}
