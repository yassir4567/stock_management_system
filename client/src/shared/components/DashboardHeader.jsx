import styles from '../styles/DashboardHeader.module.css'

function DashboardHeader() {
    return (
        <header className={styles.header}>
            <h4 className={styles.fullName}>Full name</h4>
            <p className={styles.email}>yassir@gmail.com</p>
        </header>
    )
}

export default DashboardHeader;