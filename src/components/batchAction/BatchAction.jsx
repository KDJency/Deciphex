import {useContext, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import "./BatchAction.css";
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

const BatchActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [conditions, setConditions] = useState([]);
  const { selectedCase, selectedRows, setSelectedRows, rows, setRows } = useContext(CaseContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    let newConditions = [];
    if (selectedCase === "pending-cases") {
      newConditions = ["Accept Case", "Reject Case"];
    } else if (selectedCase === "accepted-cases") {
      newConditions = ["Return to Pending", "Reject Case"];
    } else if (selectedCase === "rejected-cases") {
      newConditions = ["Accept Case", "Return to Pending"];
    }
    setConditions(newConditions);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateNewRows = (newCase) => {
    let rowArray = rows.map(row => {
      if (selectedRows.includes(row.id)) {
        row.condition = newCase;
      }
      return row;
    });
    return rowArray;
  }

  const handleMenuItemClick = (event) => {
    let newRows = [];
    const action = event.target.getAttribute("data-action");

    if (action === "Accept Case") {
      newRows = updateNewRows("accepted-cases");
    } else if (action === "Reject Case") {
      newRows = updateNewRows("rejected-cases");
    } else if (action === "Return to Pending") {
      newRows = updateNewRows("pending-cases");
    }
    setRows(newRows);
    setSelectedRows([]);
    handleClose();
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
        disabled={selectedRows.length <= 1}
        onClick={handleClick}
        endIcon={open ? <MdArrowDropUp /> : <MdArrowDropDown />}
      >
        Batch Action
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {conditions.map((condition, index) => {
          return <MenuItem key={index} onClick={handleMenuItemClick} disableRipple data-action={condition}>{condition}</MenuItem>
        })}
      </StyledMenu>
    </div>
  );
}

export default BatchActionButton;