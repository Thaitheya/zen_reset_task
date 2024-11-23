import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Reset() {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const reEnterPasswordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    email: emailRef.current.value,
    oldPassword: oldPasswordRef.current.value,
    newPassword: newPasswordRef.current.value,
    reEnterPassword: reEnterPasswordRef.current.value,
  };

  if (
    !payload.email ||
    !payload.oldPassword ||
    !payload.newPassword ||
    !payload.reEnterPassword
  ) {
    console.error("All fields are required!");
    return;
  }
  fetch(`http://localhost:3000/auth/reset/${payload.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((result) => {
      if (result.ok) {
        setReset(true)
        setTimeout(()=> {
          setReset(false)
          navigate("/login");
        }, 3000)
        
      } else {
        setOldPassword(true)
        setTimeout(() => {
          setOldPassword(false);
          navigate("/reset");
        }, 3000);
        console.error("Password reset failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

  return (
    <>
      {reset && (
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
          Reset Success
        </div>
      )}
      {!setOldPassword && (
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
          Old password is correct
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
            Reset your password
          </h2>
          <form onSubmit={handleSubmit}>
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
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="old-password"
                style={{ color: "#bbb" }}
                className="form-label"
              >
                Old Password
              </label>
              <input
                type="password"
                className="form-control input-with-placeholder"
                id="old-password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                ref={oldPasswordRef}
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
                htmlFor="new-password"
                style={{ color: "#bbb" }}
                className="form-label"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control input-with-placeholder"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                ref={newPasswordRef}
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
            </div>
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label
                htmlFor="re-enter-password"
                style={{ color: "#bbb" }}
                className="form-label"
              >
                Re Enter Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control input-with-placeholder"
                id="re-enter-password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                placeholder="Re-enter your new password"
                ref={reEnterPasswordRef}
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
            >
              Reset
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

export default Reset;
