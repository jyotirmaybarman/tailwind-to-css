import { nanoid } from "nanoid";
import { isValidTailwindClass } from "@jyotirmay/tailwind-class-validator";
import { load } from "cheerio";

export const convert = async (
  inputHtml: string,
  classNamePrefix: string = ""
) => {
  const $ = load(inputHtml);
  $("head").append('<link rel="stylesheet" href="./output.css">');

  let css = ``;
  let html = ``;

  let body = $("body *");
  for (let i = 0; i < body.length; i++) {
    const classes = $(body[i]).attr("class");

    if (classes) {
      const classList = classes.split(" ");
      let tailwindClasses = "";
      let customClasses = "";

      for (let j = 0; j < classList.length; j++) {
        let current = classList[j],
          valid;
        let special = current.includes(":");
        if (special) {
          let parts = current.split(":");
          valid = await isValidTailwindClass(parts[parts.length - 1]);
        } else {
          valid = await isValidTailwindClass(current);
        }
        if (valid.success) tailwindClasses += current + " ";
        else if (!special) customClasses += current + " ";
      }

      const newClassName = classNamePrefix + nanoid();

      let generated = await isValidTailwindClass(tailwindClasses, {
        outputClass: newClassName,
        plugins: {
          typography: true,
        },
      });
      if (generated.success) css += generated.css + "\n";
      $(body[i]).attr("class", newClassName + " " + customClasses);
    }
  }
  
  html = $.html();

  return {
    html,
    css,
  };
};
