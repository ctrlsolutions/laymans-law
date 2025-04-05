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
