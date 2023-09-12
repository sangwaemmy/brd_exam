import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import "./components/Styles/App.css"
import "./components/Styles/commons.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Icon from 'react-icons-kit'
import { heart as wedding } from 'react-icons-kit/icomoon/heart'

import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'


import SideBar from "./components/Navbar/SideBar";
import SideBarPage from "./components/pages/SideBarPage";
import Dashboard from "./components/pages/Dashboard";
import "./components/Styles/SideBar.css"
import About from "./components/pages/About";
import { useMemo, useState } from "react";
import { CatNameContext } from "./components/Global/DataContext";
import NameField from "./components/Global/Forms/Inputs";
import Wrapper from "./components/HOCNew/Wrapper";
import Counter1 from "./components/HOCNew/Counter1";
import Counter2 from "./components/HOCNew/Counter2";
import Account from "./components/pages/Account";
import Tender_subm from "./components/pages/Tender_subm";
import Tender_eval from "./components/pages/Tender_eval";
import Comm_notify from "./components/pages/Comm_notify";
import Rating from "./components/pages/Rating";
import Procurement from "./components/pages/Procurement";
import Bidding from "./components/pages/Bidding";
import Reporting from "./components/pages/Reporting";
import Account_category from "./components/pages/Account_category";
import Tender_req from "./components/pages/Tender_req";
import Tender_resp from "./components/pages/Tender_resp";
import Tender_resp_att from "./components/pages/Tender_resp_att";
import Criteria from "./components/pages/Criteria";
import Criteria_group from "./components/pages/Criteria_group";
import LoggedInPage from "./components/pages/LoggedInPage";
import { RequireAuth } from "react-auth-kit";


function App() {
  // const [category, setCategory] = useState(null)
  // const categoryDetails = useMemo(() => ({ category, setCategory }), [category, setCategory])
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/account" element={<RequireAuth loginPath="/login"><Account /> </RequireAuth>} />
        <Route path="/roles" element={<RequireAuth loginPath="/login"><Account_category /></RequireAuth>} />
        <Route path="/procurement" element={<RequireAuth loginPath="/login"><Tender_subm /> </RequireAuth>} />
        <Route path="/submission" element={<RequireAuth loginPath="/login"> <Tender_subm /> </RequireAuth>} />
        <Route path="/request" element={<RequireAuth loginPath="/login"><Tender_req /> </RequireAuth>} />
        <Route path="/resp" element={<RequireAuth loginPath="/login"><Tender_resp /> </RequireAuth>} />
        <Route path="/resp_att" element={<RequireAuth loginPath="/login"> <Tender_resp_att />  </RequireAuth>} />
        <Route path="/crit_group" element={<RequireAuth loginPath="/login"> <Criteria_group />  </RequireAuth>} />
        <Route path="/criteria" element={<RequireAuth loginPath="/login"><Criteria /> </RequireAuth>} />
        <Route path="/tender_crit" element={<RequireAuth loginPath="/login"> <Tender_eval /> </RequireAuth>} />


        <Route path="/comm" element={<RequireAuth loginPath="/login"><Comm_notify /> </RequireAuth>} />
        <Route path="/rating" element={<RequireAuth loginPath="/login"><Rating /> </RequireAuth>} />
        <Route path="/reporting" element={<RequireAuth loginPath="/login"><Reporting /></RequireAuth>} />

        <Route path="/login" element={<LoggedInPage />} />
      </Routes>


    </div >
  );
}

export default App;
