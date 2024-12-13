import { Button, MenuItem, Select, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { MdSearch } from "react-icons/md";
import './Header.css';
import BatchActionButton from '../batchAction/BatchAction';
import ColumnsButton from '../columns/Columns';
import { useContext, useEffect, useState } from 'react';
import { CaseContext } from '../../context/CaseContext';

const Header = () => {
  const { selectedCase, setSearchTerm } = useContext(CaseContext);
  const [ title, setTitle ] = useState("Pending Cases");
  const [searchInput, setSearchInput] = useState("");

  const renderSearchbar = () => {
    return <div className="search-bar">
      <TextField
        id="outlined-start-adornment"
        className="search-input"
        placeholder="Search..."
        onInput={handleSearchInput}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment>,
            endAdornment: 
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSearchButtonClick}>
                  Search
                </Button>
              </InputAdornment>
          },
        }}
      />
    </div>
  }

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  }

  const handleSearchButtonClick = () => {
    setSearchTerm(searchInput);
  }

  useEffect(() => {
    let currentTitle = title;
    if (selectedCase === "accepted-cases") {
      currentTitle = "Accepted Cases"
    } else if (selectedCase === "pending-cases") {
      currentTitle = "Pending Cases"
    } else if (selectedCase === "rejected-cases") {
      currentTitle = "Rejected Cases"
    } else if (selectedCase === "all-cases") {
      currentTitle = "All Cases"
    };
    setTitle(currentTitle);
  });

  return (
    <div id="header">
      <h2>{title}</h2>
      <div className="action-bar">
        {renderSearchbar()}
        <div className="action-buttons">
          <BatchActionButton />
          <ColumnsButton />
        </div>
      </div>
    </div>
  )
}

export default Header;