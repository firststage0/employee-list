import { IEmployee } from "@/types/types";
import { create } from "zustand";

interface IEmployeeStore {
    employees: { data: IEmployee[]; total: number };
    isLoading: boolean;
    fetchEmployees: (page?: number, limit?: number) => void;
    fetchEmployeeById: (id: number) => Promise<IEmployee | undefined>;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
    employees: {
        data: [],
        total: 2,
    },
    isLoading: false,
    fetchEmployees: async (page = 1, limit = 5) => {
        try {
            set({ isLoading: true });
            const employeeResponse = await fetch(
                `http://localhost:8080/employees?page=${page}&limit=${limit}`
            );

            const employeesData = await employeeResponse.json();
            set({ employees: employeesData });
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchEmployeeById: async (id) => {
        try {
            set({ isLoading: true });
            const employeeResponse = await fetch(
                `http://localhost:8080/employee/${id}`
            );
            const employee = await employeeResponse.json();
            return employee;
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
