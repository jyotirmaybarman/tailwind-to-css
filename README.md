Convert tailwind css to vanilla css

### Installation
```bash
npm install @jyotirmay/tailwind-to-css
```

### usage
```js
import { convert } from "@jyotirmay/tailwind-to-css";

let html = `
    <div class="text-gray-500 dark:bg-red-500 my-container">
        <p class="inline">Hello world</p>
    </div> 
`;

(async()=>{
    const res = await convert(html)
    console.log(res)

    /**
    Output:
        {
            html: 
            `
                <html>
                <head>
                    <link rel="stylesheet" href="./output.css" />
                </head>
                <body>
                    <div class="VzxbQ9x92_use1WNuDg0y my-container">
                    <p class="AeplxTuJZjGFMK173hyC9">Hello world</p>
                    </div>
                </body>
                </html>
            `,
            css: 
            `
                .VzxbQ9x92_use1WNuDg0y {
                    --tw-text-opacity: 1;
                    color: rgb(107 114 128 / var(--tw-text-opacity));
                }
                :is(.dark .VzxbQ9x92_use1WNuDg0y) {
                    --tw-bg-opacity: 1;
                    background-color: rgb(239 68 68 / var(--tw-bg-opacity));
                }
                .AeplxTuJZjGFMK173hyC9 {
                    display: inline;
                }
            `
        }
     */
})()


```