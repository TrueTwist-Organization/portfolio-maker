import React from 'react'
import { 
  User, Briefcase, GraduationCap, Code2, 
  FolderGit2, Award, BookOpen, Trophy, 
  Home, Mail, ExternalLink, Github
} from 'lucide-react'

// Colors based on Alexa theme (Bedimcode)
const HUE = 250
const FIRST_COLOR = `hsl(${HUE}, 69%, 61%)`
const FIRST_COLOR_ALT = `hsl(${HUE}, 57%, 53%)`
const TITLE_COLOR = `hsl(${HUE}, 8%, 15%)`
const TEXT_COLOR = `hsl(${HUE}, 8%, 45%)`
const TEXT_COLOR_LIGHT = `hsl(${HUE}, 8%, 65%)`
const INPUT_COLOR = `hsl(${HUE}, 70%, 96%)`
const BODY_COLOR = `hsl(${HUE}, 60%, 99%)`
const CONTAINER_COLOR = '#FFF'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

function Section({ title, subtitle, id, children }) {
  return (
    <section id={id} style={{ padding: '4rem 0 2rem' }}>
      <h2 style={{ fontSize: '1.5rem', color: TITLE_COLOR, textAlign: 'center', marginBottom: '0.25rem' }}>{title}</h2>
      <span style={{ display: 'block', fontSize: '0.813rem', color: TEXT_COLOR_LIGHT, textAlign: 'center', marginBottom: '3rem' }}>{subtitle}</span>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 1.5rem' }}>
        {children}
      </div>
    </section>
  )
}

export default function TemplateAlexa({ p = {} }) {
  const { details: d = {}, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p

  return (
    <div id="portfolio-render" style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: BODY_COLOR,
      color: TEXT_COLOR,
      minHeight: '100vh',
      paddingBottom: '3rem'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        .alexa-nav-icon { color: ${TEXT_COLOR}; transition: 0.3s; }
        .alexa-nav-icon:hover { color: ${FIRST_COLOR}; }
        .alexa-btn {
          background-color: ${FIRST_COLOR};
          color: #FFF;
          padding: 1rem 1.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .alexa-btn:hover { background-color: ${FIRST_COLOR_ALT}; }
        .alexa-card {
          background-color: ${CONTAINER_COLOR};
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: 0.3s;
        }
        .alexa-card:hover { transform: translateY(-0.25rem); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
      `}</style>

      {/* --- HEADER / NAV (Floating Sidebar-ish) --- */}
      <header style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: CONTAINER_COLOR,
        width: 'max-content',
        borderRadius: '3rem',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 -1px 12px rgba(0,0,0,0.15)',
        zIndex: 100,
        display: 'flex',
        gap: '2rem'
      }}>
        <a href="#home" className="alexa-nav-icon"><Home size={20} /></a>
        <a href="#about" className="alexa-nav-icon"><User size={20} /></a>
        <a href="#skills" className="alexa-nav-icon"><Code2 size={20} /></a>
        <a href="#portfolio" className="alexa-nav-icon"><Briefcase size={20} /></a>
        <a href="#contact" className="alexa-nav-icon"><Mail size={20} /></a>
      </header>

      {/* --- HOME --- */}
      <section id="home" style={{ padding: '5rem 0 2rem', maxWidth: '768px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr 1fr', gap: '3rem', alignItems: 'center', padding: '0 1.5rem' }}>
          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {d.linkedin && <a href={d.linkedin} style={{ color: FIRST_COLOR }}><Linkedin size={20} /></a>}
            {projects[0]?.github && <a href={projects[0].github} style={{ color: FIRST_COLOR }}><Github size={20} /></a>}
          </div>

          {/* Intro Text */}
          <div style={{ gridColumn: 'span 1' }}>
            <h1 style={{ fontSize: '2.25rem', color: TITLE_COLOR, marginBottom: '0.5rem' }}>Hi, I'm {d.name?.split(' ')[0] || 'User'}</h1>
            <h3 style={{ fontSize: '1.25rem', color: TEXT_COLOR, fontWeight: 500, marginBottom: '0.75rem' }}>{d.title || 'Professional'}</h3>
            <p style={{ marginBottom: '2rem', color: TEXT_COLOR }}>{d.bio?.substring(0, 150) || 'Experienced in creating beautiful and functional web applications.'}</p>
            <a href="#contact" className="alexa-btn">Contact Me <Mail size={18} /></a>
          </div>

          {/* Profile Image / Blob */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', fill: FIRST_COLOR }}>
              <path d="M192.1 79.7C186.2 108.6 158.7 131 129.8 144.1C100.9 157.2 70.6 161 41.7 151.2C12.8 141.4 -14.6 118 6.1 89.1C26.8 60.2 46.2 3.9 75.1 0.1C104 -3.7 142.4 46.2 173.8 63.8C205.2 81.4 198 50.8 192.1 79.7Z" />
            </svg>
            <div style={{
              position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              overflow: 'hidden', zIndex: 1
            }}>
              {d.profileImage ? (
                <img src={d.profileImage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ background: FIRST_COLOR_ALT, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'white' }}>
                  {(d.name || 'U')[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <Section title="About Me" subtitle="My introduction" id="about">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
             {d.profileImage ? <img src={d.profileImage} alt="about" style={{ width: '100%' }} /> : <div style={{ height: '300px', background: FIRST_COLOR_ALT }} />}
          </div>
          <div>
            <p style={{ marginBottom: '2.5rem' }}>{d.bio || 'I am a passionate developer with a track record of delivering high-quality work.'}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: TITLE_COLOR }}>{experience.length || '0'}+</span>
                <span style={{ fontSize: '0.75rem' }}>Years <br/> experience</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: TITLE_COLOR }}>{projects.length || '0'}+</span>
                <span style={{ fontSize: '0.75rem' }}>Completed <br/> projects</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: TITLE_COLOR }}>02+</span>
                <span style={{ fontSize: '0.75rem' }}>Companies <br/> worked</span>
              </div>
            </div>
            {d.website && <a href={d.website} className="alexa-btn">Download CV <Briefcase size={18} /></a>}
          </div>
        </div>
      </Section>

      {/* --- SKILLS --- */}
      <Section title="Skills" subtitle="My technical level" id="skills">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="alexa-card">
            <h3 style={{ fontSize: '1.125rem', color: TITLE_COLOR, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 style={{ color: FIRST_COLOR }} /> Technical Skills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 500, color: TITLE_COLOR }}>{s.name}</span>
                    <span style={{ color: TEXT_COLOR }}>{s.level === 'Expert' ? '90%' : s.level === 'Intermediate' ? '65%' : '35%'}</span>
                  </div>
                  <div style={{ height: '5px', backgroundColor: INPUT_COLOR, borderRadius: '0.25rem' }}>
                    <div style={{ height: '100%', width: levelWidth[s.level] || '50%', backgroundColor: FIRST_COLOR, borderRadius: '0.25rem' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="alexa-card" style={{ height: 'max-content' }}>
            <h3 style={{ fontSize: '1.125rem', color: TITLE_COLOR, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal style={{ color: FIRST_COLOR }} /> Tools & Others
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Git', 'Docker', 'VS Code', 'Figma', 'Postman'].map(tool => (
                <span key={tool} style={{ background: INPUT_COLOR, padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.813rem' }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --- QUALIFICATIONS --- */}
      <Section title="Qualification" subtitle="My personal journey" id="qual">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
           <div style={{ color: FIRST_COLOR, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
             <GraduationCap size={20} /> Education
           </div>
           <div style={{ color: TEXT_COLOR, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
             <Briefcase size={20} /> Work
           </div>
        </div>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {education.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr max-content 1fr', gap: '1.5rem' }}>
              {i % 2 === 0 ? (
                <>
                  <div>
                    <h3 style={{ fontSize: '0.938rem', fontWeight: 500, color: TITLE_COLOR }}>{e.degree}</h3>
                    <span style={{ fontSize: '0.813rem', color: TEXT_COLOR }}>{e.institution}</span>
                    <div style={{ fontSize: '0.75rem', color: TEXT_COLOR_LIGHT, marginTop: '0.5rem' }}>{e.from} - {e.to}</div>
                  </div>
                  <div>
                    <span style={{ display: 'block', width: '13px', height: '13px', backgroundColor: FIRST_COLOR, borderRadius: '50%' }} />
                    <span style={{ display: 'block', width: '1px', height: '100%', backgroundColor: FIRST_COLOR, margin: '0 6px' }} />
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div>
                    <span style={{ display: 'block', width: '13px', height: '13px', backgroundColor: FIRST_COLOR, borderRadius: '50%' }} />
                    <span style={{ display: 'block', width: '1px', height: '100%', backgroundColor: FIRST_COLOR, margin: '0 6px' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.938rem', fontWeight: 500, color: TITLE_COLOR }}>{e.degree}</h3>
                    <span style={{ fontSize: '0.813rem', color: TEXT_COLOR }}>{e.institution}</span>
                    <div style={{ fontSize: '0.75rem', color: TEXT_COLOR_LIGHT, marginTop: '0.5rem' }}>{e.from} - {e.to}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* --- PORTFOLIO --- */}
      <Section title="Portfolio" subtitle="Most recent work" id="portfolio">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {projects.map((proj, i) => (
            <div key={i} className="alexa-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
              {proj.image ? <img src={proj.image} alt={proj.name} style={{ width: '100%', borderRadius: '0.5rem' }} /> : <div style={{ height: '150px', background: INPUT_COLOR, borderRadius: '0.5rem' }} />}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: TITLE_COLOR, marginBottom: '0.5rem' }}>{proj.name}</h3>
                <p style={{ fontSize: '0.813rem', color: TEXT_COLOR, marginBottom: '1rem' }}>{proj.description}</p>
                <a href={proj.link || '#'} className="alexa-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Demo <ArrowRight size={16} /></a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --- CONTACT --- */}
      <Section title="Contact Me" subtitle="Get in touch" id="contact">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {d.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone style={{ color: FIRST_COLOR }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', color: TITLE_COLOR }}>Call Me</h3>
                  <span style={{ color: TEXT_COLOR }}>{d.phone}</span>
                </div>
              </div>
            )}
            {d.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ color: FIRST_COLOR }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', color: TITLE_COLOR }}>Email</h3>
                  <span style={{ color: TEXT_COLOR }}>{d.email}</span>
                </div>
              </div>
            )}
            {d.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin style={{ color: FIRST_COLOR }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', color: TITLE_COLOR }}>Location</h3>
                  <span style={{ color: TEXT_COLOR }}>{d.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* --- FOOTER --- */}
      <footer style={{ backgroundColor: FIRST_COLOR, color: '#FFF', padding: '3rem 0', marginTop: '4rem' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '0.25rem' }}>{d.name?.split(' ')[0] || 'User'}</h1>
            <span>{d.title || 'Professional'}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <a href="#services" style={{ color: '#FFF' }}>Services</a>
            <a href="#portfolio" style={{ color: '#FFF' }}>Portfolio</a>
            <a href="#contact" style={{ color: '#FFF' }}>Contactme</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
             {d.linkedin && <a href={d.linkedin} style={{ color: '#FFF' }}><Linkedin size={20} /></a>}
             {projects[0]?.github && <a href={projects[0].github} style={{ color: '#FFF' }}><Github size={20} /></a>}
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '3.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>© {new Date().getFullYear()} {d.name}. All rights reserved</p>
      </footer>
    </div>
  )
}

function Phone(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> }
function MapPin(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> }
function Linkedin(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> }
function ArrowRight(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> }
function Terminal(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg> }
