import React from "react";
import { useRouter } from "next/router";
import { MENU_LIST } from "./constants";
import styles from "./index.module.css";
import Swal from "sweetalert2";

const Layout = ({ children }) => {
  const router = useRouter();

  const handleChangePage = (location) => {
    router.push(location);
  };

  return (
    <main className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebar__nav}>
          <ul>
            {MENU_LIST.map((menu, index) => {
              return (
                <li
                  className={router.pathname === menu.path ? styles.active : ""}
                  key={index}
                  onClick={() => handleChangePage(menu.path)}
                >
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <section className={styles.content}>{children}</section>
    </main>
  );
};

export default Layout;
