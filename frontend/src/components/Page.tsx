import React from 'react';

const Page: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h1>{title}</h1>
        {children}
    </div>
);

export default Page;