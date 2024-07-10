import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/Home";
import BookingsForm from "./pages/BookingsForm";
import EditBookingForm from "./pages/EditBookingForm";
import CustomNavbar from "./components/CustomNavbar";
import AddCarForm from "./pages/AddCarForm";
import ManageBookings from "./pages/ManageBookings";

export const UserContext = createContext();

function App() {
  const [car, setCar] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const value = { loggedInUser, setLoggedInUser };

  console.log(loggedInUser);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user?.email}`
      );
      if (data) {
        setLoggedInUser(data);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE,
          scope: "read:current_user",
        },
      });

      localStorage.setItem("token", token);
    };

    if (user) {
      fetchToken();
    }
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className="App">
      <header className="App-header">
        <UserContext.Provider value={value}>
          <ScrollToTop color="black" width="20" height="20" />

          <CustomNavbar />

          <Routes>
            <Route index element={<Home />} />

            <Route path="/bookings-form" element={<BookingsForm />} />

            <Route
              path="/edit-booking/:bookingId"
              element={<EditBookingForm cars={car} setCars={setCar} />}
            />

            <Route path="/manage-bookings" element={<ManageBookings />} />

            <Route path="/add-car" element={<AddCarForm />} />
          </Routes>
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
