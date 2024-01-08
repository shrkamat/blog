"use client";

import { FileJson, FileSpreadsheet } from "lucide-react";
function parseTableData(tableData) {
  let headers = [];
  let rows = [];

  tableData.children.forEach((child) => {
    if (child.type === "thead") {
      child.props.children.props.children.forEach((th) => {
        headers.push(th.props.children);
      });
    } else if (child.type === "tbody") {
      child.props.children.forEach((tr) => {
        const row = tr.props.children.map((td) => td.props.children);
        rows.push(row);
      });
    }
  });

  return { headers, rows };
}

function convertToJSON(props) {
  const { headers, rows } = parseTableData(props);
  return JSON.stringify({ headers, rows }, null, 2);
}

function convertToCSV(props) {
  const { headers, rows } = parseTableData(props);
  let csvContent = headers.join(",") + "\n";

  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });

  return csvContent;
}
const TableExport = ({ tableChildren }) => {
  const fileContents = {
    json: convertToJSON({ children: tableChildren }),
    csv: convertToCSV({ children: tableChildren }),
  };
  const downloadFile = (content, fileName, contentType) => {
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
      <span title="Download JSON format">
        <FileJson
          size={16}
          // className="cursor-pointer"
          onClick={downloadJSON}
        />
      </span>
      <span title="Download CSV format">
        <FileSpreadsheet
          size={16}
          //   className="cursor-pointer"
          onClick={downloadCSV}
        />
      </span>
    </div>
  );
};

export default TableExport;
