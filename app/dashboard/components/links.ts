import { 
    IconDashboard, 
    IconCalendar,
    IconBuilding,
    IconUsersGroup,
    IconAnalyze,
    IconUsers,
    IconCar,
    IconUserPin,
    IconDoorExit,
    IconBell,
    IconSettings,
 } 
    from '@tabler/icons-react';

export const links = [
    {link: '/dashboard', label: 'Dashboard', sub_links: [], icon: IconDashboard},
    {link: '/dashboard/company-setup', label: 'Company Setup', sub_links: [
        {link: "/dashboard/company-settings", label: "company settings"},
        {link: "/dashboard/position", label: "position"},
        {link: "/dashboard/agency", label: "agency"},
        {link: "/dashboard/departments", label:  "departments"},
        {link: "/dashboard/serviceses", label: "services"},
    ], icon: IconBuilding},
    {link: '/dashboard/employees', label: 'Employees', 
        sub_links: [
            {link: "/dashboard/add-employee", label: "Add Employee"},
            {link: "/dashboard/view-employees", label:  "View Employees"},
        ], icon: IconUsers},
    {link: '/dashboard/visitors', label: 'Visitors', sub_links: [], icon: IconUsersGroup},
    {link: '#', label: 'Agenda', sub_links: [
        {link: '/dashboard/appointment', label: 'appointments'},
        {link: '/dashboard/events', label: 'events'},
        {link: '/dashboard/calendar', label: 'calendar'},
    ], icon: IconCalendar},
    {link: '/dashboard/vehicles', label: 'Vehicles', sub_links: [], icon: IconCar},
    {link: '/dashboard/attendance', label: 'Attendances', sub_links: [], icon: IconUserPin},
    {link: '#', label: 'Leaves', sub_links: [
        {link: '/dashboard/leave', label: "All Leaves"},
        {link: '/dashboard/leave-approvals', label: "Leave Approvals"}
    ], icon: IconDoorExit},
    
    {link: '/dashboard/reports', label: 'Reports', sub_links: [], icon: IconFileReport},
    {link: '/dashboard/notifications', label: 'Notifications', sub_links: [], icon: IconBell},
    {link: '/dashboard/settings', label: 'Settings', sub_links: [], icon: IconSettings},
    
]