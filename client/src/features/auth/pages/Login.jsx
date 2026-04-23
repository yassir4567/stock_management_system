import styles from "../styles/Login.module.css";
function Login() {
  return (
    <div className={styles.container}>
      <form action="">
        <div className={styles.input_box}>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Enter email" name="email" required />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="">Password</label>
          <input
            type="password"
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
