import React, { type ReactNode } from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';

import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { DocFrontMatter } from '@docusaurus/plugin-content-docs';
import style from './styles.module.css';
import Download from './download';

type Props = WrapperProps<typeof ContentType>;


export default function ContentWrapper(props: Props): ReactNode {
  const { metadata } = useDoc();
  const frontMatter: DocFrontMatter = metadata.frontMatter;
  const permalink = metadata.permalink;

  return (
    <>
      <div className={style.btnWrapper}>
        {frontMatter.marp &&
          <Download permalink={permalink} ext="1.pdf" />
        }
        {
          frontMatter.pandoc &&
          <Download permalink={permalink} ext="2.pdf" />
        }
        {
          frontMatter.pandoc &&
          <Download permalink={permalink} ext="pptx" />
        }
      </div>
      <Content {...props} />
    </>
  );
}
