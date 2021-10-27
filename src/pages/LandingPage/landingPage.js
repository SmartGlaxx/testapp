// import { UseContext } from '../../contexts.js/context';
// import { useHistory } from "react-router"
import Hero from '../../components/hero'
import Header from '../../components/header';
import Packages from '../../components/packages';
import { Sidebar, SidebarMobile } from '../../components';

const LandingPage=()=>{
 
  
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <SidebarMobile />
      <Hero />
      <Packages />
    </div>
  );

}
export default LandingPage;
