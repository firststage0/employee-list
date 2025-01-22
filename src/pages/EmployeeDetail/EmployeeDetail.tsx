import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { useParams } from "react-router";
import "./styles.scss";

export default function EmployeeDetail() {
    const { id } = useParams();
    return (
        <div className="employee-page">
            <main className="main">
                <EmployeeCard id={Number(id)} />
            </main>
        </div>
    );
}
