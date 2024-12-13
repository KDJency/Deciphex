import Sidebar from "../../components/sidebar/Sidebar";
import CaseView from "../../components/caseView/CaseView";
import "./DisplayPage.css";
import CaseProvider from "../../context/CaseContext";

const DisplayPage = () => {
  return (
    <div id="display-page">
      <CaseProvider>
        <Sidebar />
        <CaseView />
      </CaseProvider>
    </div>
  )
}

export default DisplayPage;