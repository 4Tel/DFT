import os
import glob
import markdown
import subprocess
import win32com.client

# find md files and iteration
def iter_md_paths(src_folder):
    md_paths = glob.glob(f'{src_folder}/**/*.md',  recursive=True)
    mdx_paths = glob.glob(f'{src_folder}/**/*.mdx',  recursive=True)
    yield from md_paths
    yield from mdx_paths

# parse metadata from md file
def parse_md_metadata(md_path):
    metadata = {}
    md = markdown.Markdown(extensions=['meta'])
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    md.convert(content)
    metadata.update(md.Meta)
    return metadata

# check file1 is newer than file2
def is_newer(file1, file2):
    if not os.path.exists(file2): return True
    mtime1 = os.path.getmtime(file1)
    mtime2 = os.path.getmtime(file2)
    return mtime1 > mtime2

# replace file extension
def replace_ext(filename, new_ext):
    base = os.path.splitext(filename)[0]
    base = base.replace("docs\\", f"static\\", 1)
    return f"{base}.{new_ext}"

# convert md to ppt using pandoc
pandoc_cmd = [
    "pandoc",
    "--reference-doc=static/format.pptx"
]
def md_to_ppt(md_path, ppt_path=None, slide_level='2'):
    # ppt path
    if ppt_path is None:
        ppt_path = replace_ext(md_path, "pptx")
    additional_args = [
        md_path,
        "--slide-level", slide_level,
        "-o", ppt_path,
    ]
    # save as ppt
    subprocess.run(pandoc_cmd + additional_args, check=True)

# convert ppt to pdf using MS PowerPoint
def ppt_to_pdf(ppt_path, pdf_path=None):
    # pdf path
    if pdf_path is None:
        pdf_path = replace_ext(ppt_path, "pdf")
    ppt_path = os.path.abspath(ppt_path)
    pdf_path = os.path.abspath(pdf_path)
    # save as pdf(32)
    presentation = powerpoint.Presentations.Open(ppt_path, WithWindow=False)
    presentation.SaveAs(pdf_path, FileFormat=32)
    presentation.Close()
    # result

# convert md to pdf using marp-cli
pnpm_path = os.path.expandvars(r"%APPDATA%\npm\pnpm.cmd")
marp_cmd = [
    pnpm_path,
    "marp",
    "--theme", "static/marp.css"
]
def md_to_pdf(md_path, pdf_path=None):
    # pdf path
    if pdf_path is None:
        pdf_path = replace_ext(md_path, "pdf")
    additional_args = [
        md_path,
        "-o", pdf_path,
    ]
    subprocess.run(marp_cmd + additional_args, check=True)

# run PPT
changed = False
powerpoint = win32com.client.Dispatch("PowerPoint.Application")
for file in iter_md_paths('docs'):
    # check metadata
    metadata = parse_md_metadata(file)
    pandoc = metadata.get('pandoc', ['none'])[0].upper()
    marp = metadata.get('marp', ['none'])[0].upper()
    slide_level = metadata.get('slide_level', ['2'])[0]

    # paths
    if marp != 'NONE' != pandoc:
        print(f"Processing: {file}")
    ppt_path = replace_ext(file, "pptx")
    pdf1_path = replace_ext(file, "1.pdf")
    pdf2_path = replace_ext(file, "2.pdf")

    # md to pdf
    if marp == 'TRUE':
        if is_newer(file, pdf1_path):
            changed = True
            print("  - Processing md to pdf")
            md_to_pdf(file,pdf1_path)

    if pandoc != 'TRUE': continue
    # md to ppt
    if is_newer(file, ppt_path):
        changed = True
        print("  - Processing md to ppt")
        md_to_ppt(file, ppt_path, slide_level=slide_level)

    # ppt to pdf
    if is_newer(file, pdf2_path):
        changed = True
        print("  - Processing ppt to pdf")
        ppt_to_pdf(ppt_path, pdf2_path)
powerpoint.Quit()

if changed:
    print("md2pdf.py completed successfully")
    print("exit with code 1 for cancel commit")
    exit(1)