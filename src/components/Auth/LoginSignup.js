import React, { useState, useEffect, useContext } from 'react';
import styles from '../../design/Login.module.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/AuthContext";
import Spinner from '../Events/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const LoginSignup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [errors, setErrors] = useState({});
  const [designationList, setDesignationList] = useState([]);
  const [runspinner, setrunspinner] = useState(false);

  const handleActionChange = (newAction) => {
    setAction(newAction);
    setErrors({});
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (action === "Login") {

      if (!email) {
        validationErrors.email = "Email is required";

      }
      if (!password) {
        validationErrors.password = "Password is required";

      } else if (password.length < 6) {
        validationErrors.password = "Password should be at least 6 characters long";

      }


    } else {

      if (!username) {
        validationErrors.username = "Username is required";


      }
      if (!email) {
        validationErrors.email = "Email is required";

      } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = "Invalid email format";

      }
      if (!password) {
        validationErrors.password = "Password is required";

      } else if (password.length < 6) {
        validationErrors.password = "Password should be at least 6 characters long";

      }
      if (!confirmPassword) {
        validationErrors.confirmPassword = "Confirm Password is required";

      } else if (confirmPassword !== password) {
        validationErrors.confirmPassword = "Passwords do not match";

      }
      if (!designation) {
        validationErrors.designation = "Designation is required";

      }

    }

    if (Object.keys(validationErrors).length === 0) {
      if (action === "Login") {
        AuthApi("login", { email, password });

      } else {
        AuthApi("createuser", { "name": username, email, password, "designationId": designation });
        // toast.success("Successfully SignnedUp!");
      }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }

  };

  const AuthApi = async (endpoint, data) => {
    setrunspinner(true);

    const res = await fetch(`http://eventhubbackend.eastus.cloudapp.azure.com:5000/api/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const userData = await res.json();
      localStorage.setItem("user", JSON.stringify(userData));
      auth.login();
      setrunspinner(false);
      if (endpoint === "login")
        toast.success("Successfully LoggedIn!");
      else
        toast.success("Successfully SignnedUp!");
      navigate("/");
    } else {
      setrunspinner(false);
      toast.error("Invalid Credentials");
    }
  }

  useEffect(() => {
    const fetchDesignation = async () => {
      const res = await fetch(`${process.env.SERVER_URL}:5000/api/auth/getdesg`);
      const desgData = await res.json();
      setDesignationList(desgData);
    }
    fetchDesignation();
  }, [])

  return (
    <>
      {runspinner && <Spinner />}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          {action === "Sign Up" && (<div className={styles.input}>
            <input className={styles.inputBx} type={styles.text} placeholder='Username' value={username} onChange={handleUsernameChange} />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>
          )}

          <div className={styles.input}>
            <input className={styles.inputBx} type="email" placeholder='Email' value={email} onChange={handleEmailChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>


          <div className={styles.input}>
            <input className={styles.inputBx} type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {action === "Sign Up" && (
            <div className={styles.input}>
              <input className={styles.inputBx} type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>
          )}

          {action === "Sign Up" && (
            <div className={styles.input}>
              <select value={designation} onChange={handleDesignationChange} className={styles.selectBx}>
                <option>Select Designation</option>
                {
                  designationList.map((desg) => {
                    return <option key={desg._id} value={desg._id}>{desg.designation}</option>
                  })
                }
              </select>
              {errors.designation && <span className={styles.error}>{errors.designation}</span>}
            </div>
          )}
        </div>

        {/* {action === "Sign Up" ? <div></div> : <div className={styles.forgotpassword}>Forgot Password?<span>Click Here! </span></div>} */}

        <div className={styles.submitContainer}>
          <button className={styles.submit} onClick={handleSubmit}>{action}</button>
          <button className={`${styles.submit} ${styles.gray}`} onClick={() => handleActionChange(action === "Login" ? "Sign Up" : "Login")}>
            {action === "Login" ? "Sign Up" : "Login"}
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default LoginSignup;  
