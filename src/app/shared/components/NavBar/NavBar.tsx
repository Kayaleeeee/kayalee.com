import Link from "next/link";
import styles from "./navbar.module.scss";

const menuList = [
  { title: "About Me", link: "/me" },
  { title: "Project", link: "/project" },
  { title: "Blog", link: "/blog" },
];

export const NavBar = () => {
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
