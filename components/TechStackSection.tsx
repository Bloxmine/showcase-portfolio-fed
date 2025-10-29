import styles from './TechStackSection.module.css';

export default function TechStackSection() {
  return (
    <section id="techstack" className="section techstack">
      <div className="section-inner">
        <h2>Tech Stack</h2>
        <ul className={styles.techList}>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </div>
    </section>
  );
}
