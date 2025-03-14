import Link from "next/link";
import styles from "./navbar.module.scss";

const staticMenuList = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Project", link: "/project" },
  { title: "Work", link: "/work" },
];

export const NavBar = () => {
  return (
    <nav className={styles.wrapper}>
      {staticMenuList.map((item) => {
        return (
          <Link className={styles.linkItem} key={item.title} href={item.link}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
