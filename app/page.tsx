'use client'

import MouseEffects from '../components/MouseEffects'
import ScrollAnimations from '../components/ScrollAnimations'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <MouseEffects>
      <ScrollAnimations />
      
      {/* Landing Section */}
      <section id="landing" className="section landing h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border relative overflow-hidden">
        {/* Diagonal flying background text */}
        <div className="diagonal-bg-text absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="diagonal-text-line absolute whitespace-nowrap font-flying-text text-[4rem] font-black text-gray-500/[0.08] rotate-[-15deg] will-change-transform" style={{ top: '-10%', left: '-100%', animationDuration: '25s', animationDelay: '0s' }}>
            <span className="inline-block mr-12">DEVELOPER</span>
            <span className="inline-block mr-12">CREATIVE</span>
            <span className="inline-block mr-12">DESIGNER</span>
            <span className="inline-block mr-12">CODER</span>
            <span className="inline-block mr-12">DEVELOPER</span>
            <span className="inline-block mr-12">CREATIVE</span>
            <span className="inline-block mr-12">DESIGNER</span>
            <span className="inline-block mr-12">CODER</span>
          </div>
          <div className="diagonal-text-line absolute whitespace-nowrap font-flying-text text-[4rem] font-black text-gray-500/[0.08] rotate-[-15deg] will-change-transform" style={{ top: '20%', left: '-100%', animationDuration: '22s', animationDelay: '-2s' }}>
            <span className="inline-block mr-12">FRONTEND</span>
            <span className="inline-block mr-12">FULLSTACK</span>
            <span className="inline-block mr-12">JAVASCRIPT</span>
            <span className="inline-block mr-12">REACT</span>
            <span className="inline-block mr-12">FRONTEND</span>
            <span className="inline-block mr-12">FULLSTACK</span>
            <span className="inline-block mr-12">JAVASCRIPT</span>
            <span className="inline-block mr-12">REACT</span>
          </div>
          <div className="diagonal-text-line absolute whitespace-nowrap font-flying-text text-[4rem] font-black text-gray-500/[0.08] rotate-[-15deg] will-change-transform" style={{ top: '50%', left: '-100%', animationDuration: '28s', animationDelay: '-4s' }}>
            <span className="inline-block mr-12">UI/UX</span>
            <span className="inline-block mr-12">PORTFOLIO</span>
            <span className="inline-block mr-12">WEBSITE</span>
            <span className="inline-block mr-12">INTERACTIVE</span>
            <span className="inline-block mr-12">UI/UX</span>
            <span className="inline-block mr-12">PORTFOLIO</span>
            <span className="inline-block mr-12">WEBSITE</span>
            <span className="inline-block mr-12">INTERACTIVE</span>
          </div>
          <div className="diagonal-text-line absolute whitespace-nowrap font-flying-text text-[4rem] font-black text-gray-500/[0.08] rotate-[-15deg] will-change-transform" style={{ top: '80%', left: '-100%', animationDuration: '24s', animationDelay: '-6s' }}>
            <span className="inline-block mr-12">MODERN</span>
            <span className="inline-block mr-12">RESPONSIVE</span>
            <span className="inline-block mr-12">DYNAMIC</span>
            <span className="inline-block mr-12">ANIMATION</span>
            <span className="inline-block mr-12">MODERN</span>
            <span className="inline-block mr-12">RESPONSIVE</span>
            <span className="inline-block mr-12">DYNAMIC</span>
            <span className="inline-block mr-12">ANIMATION</span>
          </div>
        </div>

        <div className="section-inner relative bg-section-bg shadow-[0_4px_32px_rgba(0,0,0,0.13)] p-20 w-full max-w-[900px] mx-auto flex flex-col items-center transition-transform duration-200 z-[3] torn-edges">
          <div className="letterBox flex gap-2.5 items-end">
            <div className="letterImage w-[100px] h-[120px]" style={{ backgroundImage: 'url(/letters/H.png)' }}></div>
            <div className="letterImage w-[100px] h-[100px]" style={{ backgroundImage: 'url(/letters/E.png)' }}></div>
            <div className="letterImage w-[60px] h-[120px]" style={{ backgroundImage: 'url(/letters/I.png)' }}></div>
            <div className="letterImage w-[100px] h-[100px]" style={{ backgroundImage: 'url(/letters/N.png)' }}></div>
            <div className="letterImage w-[100px] h-[120px]" style={{ backgroundImage: 'url(/letters/D.png)' }}></div>
          </div>
        </div>

        <div className="scroll-indicator">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* Animated Section */}
      <section id="animated" className="section animated tall-section min-h-[200vh] md:min-h-[150vh] relative overflow-hidden snap-start bg-section-bg">
        <div className="text-flying-container absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="text-flying-by relative w-full h-full">
            <span className="flying-text text-text" data-speed="1">Web Developer</span>
            <span className="flying-text text-text" data-speed="0.8" style={{ transform: 'translateX(100%)' }}>Creative Coder</span>
            <span className="flying-text text-text" data-speed="1.2">Tech Enthusiast</span>
            <span className="flying-text text-text" data-speed="0.9" style={{ transform: 'translateX(100%)' }}>Problem Solver</span>
            <span className="flying-text text-text" data-speed="1.1">Graphic Designer</span>
            <span className="flying-text text-text" data-speed="0.7" style={{ transform: 'translateX(100%)' }}>Student at FHICT</span>
            <span className="flying-text text-text" data-speed="1.3">Frontend Developer</span>
            <span className="flying-text text-text" data-speed="0.85" style={{ transform: 'translateX(100%)' }}>Photographer</span>
            <span className="flying-text text-text" data-speed="1.15">All round fun guy</span>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section about h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
        <div className="section-inner relative bg-section-bg shadow-[0_4px_32px_rgba(0,0,0,0.13)] p-12 w-full max-w-[900px] mx-auto transition-transform duration-200 z-[3] torn-edges grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
          <div className="about-info bg-secondary-bg p-8 flex flex-col justify-center">
            <h2 className="text-[2.2rem] mb-4 text-section-text">About Me</h2>
            <p className="text-lg text-muted">
              Hey, I&apos;m Hein! 24 years old and with a passion for web development. I love creating random projects in my spare time. This website serves as a showcase of my skills.
              <br /><br />
              I&apos;ve been a student at Fontys ICT & Media Design since 2023.
            </p>
          </div>
          <div className="about-media bg-secondary-bg p-8 flex flex-col items-center justify-center text-center">
            <img src="/images/me.jpeg" alt="Hein Dijstelbloem" className="w-[120px] h-[120px] object-cover mb-5 border-[3px] border-accent" />
            <div className="social-links flex gap-5 justify-center mt-4">
              <a href="https://www.youtube.com/channel/UCZSRodPB-W-BcqSWRrGscPQ" title="YouTube" target="_blank" rel="noopener">
                <img src="/images/icons/youtube.png" alt="YouTube" className="w-16 h-16 border-none transition-transform hover:rotate-[5deg] hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com/in/hein-dijstelbloem-9a868424b/" title="LinkedIn" target="_blank" rel="noopener">
                <img src="/images/icons/linkedin.png" alt="LinkedIn" className="w-16 h-16 border-none transition-transform hover:rotate-[5deg] hover:scale-110" />
              </a>
              <a href="https://github.com/Bloxmine" title="GitHub" target="_blank" rel="noopener">
                <img src="/images/icons/github.png" alt="GitHub" className="w-16 h-16 border-none transition-transform hover:rotate-[5deg] hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects full-width h-screen py-16 px-8 flex flex-col items-center justify-start snap-start bg-section-bg box-border">
        <Projects />
      </section>

      {/* Tech Stack Section */}
      <section id="techstack" className="section techstack h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
        <div className="section-inner relative bg-section-bg shadow-[0_4px_32px_rgba(0,0,0,0.13)] p-12 w-full max-w-[900px] mx-auto flex flex-col items-center transition-transform duration-200 z-[3] torn-edges">
          <h2 className="text-section-text text-4xl mb-6">Tech Stack</h2>
          <ul className="tech-list flex flex-wrap gap-5 justify-center list-none p-0 m-0">
            <li className="bg-secondary-bg text-accent px-6 py-3 text-lg font-bold tracking-wide">HTML</li>
            <li className="bg-secondary-bg text-accent px-6 py-3 text-lg font-bold tracking-wide">CSS</li>
            <li className="bg-secondary-bg text-accent px-6 py-3 text-lg font-bold tracking-wide">JavaScript</li>
            <li className="bg-secondary-bg text-accent px-6 py-3 text-lg font-bold tracking-wide">React</li>
            <li className="bg-secondary-bg text-accent px-6 py-3 text-lg font-bold tracking-wide">Node.js</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
        <div className="section-inner relative bg-section-bg shadow-[0_4px_32px_rgba(0,0,0,0.13)] p-12 w-full max-w-[900px] mx-auto flex flex-col items-center transition-transform duration-200 z-[3] torn-edges">
          <h2 className="text-section-text text-4xl mb-6">Contact</h2>
          <p className="text-lg text-muted mb-4">If you&apos;d like to get in touch, feel free to reach out!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-[#111] text-muted py-8 text-center text-base tracking-wide">
        <div className="section-inner bg-transparent shadow-none">
          <p>&copy; 2025 heind_</p>
        </div>
      </footer>

      <style jsx global>{`
        .diagonal-text-line {
          animation: flyDiagonal 25s linear infinite;
        }

        @media (max-width: 768px) {
          .diagonal-text-line {
            font-size: 2.5rem;
          }
        }

        .tall-section {
          clip-path: polygon(
            0% 0%, 2% 0.2%, 4% 0%, 6% 0.3%, 8% 0.1%, 10% 0.2%, 12% 0%, 14% 0.3%, 16% 0.1%, 18% 0.2%, 20% 0%, 22% 0.3%, 24% 0.1%, 26% 0.2%, 28% 0%, 30% 0.3%, 32% 0.1%, 34% 0.2%, 36% 0%, 38% 0.3%, 40% 0.1%, 42% 0.2%, 44% 0%, 46% 0.3%, 48% 0.1%, 50% 0.2%, 52% 0%, 54% 0.3%, 56% 0.1%, 58% 0.2%, 60% 0%, 62% 0.3%, 64% 0.1%, 66% 0.2%, 68% 0%, 70% 0.3%, 72% 0.1%, 74% 0.2%, 76% 0%, 78% 0.3%, 80% 0.1%, 82% 0.2%, 84% 0%, 86% 0.3%, 88% 0.1%, 90% 0.2%, 92% 0%, 94% 0.3%, 96% 0.1%, 98% 0.2%, 100% 0%,
            100% 100%,
            98% 100%, 96% 99.8%, 94% 100%, 92% 99.7%, 90% 100%, 88% 99.9%, 86% 100%, 84% 99.7%, 82% 100%, 80% 99.8%, 78% 100%, 76% 99.7%, 74% 100%, 72% 99.9%, 70% 100%, 68% 99.7%, 66% 100%, 64% 99.8%, 62% 100%, 60% 99.7%, 58% 100%, 56% 99.9%, 54% 100%, 52% 99.7%, 50% 100%, 48% 99.8%, 46% 100%, 44% 99.7%, 42% 100%, 40% 99.9%, 38% 100%, 36% 99.7%, 34% 100%, 32% 99.8%, 30% 100%, 28% 99.7%, 26% 100%, 24% 99.9%, 22% 100%, 20% 99.7%, 18% 100%, 16% 99.8%, 14% 100%, 12% 99.7%, 10% 100%, 8% 99.9%, 6% 100%, 4% 99.8%, 2% 100%, 0% 100%,
            0% 0%
          );
        }

        .full-width {
          clip-path: polygon(
            0% 0%, 2% 0.2%, 4% 0%, 6% 0.3%, 8% 0.1%, 10% 0.2%, 12% 0%, 14% 0.3%, 16% 0.1%, 18% 0.2%, 20% 0%, 22% 0.3%, 24% 0.1%, 26% 0.2%, 28% 0%, 30% 0.3%, 32% 0.1%, 34% 0.2%, 36% 0%, 38% 0.3%, 40% 0.1%, 42% 0.2%, 44% 0%, 46% 0.3%, 48% 0.1%, 50% 0.2%, 52% 0%, 54% 0.3%, 56% 0.1%, 58% 0.2%, 60% 0%, 62% 0.3%, 64% 0.1%, 66% 0.2%, 68% 0%, 70% 0.3%, 72% 0.1%, 74% 0.2%, 76% 0%, 78% 0.3%, 80% 0.1%, 82% 0.2%, 84% 0%, 86% 0.3%, 88% 0.1%, 90% 0.2%, 92% 0%, 94% 0.3%, 96% 0.1%, 98% 0.2%, 100% 0%,
            100% 0%, 100% 100%,
            100% 100%, 98% 99.8%, 96% 100%, 94% 99.7%, 92% 100%, 90% 99.9%, 88% 100%, 86% 99.7%, 84% 100%, 82% 99.8%, 80% 100%, 78% 99.7%, 76% 100%, 74% 99.9%, 72% 100%, 70% 99.7%, 68% 100%, 66% 99.8%, 64% 100%, 62% 99.7%, 60% 100%, 58% 99.9%, 56% 100%, 54% 99.7%, 52% 100%, 50% 99.8%, 48% 100%, 46% 99.7%, 44% 100%, 42% 99.9%, 40% 100%, 38% 99.7%, 36% 100%, 34% 99.8%, 32% 100%, 30% 99.7%, 28% 100%, 26% 99.9%, 24% 100%, 22% 99.7%, 20% 100%, 18% 99.8%, 16% 100%, 14% 99.7%, 12% 100%, 10% 99.9%, 8% 100%, 6% 99.8%, 4% 100%, 2% 99.7%, 0% 100%,
            0% 100%, 0% 0%
          );
        }
      `}</style>
    </MouseEffects>
  )
}
