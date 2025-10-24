import ChromaticAberration from '@/components/ChromaticAberration'
import ProjectsSection from '@/components/ProjectsSection'

export default function Home() {
  return (
    <>
      <ChromaticAberration />
      <main id="main-content" className="snap-y snap-mandatory">
        {/* Landing Section */}
        <section id="landing" className="h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border relative">
          <div className="torn-clip bg-section-bg shadow-lg p-20 w-full max-w-[900px] mx-auto flex flex-col items-center">
            <div className="letter-box">
              <div className="letter-image h-[120px]" style={{ backgroundImage: "url('/letters/H.png')" }} />
              <div className="letter-image" style={{ backgroundImage: "url('/letters/E.png')" }} />
              <div className="letter-image w-[60px] h-[120px]" style={{ backgroundImage: "url('/letters/I.png')" }} />
              <div className="letter-image" style={{ backgroundImage: "url('/letters/N.png')" }} />
              <div className="letter-image h-[120px]" style={{ backgroundImage: "url('/letters/D.png')" }} />
            </div>
          </div>
          <div className="scroll-indicator">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
          <div className="torn-clip bg-section-bg shadow-lg p-12 w-full max-w-[900px] mx-auto grid grid-cols-2 gap-8 items-stretch text-left">
            <div className="bg-secondary-bg rounded-2xl p-8 flex flex-col justify-center">
              <h2 className="text-4xl mb-4 text-white">About Me</h2>
              <p className="text-lg text-muted">Write a short bio about yourself here.</p>
            </div>
            <div className="bg-secondary-bg rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <img 
                src="https://via.placeholder.com/120" 
                alt="Your portrait" 
                className="w-[120px] h-[120px] rounded-full object-cover mb-5 border-4 border-accent"
              />
              <div className="flex gap-5 justify-center mt-4">
                <a href="#" title="Twitter" target="_blank" rel="noopener" className="text-accent text-2xl hover:text-white transition-colors">
                  <span aria-hidden="true">🐦</span>
                </a>
                <a href="#" title="LinkedIn" target="_blank" rel="noopener" className="text-accent text-2xl hover:text-white transition-colors">
                  <span aria-hidden="true">💼</span>
                </a>
                <a href="#" title="GitHub" target="_blank" rel="noopener" className="text-accent text-2xl hover:text-white transition-colors">
                  <span aria-hidden="true">🐙</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Tech Stack Section */}
        <section id="techstack" className="h-screen py-20 flex flex-col items-center justify-center snap-start bg-primary-bg box-border">
          <div className="torn-clip bg-section-bg shadow-lg p-12 w-full max-w-[900px] mx-auto flex flex-col items-center">
            <h2 className="text-4xl mb-6 text-text-light">Tech Stack</h2>
            <ul className="flex flex-wrap gap-5 justify-center list-none p-0 m-0">
              <li className="bg-secondary-bg text-accent py-3 px-6 rounded-md text-lg font-bold tracking-wider">HTML</li>
              <li className="bg-secondary-bg text-accent py-3 px-6 rounded-md text-lg font-bold tracking-wider">CSS</li>
              <li className="bg-secondary-bg text-accent py-3 px-6 rounded-md text-lg font-bold tracking-wider">JavaScript</li>
              <li className="bg-secondary-bg text-accent py-3 px-6 rounded-md text-lg font-bold tracking-wider">React</li>
              <li className="bg-secondary-bg text-accent py-3 px-6 rounded-md text-lg font-bold tracking-wider">Node.js</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#111] text-muted py-8 text-center text-base tracking-wider">
          <div className="w-full max-w-[900px] mx-auto">
            <p>&copy; 2025 Your Name. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
