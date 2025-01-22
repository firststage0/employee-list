import { EmployeeList } from "@/components/EmployeeList/EmployeeList";
import "./styles.scss";
export default function Home() {
    return (
        <>
            <div className="home-page">
                <EmployeeList />
            </div>
        </>
    );
}
