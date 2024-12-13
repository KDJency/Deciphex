import {useContext, useEffect, useState} from 'react';
import "./CaseTable.css";
import { CaseContext } from '../../context/CaseContext';
import { Button, Checkbox } from '@mui/material';

const CaseTable = () => {
  const { rows, selectedRows, setSelectedRows, selectedCase, selectedColumns, searchTerm } = useContext(CaseContext);
  const [allCaseRows, setAllCaseRows] = useState([]);
  const [condition, setCondition] = useState(selectedCase);
  const [currentColumns, setCurrentColumns] = useState(selectedColumns);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [paginationEnd, setPaginationEnd] = useState(11);
  const [paginationStart, setPaginationStart] = useState(0);
  const [endValue, setEndValue] = useState(paginationEnd + 1);

  useEffect(() => {
    setCurrentColumns(selectedColumns);
    setCondition(selectedCase);
  });

  useEffect(() => {
    let newRows = rows;
    if (condition !== "all-cases") {
      newRows = rows.filter(row => {
        if (searchTerm) {
          const valArray = Array.from(Object.values(row));
          valArray.pop();
          const isIncluded = valArray.some(val => val.toLowerCase().includes(searchTerm.toLowerCase()));
          return row.condition === condition && isIncluded;
        } else {
          return row.condition === condition;
        }
      });
    }

    const numOfPgs = Math.ceil(allCaseRows.length / 12);
    setNumberOfPages(numOfPgs);

    setAllCaseRows(newRows);
    const actualRows = newRows.slice(paginationStart, paginationEnd);
    setCurrentRows(actualRows);
  }, [condition, rows, JSON.stringify(rows), searchTerm, paginationStart, paginationEnd]);

  useEffect(() => {
    const numOfPgs = Math.ceil(allCaseRows.length / 12);
    setNumberOfPages(numOfPgs);
    const newEnd = paginationEnd;

    if (newEnd > allCaseRows.length) {
      setEndValue(allCaseRows.length);
    } else {
      setEndValue(newEnd + 1);
    }
  }, [allCaseRows.length]);

  useEffect(() => {
    const numOfPgs = Math.ceil(allCaseRows.length / 12);
    setNumberOfPages(numOfPgs);
    setPaginationStart(0);
    setPaginationEnd(11);
    setEndValue(12);
    setCurrentPage(1);
  }, [selectedCase]);

  const handleRowCheck = (event) => {
    const rowId = event.target.parentNode.getAttribute("case-id");

    if (selectedRows.includes(rowId)) {
      const index = selectedRows.findIndex(row => row.id === rowId);
      selectedRows.splice(index, 1);
    } else {
      selectedRows.push(rowId);
    }

    setSelectedRows([...selectedRows]);
  }

  const handleHeaderCheckboxChange = () => {
    let newSelectedRows = [];
    if (currentRows.length === selectedRows.length) {
      newSelectedRows = [];
    } else {
      newSelectedRows = currentRows.map(row => row.id);
    }
    setSelectedRows(newSelectedRows);
  }

  const handleBackClick = () => {
    const newEnd = paginationEnd - 12;

    if (newEnd > allCaseRows.length) {
      setEndValue(allCaseRows.length);
    } else {
      setEndValue(newEnd + 1);
    }

    setPaginationStart(paginationStart - 12);
    setPaginationEnd(newEnd);
    setCurrentPage(currentPage - 1);
  }

  const handleForwardClick = () => {
    const newEnd = paginationEnd + 12;
    setPaginationStart(paginationStart + 12);
    setPaginationEnd(newEnd);
    setCurrentPage(currentPage + 1);

    if (newEnd > allCaseRows.length) {
      setEndValue(allCaseRows.length);
    } else {
      setEndValue(newEnd + 1);
    }
  }

  return (
    <>
      <div className="table-container">
        <div className="table-head">
          <div className="table-header-container">
            <div className="table-header table-checkbox">
              <Checkbox
                checked={selectedRows.length !== 0 && currentRows.length === selectedRows.length}
                indeterminate={selectedRows.length !== 0 && currentRows.length !== selectedRows.length}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={handleHeaderCheckboxChange}
              />
            </div>
            {currentColumns.includes("priority") && <div className="table-header priority">Priority</div>}
            {currentColumns.includes("caseName") && <div className="table-header caseName">Case Name</div>}
            {currentColumns.includes("assignee") && <div className="table-header assignee">Assignee</div>}
            {currentColumns.includes("description") && <div className="table-header description">Description</div>}
            {currentColumns.includes("status") && <div className="table-header status">Status</div>}
            {currentColumns.includes("type") && <div className="table-header type">Type</div>}
            {currentColumns.includes("dateCreated") && <div className="table-header dateCreated">Date Created</div>}
            {currentColumns.includes("lastUpdated") && <div className="table-header lastUpdated">Last Updated</div>}
            {currentColumns.includes("action") && <div className="table-header action">Action</div>}
          </div>
        </div>
        <div className="table-row-container">
          {currentRows.map((row, rowIndex) => {
            return <>
              <div className="table-row" key={rowIndex}>
                <div className="table-value table-checkbox">
                  <Checkbox case-id={row.id} onChange={handleRowCheck} checked={selectedRows.includes(row.id)}/>
                </div>
                {Object.keys(row).map((key, idx) => {
                  if (key !== "condition" && currentColumns.includes(key)) {
                    return <>
                      <div key={idx} className={`table-value ${key}`}>
                        <span className="cell-value" case-id={row.id} case-data={row.condition}>
                          {row[key]}
                        </span>
                      </div>
                    </>
                  }
                })}
              </div>
            </>
          })}
        </div>
      </div>
      <div className="pagination-container">
        <div>{`${paginationStart + 1} - ${endValue} of ${allCaseRows.length} cases`}</div>
        <div className="pagination-actions">
          <Button onClick={handleBackClick} disabled={paginationStart === 0} className="back-button">{"<"}</Button>
          <div className="pagination-numbers">{`${currentPage}/${numberOfPages}`}</div>
          <Button onClick={handleForwardClick} disabled={paginationEnd > allCaseRows.length} className="forward-button">{">"}</Button>
        </div>
      </div>
    </>
  );
}

export default CaseTable;