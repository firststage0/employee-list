import { create } from "zustand";
import { IEmployee } from "@/types/types";

interface IEmployeeStore {
    employees: IEmployee[];
    isLoading: boolean;
    fetchEmployees: (page?: number, limit?: number) => void;
    fetchEmployeeById: (id: number) => Promise<IEmployee | undefined>;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
    employees: [],
    isLoading: false,
    fetchEmployees: async (page = 1, limit = 5) => {
        set({ isLoading: true });
        const employeeResponse = await fetch(
            `http://localhost:8080/employees?page=${page}&limit=${limit}`
        );
        if (employeeResponse.ok) {
            const employeesData = await employeeResponse.json();
            set({ employees: employeesData.data, isLoading: false });
        }
    },
    fetchEmployeeById: async (id) => {
        set({ isLoading: true });
        const employeeResponse = await fetch(
            `http://localhost:8080/employees/${id}`
        );
        if (employeeResponse.ok) {
            const employee = await employeeResponse.json();
            set({ isLoading: false });
            return employee;
        }
    },
}));
