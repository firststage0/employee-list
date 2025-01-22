import { TableRow, TableCell } from "@mui/material";
import { IEmployee } from "@/types/types";
import styles from "./EmployeeListItem.module.scss";
export const EmployeeListItem = ({
    employee,
    onClick,
}: {
    employee: IEmployee;
    onClick: (id: number) => void;
}) => {
    const { id, firstName, lastName, middleName, department, post } = employee;
    return (
        <TableRow onClick={() => onClick(id)} className={styles.tableRow}>
            <TableCell>{id + 1}</TableCell>
            <TableCell>{`${lastName} ${firstName} ${middleName}`}</TableCell>
            <TableCell>{department}</TableCell>
            <TableCell>{post}</TableCell>
        </TableRow>
    );
};
