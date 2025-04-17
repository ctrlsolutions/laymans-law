'use client';

import { useEffect, useState } from 'react';
import WikiLawyer from './WikiLawyer';
import WikiLaymans from './WikiLaymans';

export default function WikiPage() {
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const storedType = localStorage.getItem('user_type');
        setUserType(storedType);
    }, []);

    if (!userType) return <div>Loading...</div>;

    return userType === 'lawyer' ? <WikiLawyer /> : <WikiLaymans />;
}
