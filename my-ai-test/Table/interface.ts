export interface User {
name: string;
age: number;
email: string;
}

export interface TableProps {
users: User[];
}

export type { TableProps };