const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    accessLevel: 'student',
  },
  {
    path: "/exams",
    name: "Exams",
    icon: "nc-icon nc-atom",
    accessLevel: 'student',
  },
  {
    path: "/create-exam",
    name: "Create Exams",
    icon: "nc-icon nc-atom",
    accessLevel: 'teacher',
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    accessLevel: 'student',
  },
];

export default dashboardRoutes;
