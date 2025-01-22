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
    CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EmployeeListItem } from "@/components/EmployeeListItem/EmployeeListItem";
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

    const emptyRows = page
        ? Math.max(0, (1 + page) * rowsPerPage - employees.total)
        : 0;

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
        return <CircularProgress />;
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
                            <EmployeeListItem
                                onClick={handleNavigateTo}
                                key={index}
                                employee={employee}
                            />
                        ))}
                        {!!emptyRows &&
                            Array.from({ length: emptyRows }).map(
                                (_, index) => (
                                    <TableRow
                                        key={`empty-${index}`}
                                        style={{ height: 53 }}
                                    >
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
