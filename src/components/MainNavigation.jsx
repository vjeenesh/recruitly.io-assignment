import { NavLink, redirect } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useLogin } from "../App";

function MainNavigation() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const handleLogout = () => {
    const { setIsLoggedIn } = useLogin();
    setIsLoggedIn(false);
    return redirect("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/create-company"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Create Company
                </NavLink>
              </li>

              <li>
                <NavLink
                  // to="/logout"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
