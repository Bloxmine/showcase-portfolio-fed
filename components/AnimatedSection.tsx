'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedSection.module.css';

export default function AnimatedSection() {
  return (
    <section id="animated" className={`section animated tall-section ${styles.tallSection}`}>
      <div className={styles.textFlyingContainer}>
        <div className={styles.textFlyingBy}>
          <span className={styles.flyingText} data-speed="1">Web Developer</span>
          <span className={styles.flyingText} data-speed="0.8">Creative Coder</span>
          <span className={styles.flyingText} data-speed="1.2">Tech Enthusiast</span>
          <span className={styles.flyingText} data-speed="0.9">Problem Solver</span>
          <span className={styles.flyingText} data-speed="1.1">Graphic Designer</span>
          <span className={styles.flyingText} data-speed="0.7">Student at FHICT</span>
          <span className={styles.flyingText} data-speed="1.3">Frontend Developer</span>
          <span className={styles.flyingText} data-speed="0.85">Photographer</span>
          <span className={styles.flyingText} data-speed="1.15">All round fun guy</span>
        </div>
      </div>
    </section>
  );
}
