import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useAuth } from "../../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/a/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/a/dashboard");
  };

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.input_box}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter email"
            name="email"
            required
          />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password"
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
