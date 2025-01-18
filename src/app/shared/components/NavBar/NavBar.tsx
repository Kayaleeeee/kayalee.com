import Link from "next/link";
import styles from "./navbar.module.scss";

const staticMenuList = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Work", link: "/work" },
  { title: "Project", link: "/project" },
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
