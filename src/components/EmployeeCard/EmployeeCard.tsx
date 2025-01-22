import { useEmployeeStore } from "@/hooks/useEmployeeStore";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";
import imageNotAvailable from "/image-not-available.jpg";
import { useState, useEffect } from "react";
import styles from "./EmployeeCard.module.scss";
import { IEmployee } from "@/types/types";

interface IEmployeeCardProps {
    id: number;
}

export const EmployeeCard = ({ id }: IEmployeeCardProps) => {
    const { isLoading, fetchEmployeeById } = useEmployeeStore();
    const [employee, setEmployee] = useState<IEmployee>();

    const renderEmployeeCard = () => {
        switch (true) {
            case isLoading:
                return <div>Loading...</div>;
            case !employee:
                return <h1>Увы, сотрудник не найден</h1>;
            default: {
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

                const cardPhoto = photo
                    ? `data:image/jpeg;base64,${photo}`
                    : imageNotAvailable;

                const formattedDate = new Date(birthDate).toLocaleDateString();

                return (
                    <div className={styles.employeeCard_wrapper}>
                        <Link to="/home" className={styles.homeLink}>
                            <img
                                src="/icon-back.png"
                                alt=""
                                className={styles.iconBack}
                            />{" "}
                            Home
                        </Link>
                        <Card className={styles.employeeCard}>
                            <CardContent
                                className={styles.employeeCard_content}
                            >
                                <img
                                    src={cardPhoto}
                                    alt={`${firstName} ${lastName}`}
                                    className={styles.employeeCard_image}
                                />
                                <div className={styles.employeeCard_info}>
                                    <Typography variant="h4">{`${lastName} ${firstName} ${middleName}`}</Typography>
                                    <Typography
                                        className={styles.employeeCard_infoText}
                                        color="textSecondary"
                                    >{`Дата рождения: ${formattedDate}`}</Typography>
                                    <Typography
                                        className={styles.employeeCard_infoText}
                                        color="textSecondary"
                                    >{`Департамент: ${department}`}</Typography>
                                    <Typography
                                        className={styles.employeeCard_infoText}
                                        color="textSecondary"
                                    >{`Должность: ${post}`}</Typography>
                                    <Typography
                                        className={styles.employeeCard_infoText}
                                        color="textSecondary"
                                    >{`Зарплата: ${salary}`}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            }
        }
    };

    useEffect(() => {
        fetchEmployeeById(id).then((employee) => {
            setEmployee(employee);
        });
    }, [fetchEmployeeById, id]);

    return renderEmployeeCard();
};
