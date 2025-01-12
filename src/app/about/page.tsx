"use client";

import { useState } from "react";
import styles from "./aboutPage.module.scss";

const AboutPage = () => {
  const [currentLang, setCurrentLang] = useState<string>("kr");

  const langList = [
    { key: "kr", value: "한국어" },
    { key: "en", value: "English" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.languageOptionList}>
        {langList.map((item) => (
          <div
            key={item.key}
            onClick={() => setCurrentLang(item.key)}
            className={
              currentLang === item.key ? styles.selectedItem : styles.item
            }
          >
            {item.value}
          </div>
        ))}
      </div>
      <div
        style={{
          marginBottom: "32px",
        }}
      />

      <div className={styles.workingHistoryWrapper}>
        {/* <p>
          Email:{" "}
          <a href="mailto:gayeon71057@gmail.com" className="link">
            gayeon71057@gmail.com
          </a>
        </p> */}
        <p>
          어떻게 하면 목표를 달성할 수 있을지 고민하며 실행하는 개발자입니다.
        </p>
        <p>
          이커머스부터 팬 플랫폼 서비스까지 다양한 경험을 통해 문제를 정의하고
          해결 방안을 찾아나가는 데 집중해 왔습니다. 유저 데이터 분석과 A/B
          테스트를 활용하여 숨겨진 비즈니스 기회를 발굴하고, 이를 기술적으로
          구현하며 성과를 만들어냅니다.
        </p>

        <h3>경력</h3>
        <section>
          <h4>HYBE BINAIRY</h4>
          <p>프론트엔드 개발 | 2024.03 ~ 재직 중</p>
          {/* <ul>
              <li>
                유튜브 크리에이터 팬 플랫폼 THEUS 앱 React Native 개발 및 어드민
                개발
              </li>
              <li>
                팬과 크리에이터를 연결하는 핵심 기능을 React Native로 개발
              </li>
              <li>
                Amplitude를 활용하여 사용자 행동 데이터를 수집하고 로깅 포인트를
                설계
              </li>
              <li>
                추천 클릭률과 조회수가 높은 게시글 특성을 분석하여 조회수 20%
                상승 달성
              </li>
              <li>
                GitLab CI를 활용하여 릴리즈 노트를 자동 생성하는 스크립트 작성
              </li>
              <li>DEV, QA, PROD 환경에 맞는 배포 전략 및 버저닝 정책 수립</li>
            </ul> */}
        </section>
        <section>
          <h4>VIVER</h4>
          <p>프론트엔드 개발 | 2022.10 ~ 2024.02</p>
          {/* <ul>
              <li>React Native로 명품 시계 커머스 앱과 웹 플랫폼 개발</li>
              <li>구매입찰 기능 개발로 일 GMV 16% 증가</li>
              <li>
                9가지 판매 주문 상태를 유스케이스로 분리하여 테스트 코드 작성
              </li>
              <li>공통 UI 컴포넌트를 구축하여 개발 생산성과 유지보수성 향상</li>
            </ul> */}
        </section>
        <section>
          <h4>Payap</h4>
          <p>프론트엔드 개발 | 2021.06 ~ 2022.10</p>
          {/* <ul>
              <li>
                React에서 Next.js로 전환하여 SEO 효율 및 검색 유입 트래픽 증가
              </li>
              <li>Firebase Push 알림과 실시간 CS 채팅 기능 추가</li>
              <li>베트남 소상공인을 위한 쇼핑몰 운영 웹서비스 개발</li>
            </ul> */}
        </section>
        <section>
          <h4>엔코위더스</h4>
          <p>프론트엔드 개발 | 2020.12 ~ 2021.06</p>
          {/* <ul>
              <li>Next.js로 워드프레스 홈페이지 이관</li>
              <li>코로나 자가격리 이커머스 플랫폼 런칭</li>
            </ul> */}
        </section>
        <h3>기술 스택</h3>
        <p>
          프론트엔드: React, React Native, Next.js, TypeScript, JavaScript,
          HTML/CSS
        </p>
        <p>테스트 및 분석: Jest, Amplitude</p>
        <h3>링크</h3>
        <p>
          <a
            href="https://www.linkedin.com/in/gayeon-lee-2448a1134/"
            className="link"
          >
            LinkedIn
          </a>{" "}
          |
          <a href="https://github.com/Kayaleeeee" className="link">
            GitHub
          </a>
        </p>
        <h3>교육</h3>
        <p>서강대학교</p>
        <p>미국문화 / 신문방송학 학사 | 2012.03 ~ 2018.08</p>
      </div>
    </div>
  );
};

export default AboutPage;
