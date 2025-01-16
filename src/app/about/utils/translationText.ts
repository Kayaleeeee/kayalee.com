import { LanguageType } from "./getCurrentLanguage";

type TranslationTextType = {
  [key: string]: {
    [key in LanguageType]: {
      title?: string;
      description: string[];
    };
  };
};

export const translationText: TranslationTextType = {
  intro: {
    KR: {
      title: "비지니스 지향적인 개발자",
      description: ["비지니스 문제를 해결하는게 먼저니까"],
    },
    EN: {
      title: "Business-Oriented Developer",
      description: ["Focused on solving business problems as the top priority"],
    },
  },
  description: {
    KR: {
      description: [
        "다양한 분야에서 문제를 정의하고 해결하며 실질적인 비지니스 성과로 연결했어요",
      ],
    },
    EN: {
      description: [
        "Defining and addressing problems in various domains, \ntranslating them into tangible business outcomes",
      ],
    },
  },
  coreValue: {
    KR: {
      description: [
        "일은 찾아서하고",
        "목표가 없으면 만들면서",
        "같은 방향을 바라볼 수 있도록 커뮤니케이션해요",
      ],
    },
    EN: {
      description: [
        "Proactively seeking tasks,",
        "Creating goals when none exist,",
        "Fostering communication to ensure the team works towards a shared direction",
      ],
    },
  },
  section: {
    KR: {
      description: [
        "아름다운 UI와 유저경험을 만드는 일에도 항상 열려있습니다.",
        "단순히 작동하는 서비스가 아니라, 기억에 남는 경험을 만들고 싶어요.",
      ],
    },
    EN: {
      description: [
        "Open to Crafting Beautiful UIs and User Experiences",
        "Committed to creating not just functional services, but memorable and impactful user experiences",
      ],
    },
  },
  footer: {
    KR: {
      description: ["새로운 기회에 언제나 열려있어요!"],
    },
    EN: {
      description: ["Always open to new opportunities!"],
    },
  },
};
