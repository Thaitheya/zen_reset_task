import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Login() {
  const [oldpassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Tracks success
  const [loginError, setLoginError] = useState(false); // Tracks errors
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      oldPassword: passwordRef.current.value,
    };
    if (!payload.email || !payload.oldPassword) {
      return;
    }

    fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
        if (result.ok) {
          setLoginSuccess(true);
          setLoginError(false);
          setTimeout(() => {
            setLoginSuccess(false);
            navigate("/home");
          }, 3000);
        } else {
          throw new Error("Login failed");
        }
      })
      .catch(() => {
        setLoginError(true); 
        setLoginSuccess(false); 
        setTimeout(() => setLoginError(false), 500000); 
      });
  };

  return (
    <>
      {loginSuccess && (
        <div
          className="alert alert-success"
          style={{
            position: "fixed",
            top: "130px",
            left: "50%",
            width: "30%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          Login successful!!
        </div>
      )}

      {loginError && (
        <div
          className="alert alert-danger"
          style={{
            position: "fixed",
            top: "130px",
            left: "50%",
            width: "30%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          Login failed. Please check your credentials.
        </div>
      )}
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
            Login
          </h2>
          <form>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{ color: "white" }}
                className="form-label"
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control input-with-placeholder"
                id="email"
                placeholder="Enter your email"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  padding: "12px",
                  width: "100%",
                }}
                ref={emailRef}
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
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
                ref={passwordRef}
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
            <div style={{ marginBottom: "20px", textAlign: "right" }}>
              <Link to={"/Reset"} style={{ color: "#4caf50" }}>
                Forgot Password?
              </Link>
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
              Login
            </button>
            <div className="return">
              <button>
                <Link to={"/Signup"} style={{ color: "#fff" }}>
                  Create an account
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
