import styles from './LandingSection.module.css';

export default function LandingSection() {
  return (
    <section id="landing" className={`section landing ${styles.landing}`}>
      {/* Diagonal flying background text */}
      <div className={styles.diagonalBgText}>
        <div className={styles.diagonalTextLine} style={{ '--delay': '0s' } as React.CSSProperties}>
          <span>DEVELOPER</span>
          <span>CREATIVE</span>
          <span>DESIGNER</span>
          <span>CODER</span>
          <span>DEVELOPER</span>
          <span>CREATIVE</span>
          <span>DESIGNER</span>
          <span>CODER</span>
        </div>
        <div className={styles.diagonalTextLine} style={{ '--delay': '-2s' } as React.CSSProperties}>
          <span>FRONTEND</span>
          <span>FULLSTACK</span>
          <span>JAVASCRIPT</span>
          <span>REACT</span>
          <span>FRONTEND</span>
          <span>FULLSTACK</span>
          <span>JAVASCRIPT</span>
          <span>REACT</span>
        </div>
        <div className={styles.diagonalTextLine} style={{ '--delay': '-4s' } as React.CSSProperties}>
          <span>UI/UX</span>
          <span>PORTFOLIO</span>
          <span>WEBSITE</span>
          <span>INTERACTIVE</span>
          <span>UI/UX</span>
          <span>PORTFOLIO</span>
          <span>WEBSITE</span>
          <span>INTERACTIVE</span>
        </div>
        <div className={styles.diagonalTextLine} style={{ '--delay': '-6s' } as React.CSSProperties}>
          <span>MODERN</span>
          <span>RESPONSIVE</span>
          <span>DYNAMIC</span>
          <span>ANIMATION</span>
          <span>MODERN</span>
          <span>RESPONSIVE</span>
          <span>DYNAMIC</span>
          <span>ANIMATION</span>
        </div>
      </div>
      
      <div className="section-inner">
        <div className={styles.letterBox}>
          <div className={styles.letterImage} style={{ backgroundImage: 'url(/letters/H.png)', height: '120px' }} />
          <div className={styles.letterImage} style={{ backgroundImage: 'url(/letters/E.png)' }} />
          <div className={styles.letterImage} style={{ backgroundImage: 'url(/letters/I.png)', width: '60px', height: '120px' }} />
          <div className={styles.letterImage} style={{ backgroundImage: 'url(/letters/N.png)' }} />
          <div className={styles.letterImage} style={{ backgroundImage: 'url(/letters/D.png)', height: '120px' }} />
        </div>
      </div>
    </section>
  );
}
