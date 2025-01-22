import { useEmployeeStore } from "@/hooks/useEmployeeStore";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";
import imageNotAvailable from "/image-not-available.jpg";
import { useState, useEffect } from "react";
import "./styles.scss";
import { IEmployee } from "@/types/types";

interface IEmployeeCardProps {
    id: number;
}

export const EmployeeCard = ({ id }: IEmployeeCardProps) => {
    const { isLoading, fetchEmployeeById } = useEmployeeStore();
    const [employee, setEmployee] = useState<IEmployee>();

    useEffect(() => {
        fetchEmployeeById(id).then((employee) => {
            setEmployee(employee);
        });
    }, [fetchEmployeeById, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!employee) {
        return <h1>Увы, сотрудник не найден</h1>;
    }

    const {
        firstName,
        lastName,
        middleName,
        birthDate,
        department,
        post,
        photo,
        salary,
    } = employee;

    const formattedDate = new Date(birthDate).toLocaleDateString();

    return (
        <div className="employee-card-wrapper">
            <Link to="/home" className="home-link">
                <img src="/icon-back.png" alt="" className="icon-back" /> Home
            </Link>
            <Card className="employee-card">
                <CardContent className="employee-card_content">
                    <img
                        src={
                            photo
                                ? `data:image/jpeg;base64,${photo}`
                                : imageNotAvailable
                        }
                        alt={`${firstName} ${lastName}`}
                        className="employee-card_image"
                    />
                    <div className="employee-card_info">
                        <Typography variant="h4">{`${lastName} ${firstName} ${middleName}`}</Typography>
                        <Typography
                            className="employee-card_info-text"
                            color="textSecondary"
                        >{`Дата рождения: ${formattedDate}`}</Typography>
                        <Typography
                            className="employee-card_info-text"
                            color="textSecondary"
                        >{`Департамент: ${department}`}</Typography>
                        <Typography
                            className="employee-card_info-text"
                            color="textSecondary"
                        >{`Должность: ${post}`}</Typography>
                        <Typography
                            className="employee-card_info-text"
                            color="textSecondary"
                        >{`Зарплата: ${salary}`}</Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
