import { EmployeeList } from "@/components/EmployeeList/EmployeeList";
import styles from "./Home.module.scss";
export default function Home() {
    return (
        <div className={styles.homePage}>
            <EmployeeList />
        </div>
    );
}
