import React from "react";
import routes from "../../routes";
import ICONS from "../../configs/icons";
import { useLocation } from "react-router-dom";

import styles from "./styles.module.css";

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <ICONS.GreenLogo width={50} height={50} />
        <div>
          <h1>PUSKESMAN</h1>
          <h2>Bojonegoro</h2>
        </div>
      </div>

      <div className={styles.wrapper}>
        {routes.map((menu, i) => {
          if (menu.isSidebar) {
            return (
              <button
                key={i}
                className={[
                  styles.menu,
                  menu.path === pathname ? styles.active : "",
                ].join(" ")}
                onClick={() => {
                  window.location.href = menu.path as string;
                }}
              >
                {menu.icon}
                <h1>{menu.name}</h1>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};
