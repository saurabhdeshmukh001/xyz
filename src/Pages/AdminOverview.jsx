import React from 'react';

// Inline SVG icons
const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm1.8 14.5a.8.8 0 0 1-.8.8H12a2.8 2.8 0 0 1-2.8-2.8V9.5a.8.8 0 0 1 .8-.8h1a.8.8 0 0 1 .8.8V12a1.8 1.8 0 0 0 1.8 1.8h.2a.8.8 0 0 1 0 1.6ZM13.2 8.5a.8.8 0 0 1-.8-.8V6.2a.8.8 0 0 1 .8-.8h1a.8.8 0 0 1 .8.8v1.5a.8.8 0 0 1-.8.8Z" />
    </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M17.47 16.47a.75.75 0 0 1 .78.11l.24.23a.75.75 0 0 1 .09.91l-1.5 2.5a.75.75 0 0 1-1.3-.85l.77-1.28ZM6.53 16.47a.75.75 0 0 1-.11.78l-.23.24a.75.75 0 0 1-.91.09l-2.5-1.5a.75.75 0 0 1 .85-1.3l1.28.77ZM4.5 13.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5l.5 3.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5Zm15.5-1.5a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5h-9A1.5 1.5 0 0 0 6 6v4.5a1.5 1.5 0 0 1-3 0V6a4.5 4.5 0 0 1 4.5-4.5h9A4.5 4.5 0 0 1 21 6v4.5a1.5 1.5 0 0 1-1.5 1.5ZM8 8.5a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0Zm8 0a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0Z" />
    </svg>
);

const BoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 2a10 10 0 0 0-9.8 12.1A.75.75 0 0 1 2.2 14a.75.75 0 0 1-.2-.5V7a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75Z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 2a10 10 0 0 0-9.8 12.1A.75.75 0 0 1 2.2 14a.75.75 0 0 1-.2-.5V7a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75Z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 2a10 10 0 0 0-9.8 12.1A.75.75 0 0 1 2.2 14a.75.75 0 0 1-.2-.5V7a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75Z" />
    </svg>
);

const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 2a10 10 0 0 0-9.8 12.1A.75.75 0 0 1 2.2 14a.75.75 0 0 1-.2-.5V7a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75Z" />
    </svg>
);

const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
        <path d="M12 2a10 10 0 0 0-9.8 12.1A.75.75 0 0 1 2.2 14a.75.75 0 0 1-.2-.5V7a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75Z" />
    </svg>
);

const AdminOverview = () => {
    // This data would be fetched from an API
    const stats = {
        totalRevenue: { value: '$179.99', change: '+12.5%', icon: <DollarIcon /> },
        totalOrders: { value: '1', change: '+8.2%', icon: <ShoppingCartIcon /> },
        products: { value: '15', change: '+3.1%', icon: <BoxIcon /> },
        customers: { value: '1', change: '+15.3%', icon: <UsersIcon /> },
    };

    const statusItems = {
        pendingOrders: { label: 'Pending Orders', value: '0', bgColor: 'bg-amber-100', icon: <ClockIcon /> },
        lowStockItems: { label: 'Low Stock Items', value: '2', bgColor: 'bg-red-100', icon: <ExclamationTriangleIcon /> },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {Object.keys(stats).map((key) => (
                    <div key={key} className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md">
                        <div>
                            <span className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <div className="text-2xl font-bold text-gray-900 mt-1">{stats[key].value}</div>
                            <div className="text-xs text-green-500 font-semibold mt-1">{stats[key].change}</div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full text-white text-xl">
                            {stats[key].icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`${statusItems.pendingOrders.bgColor} p-6 rounded-xl text-center shadow-md`}>
                    <div className="text-4xl text-yellow-500 mb-2">
                        {statusItems.pendingOrders.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                        {statusItems.pendingOrders.label}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                        {statusItems.pendingOrders.value}
                    </div>
                </div>

                <div className={`${statusItems.lowStockItems.bgColor} p-6 rounded-xl text-center shadow-md`}>
                    <div className="text-4xl text-red-500 mb-2">
                        {statusItems.lowStockItems.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                        {statusItems.lowStockItems.label}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                        {statusItems.lowStockItems.value}
                    </div>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-xl border-2 border-blue-500 border-dashed text-center shadow-md">
                    <div className="text-4xl text-blue-500 mb-2">
                        <CogIcon />
                    </div>
                    <div className="text-base font-medium text-gray-800">
                        Inventory
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        Manage Stock
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;