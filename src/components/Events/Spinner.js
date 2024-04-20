import loading from "../../images/loading.gif"
import styles from "../../design/Spinner.module.css"


const Spinner = () => {
    return (
        <div className={styles.textcenter}>
            <img src={loading} alt="loading" />
        </div>
    )

}

export default Spinner;