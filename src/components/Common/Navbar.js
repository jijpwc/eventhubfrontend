import styles from "../../design/navbar.module.css";
import { NavLink } from "react-router-dom";
import {useContext, useState } from "react";
import { FaBars } from 'react-icons/fa'; 
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../shared/AuthContext";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);
    return (
        <div>
            <div className={click ? `${styles.maincontainer}` : ""} onClick={() => Close()} />
            <nav className={styles.navbar} onClick={e => e.stopPropagation()}>
                <div className={styles.navcontainer}>
                    <NavLink exact to="/" className={styles.navlogo}>
                        <h3 className={`${styles.fa} ${styles.facode}`}>EventHub</h3>
                    </NavLink>
                    <ul className={click ? `${styles.navmenu} ${styles.active}` :`${styles.navmenu}`}>
                        <li className={styles.navitem}>
                            <NavLink
                                exact
                                to="/"
                                activeclassname={styles.active}
                                className={styles.navlinks}
                                onClick={click ? handleClick : null}
                            >
                                Home
                            </NavLink>
                        </li>
                        {auth.isLoggedIn && auth.isUserHr && <li className={styles.navitem}>
                            <NavLink
                                exact
                                to="/Add"
                                activeclassname={styles.active}
                                className={styles.navlinks}
                                onClick={click ? handleClick : null}
                            >
                                Add-Event
                            </NavLink>
                        </li>}
                        
                        {
                            auth.isLoggedIn &&
                            <li className={styles.navitem}>
                            <NavLink
                                exact
                                to="/profile"
                                activeclassname={styles.active}
                                className={styles.navlinks}
                                onClick={click ? handleClick : null}
                            >
                                 {JSON.parse(localStorage.getItem("user")).name}
                            </NavLink>
                            </li>
                        }
                        {auth.isLoggedIn === false ?
                            (<li className={styles.navitem}>
                                <NavLink
                                    exact
                                    to="/login"
                                    activeclassname={styles.active}
                                    className={styles.navlinks}
                                    onClick={click ? handleClick : null}
                                >
                                    Login/SignUp
                                </NavLink>
                            </li>

                            ) : (<li className={styles.navitem}>
                                <NavLink
                                    exact
                                    to="/login"
                                    activeclassname={styles.active}
                                    className={styles.navlinks}
                                    onClick={() => { auth.logout() }}
                                >
                                    Log Out
                                </NavLink>
                            </li>)}
                    </ul>
                    <div className={styles.navicon} onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </nav>
        </ div>
    );
}

export default Navbar;