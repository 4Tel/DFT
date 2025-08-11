import Link from '@docusaurus/Link';
import style from './styles.module.css';

type links = {
  permalink: string;
  ext: string;
}

export default function Download({ permalink, ext }: links) {
  return (
    <Link
      className={`button button--primary button--sm ${style.btn}`}
      to={`${permalink}.${ext}`}
      target="_blank"
    >
      {ext}
    </Link>
  );
}
