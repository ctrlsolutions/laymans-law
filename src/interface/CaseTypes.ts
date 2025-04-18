export interface Case {
    id: string;
    title: string;
    category: {
    name: string;
    color: string;
};
status: {
    isOpen: boolean;
    color: string;
};
avatar: string;
lastUpdate: {
    user: string;
    time: string;
};
description: string;
}

export interface Category {
id: string;
name: string;
color: string;
icon?: string;
}

export interface LawData {
    id: number;
    title: string;
    chapter: string;
    tags: string[];
    content: string;
    translation: {
    language_tagalog: string;
    language_bisaya: string;
    language_waray: string;
};
}
export const categories: Category[] = [];

export const cases: Case[] = [];