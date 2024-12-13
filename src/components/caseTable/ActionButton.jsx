import {useContext, useState} from 'react';
import { BsThreeDots } from "react-icons/bs";
import { alpha, styled } from '@mui/material/styles';
import { CaseContext } from '../../context/CaseContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

const ActionButton = () => {
  const [selectedRowId, setSelectedRowId] = useState("");
  const [conditions, setConditions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { rows, setRows, selectedRows } = useContext(CaseContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const rowId = event.currentTarget.parentNode.parentNode.getAttribute("case-id");
    const rowCondition = event.currentTarget.parentNode.parentNode.getAttribute("case-data");
    setSelectedRowId(rowId);

    let newConditions = [];
    if (rowCondition === "pending-cases") {
      newConditions = ["Accept Case", "Reject Case"];
    } else if (rowCondition === "accepted-cases") {
      newConditions = ["Return to Pending", "Reject Case"];
    } else if (rowCondition === "rejected-cases") {
      newConditions = ["Accept Case", "Return to Pending"];
    }
    setConditions(newConditions);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event) => {
    const selectedRow = rows.find(el => el.id === selectedRowId);
    const action = event.target.getAttribute("data-action");
    if (action === "Accept Case") {
      selectedRow.condition = "accepted-cases";
    } else if (action === "Reject Case") {
      selectedRow.condition = "rejected-cases";
    } else if (action === "Return to Pending") {
      selectedRow.condition = "pending-cases";
    }
    setRows([...rows]);
  }

  return (
    <div>
      <Button
        id="action-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        disabled={selectedRows.length > 1}
        onClick={handleClick}
      >
        <BsThreeDots />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'action-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {conditions.map(condition => {
          return <MenuItem onClick={handleMenuItemClick} disableRipple data-action={condition}>{condition}</MenuItem>
        })}
      </StyledMenu>
    </div>
  );
}

export default ActionButton;