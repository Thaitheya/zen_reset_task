import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
function Signup() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const first_nameRef = useRef(null)
  const lastnameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const phone_numberRef = useRef(null)
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick =(e)=> {
    e.preventDefault()
    const payload = {
      first_name:first_nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      oldPassword:passwordRef.current.value,
      phone_number: phone_numberRef.current.value
    }

console.log("Payload: ", payload);
   if (
     !payload.first_name ||
     !payload.lastname ||
     !payload.email ||
     !payload.oldPassword ||
     !payload.phone_number
   ) {
     return;
   }

    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        if (result.ok) {
          navigate("/login");
        } else {
          console.error("Signup failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div
      style={{
        backgroundColor: "#121212",
        height: "100vh",
        width: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#121212",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Create an account
        </h2>
        <form>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="firstname"
              style={{ color: "#bbb" }}
              className="form-label"
            >
              First Name
            </label>
            <input
              type="text"
              className="form-control input-with-placeholder"
              id="firstname"
              ref={first_nameRef}
              placeholder="Enter your firstname"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px",
                width: "100%",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="lastname"
              style={{ color: "#bbb" }}
              className="form-label"
            >
              Last Name
            </label>
            <input
              type="text"
              className="form-control input-with-placeholder"
              id="lastname"
              ref={lastnameRef}
              placeholder="Enter your lastname"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px",
                width: "100%",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{ color: "#bbb" }}
              className="form-label"
            >
              Email Address
            </label>
            <input
              type="email"
              className="form-control input-with-placeholder"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px",
                width: "100%",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label
              htmlFor="password"
              style={{ color: "#bbb" }}
              className="form-label"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control input-with-placeholder"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px",
                paddingRight: "40px",
                width: "100%",
              }}
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#bbb",
                fontSize: "18px",
              }}
            ></i>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="phonenumber"
              style={{ color: "#bbb" }}
              className="form-label"
            >
              Phone Number
            </label>
            <input
              type="number"
              className="form-control input-with-placeholder"
              id="phonenumber"
              ref={phone_numberRef}
              placeholder="Enter your phonenumber"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "12px",
                width: "100%",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "12px",
              width: "100%",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
            onClick={handleClick}
          >
            Signup
          </button>
          <div className="return">
            <button>
              <Link to={"/Login"} style={{ color: "#fff" }}>
                Return to Login
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
