import React from "react";
import styles from './Youtube.module.css';

export default function Comment({ id, title = "YouTube video player" }: { id: string; title: string }) {
  return <iframe
    src={`https://www.youtube.com/embed/${id}`}
    className={styles.iframe}
    frameBorder="0"
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen>
  </iframe>;
}
