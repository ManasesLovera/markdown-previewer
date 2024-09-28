// import Image from "next/image";
"use client";
import { useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify';
import { downloadHtml } from './downLoadHtml';
import './page.css';

export default function Home() : React.ReactElement {

  const darkTheme = {
    backgroundColor: '#222',
    textColor: 'white',
    containerBackgroundColor: '#444'
  }
  const lightTheme = {
    backgroundColor: '#ddd',
    textColor: 'black',
    containerBackgroundColor: '#eee'
  }

  const [fontSize, setFontSize] = useState<number>(14);
  const [theme, setTheme] = useState(lightTheme);
  const [markdownText, setMarkdownText] = useState<string>('');

  const changeTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value: string = e.currentTarget.textContent ?? 'Light';
    const currentTheme = value.split(' ')[1];

    if (currentTheme === 'Dark') {
      setTheme(darkTheme);
      e.currentTarget.textContent = "Theme: Light";
    } else if (currentTheme === 'Light') {
      setTheme(lightTheme);
      e.currentTarget.textContent = "Theme: Dark";
    }
  }

  const parseMarkdown = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value ?? '';
    const parsedText = await marked(text);
    setMarkdownText(DOMPurify.sanitize(parsedText));
  }

  return (
    <div style={{backgroundColor: theme.backgroundColor}}>
      <h1 style={{color:theme.textColor}}>Markdown Previewer</h1>
      <div className="customize">
        <button onClick={changeTheme}>Theme: Dark</button>
        <label style={{color:theme.textColor}}>
          Font size: 
          <input 
            type="number" 
            value={fontSize} 
            onChange={(e) => setFontSize(parseInt(e.target.value))}/>
        </label>
      </div>
      <div className="container">
        <div className="markdown">
          <textarea 
            onChange={parseMarkdown} 
            style={{fontSize, color: theme.textColor, backgroundColor:theme.containerBackgroundColor}}>
          </textarea>
        </div>
        <div className="preview" style={{fontSize, color: theme.textColor, backgroundColor:theme.containerBackgroundColor}}
          // Previously sanitized the html so it's saved
          dangerouslySetInnerHTML={{ __html: markdownText }}>
            
        </div>
        <button onClick={(e) => downloadHtml(e, markdownText)} className="downloadHtmlBtn">
        Download as HTML
      </button>
      </div>
      
    </div>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
