import { IEmployee } from "@/types/types";
import { create } from "zustand";

interface IEmployeeStore {
    employees: { data: IEmployee[]; length: number };
    isLoading: boolean;
    fetchEmployees: (page?: number, limit?: number) => void;
    fetchEmployeeById: (id: number) => Promise<IEmployee | undefined>;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
    employees: {
        data: [
            {
                id: 1,
                firstName: "Иван",
                lastName: "Иванов",
                middleName: "Иванович",
                birthDate: "1992-11-13T08:41:04.172Z",
                department: "Бухгалтерия",
                post: "Бухгалтер",
                salary: 65000,
                photo: "",
            },
        ],
        length: 1,
    },
    isLoading: false,
    fetchEmployees: async (page = 1, limit = 5) => {
        try {
            set({ isLoading: true });
            const employeeResponse = await fetch(
                `http://localhost:8080/employees?page=${page}&limit=${limit}`
            );
            if (employeeResponse.ok) {
                const employeesData = await employeeResponse.json();
                set({ employees: employeesData, isLoading: false });
            }
        } catch (error) {
            console.log(error);
        }
    },
    fetchEmployeeById: async (id) => {
        try {
            set({ isLoading: true });
            const employeeResponse = await fetch(
                `http://localhost:8080/employees/${id}`
            );
            if (employeeResponse.ok) {
                const employee = await employeeResponse.json();
                set({ isLoading: false });
                return employee;
            }
        } catch (error) {
            set({ isLoading: false });
            console.log(error);
        }
    },
}));
