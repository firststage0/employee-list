import { useEmployeeStore } from "@/hooks/useEmployeeStore";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./styles.scss";

export const EmployeeList = () => {
    const { employees, fetchEmployees, isLoading } = useEmployeeStore();
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const navigate = useNavigate();

    const filteredEmployeeList = employees.data?.filter((employee) =>
        `${employee.lastName} ${employee.firstName} ${employee.middleName}`
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleNavigateTo = (id: number) => {
        navigate(`/employee/${id}`);
    };

    useEffect(() => {
        fetchEmployees(page + 1, rowsPerPage);
    }, [fetchEmployees, page, rowsPerPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TextField
                label="Поиск сотрудника"
                value={search}
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>№</TableCell>
                        <TableCell>Ф.И.О.</TableCell>
                        <TableCell>Департамент</TableCell>
                        <TableCell>Должность</TableCell>
                    </TableHead>
                    <TableBody>
                        {filteredEmployeeList.map((employee, index) => (
                            <TableRow
                                key={employee.id}
                                onClick={() => {
                                    handleNavigateTo(employee.id);
                                }}
                                className="table-row"
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{`${employee.lastName} ${employee.firstName} ${employee.middleName}`}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.post}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
