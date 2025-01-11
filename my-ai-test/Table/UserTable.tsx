import React from 'react';
import './style.less';

interface User {
name: string;
age: number;
email: string;
}

interface TableProps {
users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
return (
<div className='table'>
<div className='table-row table-header'>
<div className='table-cell'>Name</div>
<div className='table-cell'>Age</div>
<div className='table-cell'>Email</div>
</div>
{users.map((user, index) => (
<div key={index} className='table-row'>
<div className='table-cell'>{user.name}</div>
<div className='table-cell'>{user.age}</div>
<div className='table-cell'>{user.email}</div>
</div>
))}
</div>
);
};

export default Table;