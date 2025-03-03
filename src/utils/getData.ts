import { OPS, getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import { TextItem } from "pdfjs-dist/types/src/display/api";

export const getData = async (file: File) => {
  const document = await getDocument(await file.arrayBuffer()).promise;

  const pages = [];

  for (let i = 1; i <= document.numPages; i++) {
    pages.push(await document.getPage(i));
  }

  const pagesContent = await Promise.all(
    pages.map(async (page, pageNum) => {
      const operators = await page.getOperatorList();

      const textChars = operators.argsArray
        .map((item, index) => {
          if (operators.fnArray[index] === OPS.constructPath) {
            return "Break";
          }

          return operators.fnArray[index] === OPS.showText ? item[0] : "";
        })
        .filter((text) => text?.length > 0);

      const textParts = textChars
        .map((part) =>
          Array.isArray(part)
            ? part.reduce(
                (text: string, char: { unicode: string }) =>
                  text.concat(char.unicode),
                ""
              )
            : part
        )
        .filter((text) => text.trim() !== "") as string[];

      let text: Array<string[]> = [];
      let parts: string[] = [];

      textParts.forEach((part) => {
        if (parts.length !== 0 && part === "Break") {
          text.push(parts);
          parts = [];
        }

        if (part !== "Break") {
          parts.push(part);
        }
      });

      const transactionData = text.splice(2);

      return transactionData;
    })
  );

  const transactions = pagesContent.reduce((result, page) => [
    ...result,
    ...page,
  ]);

  return transactions;
};
