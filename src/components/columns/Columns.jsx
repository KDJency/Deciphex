import {useContext, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import "./Columns.css";
import { Checkbox, MenuItem } from '@mui/material';
import { CaseContext } from '../../context/CaseContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const ColumnsButton = () => {
  const { selectedColumns, setSelectedColumns } = useContext(CaseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxClick = (event) => {
    const caseData = event.target.getAttribute("case-data");
    let newSelected = [];
    if (selectedColumns.includes(caseData)) {
      const index = selectedColumns.findIndex(el => el === caseData);
      selectedColumns.splice(index, 1);
      newSelected = [...selectedColumns];
    } else {
      newSelected = [...selectedColumns, caseData];
    }
    setSelectedColumns(newSelected);
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        Columns
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleCheckboxClick}
      >
        <MenuItem case-data="priority" disableRipple>
          <Checkbox checked={selectedColumns.includes("priority")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'priority' }}/>
          Priority
        </MenuItem>
        <MenuItem case-data="caseName" disableRipple>
          <Checkbox checked={selectedColumns.includes("caseName")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'caseName' }}/>
          Case Name
        </MenuItem>
        <MenuItem case-data="assignee" disableRipple>
          <Checkbox checked={selectedColumns.includes("assignee")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'assignee' }}/>
          Assignee
        </MenuItem>
        <MenuItem case-data="description" disableRipple>
          <Checkbox checked={selectedColumns.includes("description")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'description' }}/>
          Description
        </MenuItem>
        <MenuItem case-data="status" disableRipple>
          <Checkbox checked={selectedColumns.includes("status")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'status' }}/>
          Status
        </MenuItem>
        <MenuItem case-data="type" disableRipple>
          <Checkbox checked={selectedColumns.includes("type")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'type' }}/>
          Type
        </MenuItem>
        <MenuItem case-data="dateCreated" disableRipple>
          <Checkbox checked={selectedColumns.includes("dateCreated")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'dateCreated' }}/>
          Date Created
        </MenuItem>
        <MenuItem case-data="lastUpdated" disableRipple>
          <Checkbox checked={selectedColumns.includes("lastUpdated")} inputProps={{ 'aria-label': 'controlled', 'case-data': 'lastUpdated' }}/>
          Last Updated
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default ColumnsButton;