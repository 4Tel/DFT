
const className = 'tex-copy-button';
const defaultText = '📋';
const successText = '✅';
const errorText = '❌';
const timeoutDuration = 2000; // 2 seconds

export function injectLatexCopyButtons() {
  // TeX Blocks
  const blocks = document.querySelectorAll('.katex');

  blocks.forEach((block) => {
    if (block.querySelector(`.${className}`)) return;

    // TeX Source
    const annotation = block.querySelector('annotation');
    if (!annotation) return;
    const source = annotation.textContent || '';

    // Copy Button
    // 
    const htmlBlock = block.querySelector('.katex-html');
    if (!htmlBlock) return;
    const btn = document.createElement('button');
    btn.className = className;
    htmlBlock.appendChild(btn);
    
    // Copy Event
    btn.textContent = defaultText;
    btn.onclick = () => {
      navigator.clipboard.writeText(source)
        .then(() => {
          btn.textContent = successText;
          setTimeout(() => (btn.textContent = defaultText), timeoutDuration);
        })
        .catch((err) => {
          btn.textContent = errorText;
          alert('Copy Failed: ' + err);
        });
    };

  });
}
