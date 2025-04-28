type Route = Partial<{
  children: Route[];
  component: React.ReactNode;
  icon: string | React.ReactElement;
  isSidebar: boolean;
  name: string;
  param: string;
  path: string;
  requireAuth: boolean;
}>;
