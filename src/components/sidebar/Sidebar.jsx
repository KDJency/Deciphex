import { CASE_TYPE } from '../../constants';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineCheckCircle, MdOutlinePending } from "react-icons/md";
import { TbBriefcase2 } from "react-icons/tb";
import './Sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { CaseContext } from '../../context/CaseContext';

const Sidebar = () => {
  const [caseButtons, setCaseButtons] = useState([]);
  const { setSelectedCase } = useContext(CaseContext);

  useEffect(() => {
    setCaseButtons(document.querySelectorAll(".case-button"));
  }, []);

  const handleCaseClick = (event) => {
    let selectedId = event.target.id;
    let el = document.getElementById(selectedId);
    if (selectedId !== "sidebar") {
      if (event.target.getAttribute("d") !== null) {
        selectedId = event.target.parentNode.parentNode.id;
        el = document.getElementById(event.target.parentNode.parentNode.id);
      } else if (el === null) {
        selectedId = event.target.parentNode.id;
        el = document.getElementById(event.target.parentNode.id);
      }
      caseButtons.forEach(button => {
        button?.classList.remove("selected");
      });
  
      el.classList.add("selected");
    }

    setSelectedCase(selectedId);
  }

  return (
    <div id="sidebar" onClick={handleCaseClick}>
      <div id={CASE_TYPE.ALL} className="case-button">
        <TbBriefcase2 className="case-icon"/>
        <span className="case-name">All Cases</span>
      </div>
      <div id={CASE_TYPE.PENDING} className="case-button selected">
        <MdOutlinePending className="case-icon"/>
        <span className="case-name">Pending Cases</span>
      </div>
      <div id={CASE_TYPE.ACCEPTED} className="case-button">
        <MdOutlineCheckCircle className="case-icon"/>
        <span className="case-name">Accepted Cases</span>
      </div>
      <div id={CASE_TYPE.REJECTED} className="case-button">
        <IoMdCloseCircleOutline className="case-icon"/>
        <span className="case-name">Rejected Cases</span>
      </div>
    </div>
  )
}

export default Sidebar;