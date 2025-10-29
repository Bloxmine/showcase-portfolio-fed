import styles from './ContactSection.module.css';
import Image from 'next/image';

export default function ContactSection() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <h2>Contact</h2>
        <p>If you'd like to get in touch, feel free to reach out!</p>
        <a 
          href="mailto:heindijstelbloem@hotmail.com" 
          title="Email me:" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <Image src="/images/icons/mail.png" alt="Email" width={64} height={64} />
        </a>
      </div>
    </section>
  );
}
