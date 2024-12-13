import * as React from 'react';
import CaseTable from '../caseTable/CaseTable';
import Header from '../header/Header';
import "./CaseView.css";

const CaseView = () => {
  return (
    <div id="case-view">
      <Header />
      <CaseTable />
    </ div>
  );
}

export default CaseView;