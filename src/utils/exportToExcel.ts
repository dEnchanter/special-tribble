/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

interface ExportToExcelParams {
  data: any[]; // Adjust this type based on the structure of your data
  header: string[];
  filename?: string;
}

export function exportToExcel({ data, header, filename }: ExportToExcelParams) {
  const worksheet = utils.json_to_sheet(data, { header });
  const workbook = { Sheets: { "sheet 1": worksheet }, SheetNames: ["sheet 1"] };
  const buffer = write(workbook, { bookType: "csv", type: "array" });

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  const finalFilename = `proza_${filename || "report"}_${format(
    new Date(),
    "dd_MM_yyyy_HH_mm_ss"
  )}.csv`;
  saveAs(blob, finalFilename);
}