import React from 'react';
import { 
  Github, Linkedin, Mail, Twitter, 
  ExternalLink, Code, Briefcase, GraduationCap, 
  Award, Heart, Terminal, Cpu, Globe, 
  User, Send, MapPin, ChevronRight
} from 'lucide-react';

export default function TemplateDeveloper({ p = {} }) {
  const { 
    details = {}, 
    skills = [], 
    experience = [], 
    projects = [], 
    education = [],
    certifications = [] 
  } = p;

  const primaryColor = '#55198b';
  const secondaryColor = '#6c63ff';
  const bgDark = '#171c28';
  const textColor = '#ffffff';
  const subTitleColor = '#868e96';

  const socialLinks = [
    { icon: <Github size={24} />, url: details.github },
    { icon: <Linkedin size={24} />, url: details.linkedin },
    { icon: <Twitter size={24} />, url: details.twitter },
    { icon: <Mail size={24} />, url: `mailto:${details.email}` }
  ].filter(link => link.url);

  return (
    <div id="portfolio-render" className="developer-template overflow-x-hidden" style={{ background: bgDark, color: textColor, fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
        
        .developer-template {
          scroll-behavior: smooth;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }

        .purple-text {
          color: ${secondaryColor};
        }

        .social-icon-circle {
          background-color: #ffffff;
          color: #000;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .social-icon-circle:hover {
          background-color: ${primaryColor};
          color: #ffffff;
          transform: scale(1.1);
        }

        .btn-resume {
          background-color: ${secondaryColor};
          color: #fff;
          padding: 12px 30px;
          border-radius: 5px;
          font-weight: 700;
          text-transform: uppercase;
          transition: all 0.3s ease;
          display: inline-block;
          border: none;
          cursor: pointer;
        }

        .btn-resume:hover {
          background-color: ${primaryColor};
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .skill-card {
           background: rgba(255, 255, 255, 0.05);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 10px;
           padding: 20px;
           transition: all 0.3s ease;
           text-align: center;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: ${secondaryColor};
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .experience-card {
          background: rgba(255, 255, 255, 0.03);
          border-left: 5px solid ${secondaryColor};
          padding: 24px;
          border-radius: 0 10px 10px 0;
          margin-bottom: 20px;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
        }

        .project-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .floating-anim {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .timeline-item {
          position: relative;
          padding-left: 40px;
          border-left: 2px solid ${secondaryColor};
          margin-bottom: 30px;
        }

        .timeline-dot {
          position: absolute;
          left: -11px;
          top: 0;
          width: 20px;
          height: 20px;
          background: ${secondaryColor};
          border-radius: 50%;
          border: 4px solid ${bgDark};
        }

        .wave-emoji {
          display: inline-block;
          animation: wave-animation 2.1s infinite;
          transform-origin: 70% 70%;
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
      `}</style>

      {/* --- GREETING SECTION --- */}
      <section className="flex items-center px-6 md:px-20 py-32 min-h-[600px]">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          <div className="order-2 md:order-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Hi all, I'm <span style={{ color: secondaryColor }}>{details.name || 'Developer'}</span>
              <span className="inline-block animate-bounce ml-2 wave-emoji">👋</span>
            </h1>
            <p className="text-xl md:text-2xl" style={{ color: subTitleColor }}>
              {details.bio || 'A passionate Software Developer building cool products in the digital world.'}
            </p>
            
            <div className="flex gap-4 py-4">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="social-icon-circle">
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="pt-6">
              <button className="btn-resume">Contact Me</button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center floating-anim">
             <img 
               src="/images/templates/developer/manOnTable.svg" 
               alt="greeting" 
               className="w-full max-w-[500px]"
             />
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
               <img 
                 src="/images/templates/developer/developerActivity.svg" 
                 alt="skills" 
                 className="w-full max-w-[450px]"
               />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">What I do</h2>
              <p className="text-lg mb-8 uppercase tracking-widest" style={{ color: subTitleColor }}>
                Full Stack Developer exploring every tech stack
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-purple-900/30 text-purple-400">
                    <Terminal size={24} />
                  </div>
                  <p className="text-lg">Develop highly interactive Front end / User Interfaces for web & mobile</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-blue-900/30 text-blue-400">
                    <Globe size={24} />
                  </div>
                  <p className="text-lg">Progressive Web Applications (PWA) and Single Page Applications</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-indigo-900/30 text-indigo-400">
                    <Cpu size={24} />
                  </div>
                  <p className="text-lg">Integration of cloud services like Firebase, AWS, and Digital Ocean</p>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 mt-12">
                 {skills.map((skill, i) => (
                   <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                     <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500 transition-colors">
                        <Code size={24} className="text-gray-400 group-hover:text-white" />
                     </div>
                     <span className="text-[10px] uppercase font-bold text-gray-500">{skill.name}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROFICIENCY SECTION (via Experience stats) --- */}
      <section className="py-24 px-6 md:px-20 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Proficiency</h2>
          <div className="space-y-8">
            {skills.slice(0, 4).map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold uppercase">{skill.name}</span>
                  <span className="text-purple-400">90%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: '90%', 
                      background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      {experience.length > 0 && (
        <section className="py-24 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title">Work Experience</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {experience.map((exp, i) => (
                <div key={i} className="experience-card group">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                        <p className="purple-text font-semibold text-lg">{exp.company}</p>
                      </div>
                      <span className="text-sm bg-white/10 px-3 py-1 rounded text-gray-400">{exp.from} - {exp.to}</span>
                   </div>
                   <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- EDUCATION SECTION --- */}
      {education.length > 0 && (
        <section className="py-24 px-6 md:px-20 bg-black/20">
           <div className="max-w-4xl mx-auto">
            <h2 className="section-title">Education</h2>
            <div className="mt-12">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-2xl font-bold">{edu.institution}</h3>
                    <span className="text-purple-400 font-bold">{edu.from} - {edu.to}</span>
                  </div>
                  <h4 className="text-xl text-gray-300 mb-4">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</h4>
                  {edu.grade && <p className="text-gray-500 font-bold mb-4">GPA: {edu.grade}</p>}
                </div>
              ))}
            </div>
           </div>
        </section>
      )}

      {/* --- PROJECTS SECTION --- */}
      {projects.length > 0 && (
        <section className="py-24 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
               {projects.map((proj, i) => (
                 <div key={i} className="project-card flex flex-col">
                    <div className="h-48 overflow-hidden bg-white/5 flex items-center justify-center">
                       {proj.image ? (
                         <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                       ) : (
                         <Terminal size={64} className="text-gray-700" />
                       )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-3">{proj.name}</h3>
                      <p className="text-gray-400 text-sm mb-6 flex-1">{proj.description}</p>
                      
                      <div className="flex gap-4 mt-auto">
                        {proj.github && (
                          <a href={proj.github} className="p-2 rounded-full bg-white/10 hover:bg-purple-600 transition-colors">
                            <Github size={20} />
                          </a>
                        )}
                        {proj.link && (
                          <a href={proj.link} className="p-2 rounded-full bg-white/10 hover:bg-purple-600 transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* --- ACHIEVEMENTS SECTION --- */}
      {certifications.length > 0 && (
        <section className="py-24 px-6 md:px-20 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
               {certifications.map((cert, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto text-purple-400">
                      <Award size={32} />
                    </div>
                    <h3 className="text-xl font-bold">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER / CONTACT --- */}
      <footer className="py-12 px-6 md:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
           <h2 className="text-3xl font-bold">Reach Out to me!</h2>
           <p className="text-xl text-gray-400 max-w-2xl">
             DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
           </p>
           
           <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-lg font-bold">
                 <Mail className="purple-text" /> {details.email}
              </div>
              <div className="flex items-center gap-3 text-lg font-bold text-gray-500 uppercase tracking-tighter">
                 <MapPin className="purple-text" /> {details.location || 'Remote'}
              </div>
           </div>

           <div className="flex gap-6 py-4">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
           </div>

           <div className="pt-10 flex items-center gap-2 text-sm text-gray-500">
              Made with <Heart size={16} className="text-red-500 fill-red-500" /> by {details.name}
           </div>
        </div>
      </footer>

    </div>
  );
}
