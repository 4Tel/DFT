import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";


const scriptURL = "https://giscus.app/client.js";
const attributes = {
  'data-repo': "4Tel/docu-rtd-template",
  'data-repo-id': "R_kgDOPMK-aA",
  'data-category': "General",
  'data-category-id': "DIC_kwDOPMK-aM4Cs7Vt",
  'data-mapping': "pathname",
  'data-strict': "1",
  'data-reactions-enabled': "1",
  'data-emit-metadata': "0",
  'data-input-position': "top",
  'data-lang': "ko",
  label: "comment",
  'crossorigin': "anonymous",
}

export default function Comment() {
  const containerRef = useRef(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const script = document.createElement("script");
    // create script element
    script.src = scriptURL;
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
    script.setAttribute("data-theme", colorMode === "dark" ? "dark_high_contrast" : "github-light");
    script.async = true;

    containerRef.current.appendChild(script);
  }, [colorMode]);

  return <div className="comment" ref={containerRef} />;
}