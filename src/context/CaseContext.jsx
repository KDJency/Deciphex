import { createContext } from "react";
import { useState, useEffect } from "react";
import tableRow from "../components/caseTable/TableRow";

export const CaseContext = createContext();

const CaseProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(["caseName", "assignee", "description", "dateCreated", "action"]);
  const [selectedCase, setSelectedCase] = useState("pending-cases");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRows(tableRow);
  }, []);

  const contextData = { 
    rows, setRows, 
    selectedRows, setSelectedRows,
    selectedColumns, setSelectedColumns, 
    selectedCase, setSelectedCase,
    searchTerm, setSearchTerm,
  };

  return (
    <CaseContext.Provider value={contextData}>
      {children}
    </CaseContext.Provider>
  );
};
export default CaseProvider;