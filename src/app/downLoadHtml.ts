import { MouseEvent } from "react";


export const downloadHtml = (e: MouseEvent<HTMLButtonElement>, markdownPreview: string) => {
    e.preventDefault();
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Markdown Preview</title>
            </head>
            <body>
                ${markdownPreview}
            </body>
        </html>
    `

    const blob = new Blob([htmlContent], { type: 'text/html'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'markdown-preview.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}