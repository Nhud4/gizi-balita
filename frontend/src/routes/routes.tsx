import PAGES from "../configs/pages";
import ICONS from "../configs/icons";

const routes: Route[] = [
  {
    name: "Login",
    path: "/login",
    component: <PAGES.Login />,
  },
  {
    name: "Dashboard",
    path: "/",
    icon: <ICONS.Home width={24} height={24} />,
    component: <PAGES.Dashboard />,
    isSidebar: true,
  },
  {
    name: "Data Balita",
    path: "/data-balita",
    icon: <ICONS.Folder width={24} height={24} />,
    component: <PAGES.DataToddler />,
    isSidebar: true,
  },
  {
    name: "Data Klasifikasi",
    path: "/data-kalsifikasi",
    icon: <ICONS.Data width={24} height={24} />,
    component: <PAGES.DataClassification />,
    isSidebar: true,
  },
];

export { routes };
