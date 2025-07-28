import React, { useEffect } from 'react';
import { injectLatexCopyButtons } from '@site/src/utils/tex_copy';

export default function Root({ children }) {

  useEffect(() => {
    injectLatexCopyButtons();
  }, []);

  return <>{children}</>;
}
