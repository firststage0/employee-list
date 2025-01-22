import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { useParams } from "react-router";
import styles from "./EmployeeDetail.module.scss";

export default function EmployeeDetail() {
    const { id } = useParams();
    return (
        <div className={styles.employeePage}>
            <main className={styles.main}>
                <EmployeeCard id={Number(id)} />
            </main>
        </div>
    );
}
