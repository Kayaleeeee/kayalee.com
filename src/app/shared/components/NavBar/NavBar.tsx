"use client";

import Link from "next/link";
import styles from "./navbar.module.scss";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const staticMenuList = [
  { title: "About", link: "/about" },
  //   { title: "Project", link: "/project" },
  //   { title: "Blog", link: "/blog" },
];

export const NavBar = () => {
  const pathName = usePathname();

  const menuList = useMemo(() => {
    const isHome = pathName === "/";

    return isHome
      ? staticMenuList
      : [{ title: "Home", link: "/" }, ...staticMenuList];
  }, [pathName]);

  return (
    <nav className={styles.wrapper}>
      {menuList.map((item) => {
        return (
          <Link className={styles.linkItem} key={item.title} href={item.link}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
