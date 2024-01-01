import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Services from './pages/Services';
import MyListing from './pages/ShowListing';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import SavedListings from './pages/SavedListings';
import ManageListings from './pages/ManageListings';
import Search from './pages/Search';
import ContactUs from './pages/ContactUs';
import Mortgage from './pages/Mortgage';
import SingOut from './pages/SingOut'
import Settings from './pages/Settings'




export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />  {/* done */}
        <Route path='/sign-in' element={<SignIn />} />{/* done */}
        <Route path='/sign-up' element={<SignUp />} />{/* done */}
        <Route path='/our-services' element={<Services />} />{/* done */}
        <Route path='/mortgage-calculator' element={<Mortgage />} />{/* done */}
        <Route path='/about-us' element={<About />} />{/* done */}
        <Route path='/contact-us' element={<ContactUs />} />{/* done */}
        <Route path='/search' element={<Search />} />{/* done */}
        <Route path='/listing/:listingId' element={<Listing />} />{/* done */}
        <Route element={<PrivateRoute />}>
          <Route path='/my-listings' element={<MyListing />} />{/* done */}
          <Route path='/listing/saved' element={<SavedListings />} />{/* done */}
          <Route path='/listing/requests' element={<ManageListings />} /> {/* done */}
          <Route path='/sign-out' element={<SingOut />} />{/* done */}
          <Route path='/settings' element={<Settings />} />{/* done */}
          <Route path='/create-listing' element={<CreateListing />} />{/* done */}
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}
// 2bbZGB9PEFkwcxw