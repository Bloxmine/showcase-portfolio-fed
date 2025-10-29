import styles from './AboutSection.module.css';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className={`section-inner ${styles.aboutInner}`}>
        <div className={styles.aboutInfo}>
          <h2>About Me</h2>
          <p>Hey, I'm Hein! 24 years old and with a passion for web development. I love creating random projects in my spare time. This website serves as a showcase of my skills.

I've been a student at Fontys ICT & Media Design since 2023.</p>
        </div>
        <div className={styles.aboutMedia}>
          <Image 
            src="/images/me.jpeg" 
            alt="Hein Dijstelbloem" 
            width={120}
            height={120}
            className={styles.profileImage}
          />
          <div className={styles.socialLinks}>
            <a href="https://www.youtube.com/channel/UCZSRodPB-W-BcqSWRrGscPQ" title="YouTube">
              <Image src="/images/icons/youtube.png" alt="YouTube" width={64} height={64} />
            </a>
            <a href="https://www.linkedin.com/in/hein-dijstelbloem-9a868424b/" title="LinkedIn">
              <Image src="/images/icons/linkedin.png" alt="LinkedIn" width={64} height={64} />
            </a>
            <a href="https://github.com/Bloxmine" title="GitHub">
              <Image src="/images/icons/github.png" alt="GitHub" width={64} height={64} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
