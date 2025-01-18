import styles from "./workPage.module.scss";

const workHistory = [
  {
    title: "Hybe Binary 하이브 바이너리",
    period: "2024.3 - 현재",
    position: "Frontend Developer",
    description: ["크리에이터 팬덤 플랫폼 THEUS 앱 개발"],
    tech: ["React Native", "React", "Zustand", "Typescript"],
    logo: "/icons/hybe.jpeg",
  },
  {
    title: "Viver 바이버",
    period: "2022.10 - 2024.3",
    position: "Frontend Developer",
    description: ["명품 시계 커머스 플랫폼 앱 / 웹 개발"],
    tech: ["React Native", "React", "Recoil", "Typescript"],
    logo: "/icons/viver.jpeg",
  },
  {
    title: "Payap 페이얍",
    period: "2021.6 - 2022.10",
    position: "Frontend Developer",
    description: [
      "베트남 로컬 커머스 플랫폼 Lienmall 앱 / 웹 개발",
      "베트남 판매자들을 위한 어드민 서비스 개발",
    ],
    tech: ["Next JS", "React Native", "React", "Redux", "Typescript"],
    logo: "/icons/payap.jpeg",
  },
  {
    title: "Enkor 엔코위더스",
    period: "2020.12 - 2021.5",
    position: "Frontend Developer",
    description: ["한국에 거주하는 외국인을 대상으로 한 커머스 플랫폼 개발"],
    tech: ["Next JS"],
    logo: "/icons/enkor.jpeg",
  },
];

const WorkPage = () => {
  return (
    <div className={styles.workPageWrapper}>
      <h1 className={styles.title}>Working History</h1>
      <div className={styles.historyListWrapper}>
        {workHistory.map((item) => {
          return (
            <div key={item.title} className={styles.historyItem}>
              <span className={styles.titleWrapper}>
                <img className={styles.icon} src={item.logo} alt="icon" />
                <div className={styles.infoWrapper}>
                  <h3>{item.title}</h3>
                  <p className={styles.position}>{item.position}</p>
                  <p>{item.period}</p>
                  <p className={styles.tech}>{item.tech.join(", ")}</p>
                  <ul>
                    {item.description.map((description, index) => {
                      return <li key={index}>{description}</li>;
                    })}
                  </ul>
                </div>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkPage;
