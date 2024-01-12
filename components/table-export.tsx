"use client";

import { FileJson, FileSpreadsheet } from "lucide-react";
import { JSXElementConstructor, ReactElement } from "react";
function parseTableData(tableData: { children: any }) {
  let headers: any[] = [];
  let rows: any[] = [];

  tableData.children.forEach((child: ReactElement) => {
    if (child.type === "thead") {
      child.props.children.props.children.forEach((th: ReactElement) => {
        headers.push(th.props.children);
      });
    } else if (child.type === "tbody") {
      child.props.children.forEach((tr: ReactElement) => {
        const row = tr.props.children.map(
          (td: ReactElement) => td.props.children
        );
        rows.push(row);
      });
    }
  });

  return { headers, rows };
}

function convertToJSON(props: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | [ReactElement<any, string | JSXElementConstructor<any>>];
}) {
  const { headers, rows } = parseTableData(props);
  return JSON.stringify({ headers, rows }, null, 2);
}

function convertToCSV(props: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | [ReactElement<any, string | JSXElementConstructor<any>>];
}) {
  const { headers, rows } = parseTableData(props);
  let csvContent = headers.join(",") + "\n";

  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });

  return csvContent;
}
const TableExport = ({
  tableChildren,
}: {
  tableChildren: ReactElement | [ReactElement];
}) => {
  const fileContents = {
    json: convertToJSON({ children: tableChildren }),
    csv: convertToCSV({ children: tableChildren }),
  };
  const downloadFile = (
    content: BlobPart,
    fileName: string,
    contentType: string
  ) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    downloadFile(fileContents.json, "data.json", "application/json");
  };

  const downloadCSV = () => {
    downloadFile(fileContents.csv, "data.csv", "text/csv");
  };
  return (
    <div className="hidden group-hover:animate-slide-in-animation group-hover:flex items-center gap-2 absolute right-0 ">
      <div className="text-sm">Export</div>
      <span
        title="Download JSON format"
        className="p-1 hover:bg-primary/5 dark:bg-secondary/5 rounded"
      >
        <FileJson size={16} onClick={downloadJSON} />
      </span>
      <span
        title="Download CSV format"
        className="p-1 hover:bg-primary/5 dark:bg-secondary/5 rounded"
      >
        <FileSpreadsheet size={16} onClick={downloadCSV} />
      </span>
    </div>
  );
};

export default TableExport;
