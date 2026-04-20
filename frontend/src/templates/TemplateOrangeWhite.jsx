import React from 'react'

/* ── Palette ── */
const BG      = '#FAFAF8'
const ORANGE  = '#E85C26'
const SALMON  = '#F5D5C8'
const BLACK   = '#1a1a1a'
const GRAY    = '#6b7280'

/* ── Left Sidebar Navigation ── */
function SideNav({ total = 9, active = 1 }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0,
      width: 80, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 12, zIndex: 10,
    }}>
      {/* Curved orange line behind nav */}
      <svg
        style={{ position: 'absolute', left: 0, top: 0, width: 80, height: '100%' }}
        viewBox="0 0 80 600" preserveAspectRatio="none"
      >
        <path
          d="M 55 30 Q 20 150 55 300 Q 85 450 55 570"
          fill="none" stroke={ORANGE} strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const isActive = n === active
        return (
          <div key={n} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: isActive ? ORANGE : 'transparent',
            border: `1.5px solid ${isActive ? ORANGE : BLACK}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600,
            color: isActive ? '#fff' : BLACK,
            position: 'relative', zIndex: 2,
            flexShrink: 0,
          }}>
            {n}
          </div>
        )
      })}
    </div>
  )
}

/* ── Three dots decoration ── */
function ThreeDots({ style = {} }) {
  return (
    <div style={{ display: 'flex', gap: 6, ...style }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: '50%', background: ORANGE,
        }} />
      ))}
    </div>
  )
}

/* ── Decorative blob circle (filled) ── */
function BlobCircle({ size = 180, color = ORANGE, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, position: 'absolute', ...style,
    }} />
  )
}

/* ── Orange arc stroke ── */
function ArcCurve({ style = {}, d, width = 300, height = 300, stroke = ORANGE, strokeWidth = 2.5 }) {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', ...style }}
      width={width} height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

/* ── Section wrapper ── */
function Section({ children, minHeight = 480, style = {}, active = 1, total = 9 }) {
  return (
    <div style={{
      position: 'relative',
      background: BG,
      minHeight,
      overflow: 'hidden',
      borderBottom: `1px solid #ebebeb`,
      ...style,
    }}>
      <SideNav total={total} active={active} />
      <div style={{ marginLeft: 88, padding: '44px 48px 44px 12px', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Section heading ── */
function Heading({ children }) {
  return (
    <h2 style={{
      fontSize: 48, fontWeight: 900, color: BLACK,
      margin: '0 0 28px', lineHeight: 1,
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {children}
    </h2>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function TemplateOrangeWhite({ p = {} }) {
  const {
    details: d = {},
    skills = [],
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    publications = [],
    awards = [],
  } = p

  const name  = d.name  || 'Your Name'
  const title = d.title || 'Interior Designer'
  const bio   = d.bio   || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae tellus risus. Sed fringilla commodo tellus, rutrum lacinia dui scelerisque in. Vestibulum velit velit, condimentum quis ante pretium, bibendum fermentum neque.'

  const totalSections = 9

  return (
    <div
      id="portfolio-render"
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        background: BG,
        color: BLACK,
        minWidth: 820,
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          #portfolio-render { min-width: unset !important; font-size: 15px; }
          #portfolio-render [style*="margin-left: 88"] { margin-left: 12px !important; padding: 16px !important; }
          #portfolio-render [style*="position: absolute"][style*="left: 0"] { display: none !important; }
          #portfolio-render img { max-width: 100% !important; height: auto !important; display: block; }
          #portfolio-render [style*="display: flex"] { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
          #portfolio-render [style*="gridTemplateColumns"], #portfolio-render [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          #portfolio-render h1, #portfolio-render h2 { font-size: 1.6em !important; }
        }
      `}</style>

      {/* ══ 1. COVER ══ */}
      <div style={{
        position: 'relative',
        background: BG,
        minHeight: 520,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #ebebeb',
      }}>
        {/* Top-left salmon half-circle */}
        <BlobCircle size={260} color={SALMON} style={{ top: -120, left: -100, opacity: 0.85 }} />
        {/* Top-center orange arc coming down */}
        <ArcCurve
          d="M 150 -60 Q 180 100 140 260 Q 100 380 140 500"
          width={300} height={520}
          style={{ top: 0, left: '35%' }}
        />
        {/* Bottom-right large orange circle */}
        <BlobCircle size={220} color={ORANGE} style={{ bottom: -80, right: -60 }} />
        {/* Bottom-right white cut-out to make it look like the right arc */}
        <ArcCurve
          d="M 60 0 Q -20 120 60 240"
          width={140} height={260}
          style={{ bottom: 60, right: 80 }}
          stroke="#fff"
          strokeWidth={3}
        />

        {/* Center content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 100, fontWeight: 900, color: BLACK,
            letterSpacing: 8, margin: 0, lineHeight: 1,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          }}>
            PORTFOLIO
          </h1>
          <div style={{
            fontSize: 36, fontWeight: 400, color: BLACK,
            letterSpacing: 4, marginTop: 8,
          }}>
            {name}
          </div>
          <div style={{
            fontSize: 14, letterSpacing: 12, color: BLACK, opacity: 0.6,
            marginTop: 40,
          }}>
            2 0 2 5
          </div>
        </div>

        {/* Three dots bottom-left */}
        <ThreeDots style={{ position: 'absolute', bottom: 28, left: 28 }} />
      </div>

      {/* ══ 2. HELLO / ABOUT ══ */}
      <Section active={1} total={totalSections}>
        {/* Decorative arc top-right */}
        <ArcCurve
          d="M 0 30 Q 80 -30 160 30"
          width={180} height={80}
          style={{ top: 0, right: 60, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={40}
        />
        {/* Orange arc bottom-left area */}
        <ArcCurve
          d="M 80 0 Q -40 160 80 320"
          width={160} height={340}
          style={{ bottom: -60, left: 88 }}
        />
        {/* Orange blob bottom-right */}
        <BlobCircle size={200} color={ORANGE} style={{ bottom: -70, right: -50 }} />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: text */}
          <div style={{ flex: 1, maxWidth: 520 }}>
            <h1 style={{
              fontSize: 88, fontWeight: 900, color: BLACK,
              margin: '0 0 8px', lineHeight: 1,
              fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            }}>
              Hello,
            </h1>
            <div style={{ fontSize: 28, fontWeight: 800, color: BLACK, marginBottom: 4 }}>
              I'm {name}
            </div>
            <div style={{ fontSize: 16, fontStyle: 'italic', color: GRAY, marginBottom: 24 }}>
              {title}
            </div>
            <p style={{ fontSize: 15, color: BLACK, opacity: 0.75, lineHeight: 1.8, maxWidth: 460 }}>
              {bio}
            </p>
            {(d.email || d.phone || d.location) && (
              <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                {d.email    && <span style={{ fontSize: 13, color: GRAY }}>✉ {d.email}</span>}
                {d.phone    && <span style={{ fontSize: 13, color: GRAY }}>📞 {d.phone}</span>}
                {d.location && <span style={{ fontSize: 13, color: GRAY }}>📍 {d.location}</span>}
              </div>
            )}
          </div>

          {/* Right: photo placeholder */}
          <div style={{
            width: 220, height: 260, borderRadius: '50%',
            background: `linear-gradient(135deg, ${SALMON}, ${ORANGE}55)`,
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, fontWeight: 900, color: ORANGE, userSelect: 'none',
            fontFamily: 'Georgia, serif',
            overflow: 'hidden',
          }}>
            {d.profileImage ? <img src={d.profileImage} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : name[0]}
          </div>
        </div>
      </Section>

      {/* ══ 3. EDUCATION ══ */}
      <Section active={2} total={totalSections}>
        {/* Three dots top-right */}
        <ThreeDots style={{ position: 'absolute', top: 28, right: 36, zIndex: 2 }} />
        {/* Salmon arc top-right */}
        <ArcCurve
          d="M 0 80 Q 100 -20 200 80"
          width={220} height={110}
          style={{ top: -10, right: 140, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={50}
        />
        {/* Pink arc bottom-right */}
        <ArcCurve
          d="M 0 0 Q 140 80 0 180"
          width={160} height={200}
          style={{ bottom: 20, right: 0, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={50}
        />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: Education entries */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <Heading>Education</Heading>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BLACK, marginBottom: 2 }}>
                  {edu.from && edu.to ? `${edu.from}–${edu.to}` : (edu.from || edu.to || '')}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: BLACK, marginBottom: 6 }}>
                  {edu.institution}
                </div>
                <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.grade ? ` — ${edu.grade}` : ''}
                </p>
              </div>
            ))}
          </div>

          {/* Right: decorative image boxes */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              width: '100%', height: 160,
              background: `linear-gradient(135deg, ${SALMON}, #e8c4b2)`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Education Image
            </div>
            <div style={{
              width: '100%', height: 200,
              background: `linear-gradient(135deg, #e0d4c8, ${SALMON})`,
              borderRadius: 8, transform: 'rotate(-2deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              University Photo
            </div>
          </div>
        </div>
      </Section>

      {/* ══ 4. EXPERIENCE ══ */}
      <Section active={3} total={totalSections}>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: Experience */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <Heading>Experience</Heading>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: BLACK, marginBottom: 4 }}>
                  {exp.company}
                </div>
                <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, fontStyle: 'italic' }}>
                  {exp.role && <><b style={{ color: BLACK }}>{exp.role}</b><br/></>}
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: photo grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{
              gridColumn: '1 / -1', height: 160,
              background: `linear-gradient(135deg, #d4c5b8, ${SALMON})`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>Work Photo 1</div>
            <div style={{
              height: 120, background: `linear-gradient(135deg, ${SALMON}, #c8b5a5)`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>Photo 2</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                flex: 1, minHeight: 55, background: `linear-gradient(135deg, #e8d5c8, ${ORANGE}30)`,
                borderRadius: 8,
              }} />
              <div style={{
                flex: 1, minHeight: 55, background: `linear-gradient(135deg, ${ORANGE}20, ${SALMON})`,
                borderRadius: 8,
              }} />
            </div>
          </div>
        </div>

        {/* Orange arc bottom-right */}
        <ArcCurve
          d="M 0 80 Q 120 0 180 80"
          width={200} height={100}
          style={{ bottom: 0, right: 0 }}
        />
      </Section>

      {/* ══ DYNAMIC PROJECTS ══ */}
      {projects.map((proj, idx) => (
        <Section key={idx} active={4 + idx} total={totalSections}>
          {/* Salmon arc top-right */}
          <ArcCurve
            d="M 0 60 Q 100 -20 200 60"
            width={220} height={100}
            style={{ top: -10, right: 40 }}
            stroke={SALMON} strokeWidth={50}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontSize: 56, fontWeight: 900, color: BLACK,
              margin: '0 0 28px', lineHeight: 1,
            }}>
              {proj.name}
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{
                flex: 1.2, height: 280,
                background: `linear-gradient(160deg, #d4c5b8, ${SALMON})`,
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: GRAY, fontStyle: 'italic', overflow: 'hidden',
              }}>
                {proj.image ? <img src={proj.image} alt={proj.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : 'Project Image'}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 15, color: BLACK, opacity: 0.8, lineHeight: 1.8 }}>
                  {proj.description}
                </p>
                {proj.tech && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 700 }}>{proj.tech}</div>}
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* ══ 10. SKILLS (if any) ══ */}
      {skills.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Skills</Heading>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(skills.length, 4)}, 1fr)`,
            gap: 24, marginTop: 8,
          }}>
            {skills.map((sk, i) => (
              <div key={i}>
                <div style={{ fontSize: 15, fontWeight: 700, color: BLACK, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>{sk.image && <img src={sk.image} alt={sk.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{sk.name}</div>
                <div style={{ fontSize: 12, color: GRAY, marginBottom: 8 }}>{sk.level}</div>
                <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2 }}>
                  <div style={{
                    height: '100%',
                    width: { Beginner: '35%', Intermediate: '65%', Expert: '92%' }[sk.level] || '60%',
                    background: ORANGE, borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ CERTIFICATIONS ══ */}
      {certifications.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Certifications</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 12, color: ORANGE, marginTop: 4, display: 'block' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ PUBLICATIONS ══ */}
      {publications.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Publications</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{pub.title}</div>
                  {pub.publisher && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 12, color: ORANGE, marginTop: 4, display: 'block' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ AWARDS ══ */}
      {awards.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Awards</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {awards.map((award, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{award.title}</div>
                  {award.organization && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{award.organization}</div>}
                  {award.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{award.date}</div>}
                  {award.description && <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 6 }}>{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ CONTACT / THANK YOU ══ */}
      <div style={{
        position: 'relative',
        background: BG,
        minHeight: 480,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Three dots top-right */}
        <ThreeDots style={{ position: 'absolute', top: 28, right: 36 }} />
        {/* Salmon arc bottom-right */}
        <ArcCurve
          d="M 0 0 Q 160 100 0 220"
          width={180} height={240}
          style={{ bottom: 20, right: 0 }}
          stroke={SALMON} strokeWidth={60}
        />

        {/* Oval image frame (left) */}
        <div style={{
          width: 240, height: 320, borderRadius: '50%',
          border: `3px solid ${ORANGE}`,
          background: `linear-gradient(135deg, ${SALMON}, #d4b8a8)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, fontWeight: 900, color: ORANGE,
          fontFamily: 'Georgia, serif', userSelect: 'none',
          flexShrink: 0, marginRight: 80,
          position: 'relative', zIndex: 2,
        }}>
          {name[0]}
        </div>

        {/* Right: Thank you + Contact */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 80, fontWeight: 900, fontStyle: 'italic',
            color: BLACK, margin: '0 0 16px', lineHeight: 1.1,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            Thank<br />you
          </h1>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: BLACK, marginBottom: 20 }}>
            Contact Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {d.phone && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Phone :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.phone}</span>
              </div>
            )}
            {d.location && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Address :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.location}</span>
              </div>
            )}
            {(d.email || d.website) && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Email :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.email || d.website}</span>
              </div>
            )}
            {d.linkedin && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>LinkedIn :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
