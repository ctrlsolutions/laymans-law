export interface Case {
    id: string;
    title: string;
    category: Category; 
    status: string;
    avatar: string;
    description: string;
    case_type: string;
    created_date: string;
    created_by: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    icon?: string;
}

export const categories: Category[] = [];

<<<<<<< HEAD
export const cases: Case[] = [];
=======
export const cases: Case[] = [];
>>>>>>> a4beffd ([feat][lanie] added casetypes.ts)
