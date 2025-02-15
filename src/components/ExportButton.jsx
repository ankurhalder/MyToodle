import { useState } from "react";
import { useSelector } from "react-redux";
import ReusableButton from "./common/ReusableButton";

const ExportButton = () => {
  const todos = useSelector((state) => state.todos);
  const [exportType, setExportType] = useState("json");

  const downloadFile = (data, filename, type) => {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const data = JSON.stringify(todos, null, 2);
    downloadFile(data, "todos.json", "application/json");
  };

  const exportAsCSV = () => {
    const header = ["ID", "Text", "Created At", "Updated At"];
    const rows = todos.map((todo) => [
      todo.id,
      `"${todo.text.replace(/"/g, '""')}"`,
      new Date(todo.createdAt).toLocaleString(),
      new Date(todo.updatedAt).toLocaleString(),
    ]);
    const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    downloadFile(csvContent, "todos.csv", "text/csv");
  };

  const exportAsWord = () => {
    const lines = todos.map((todo) => {
      let line = `Todo: ${todo.text}\nAdded: ${new Date(
        todo.createdAt
      ).toLocaleString()}`;
      if (todo.updatedAt !== todo.createdAt) {
        line += `\nUpdated: ${new Date(todo.updatedAt).toLocaleString()}`;
      }
      return line;
    });
    const content = lines.join("\n\n");
    downloadFile(content, "todos.doc", "application/msword");
  };

  const handleExport = () => {
    if (exportType === "json") {
      exportAsJSON();
    } else if (exportType === "excel") {
      exportAsCSV();
    } else if (exportType === "word") {
      exportAsWord();
    }
  };

  return (
    <div className="todo__list__export__buttons">
      <label
        className="todo__list__export__buttons__label"
        htmlFor="exportType"
      >
        Export Format:
      </label>
      <select
        className="todo__list__export__buttons__select"
        value={exportType}
        onChange={(e) => setExportType(e.target.value)}
      >
        <option value="json">JSON</option>
        <option value="excel">Excel</option>
        <option value="word">Word</option>
      </select>
      <ReusableButton onClick={handleExport}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 1v10M8 1l3 3M8 1l-3 3"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2 14h12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </ReusableButton>
    </div>
  );
};

export default ExportButton;
