import { MainLayout } from "@/components/layouts/main-layout";
import { AfterburnerCarousel } from "@/components/afterburner-carousel";
import { ProfileCard } from "@/components/profile-card";

const backgrounds = [
  "/images/main-bg-1.webp",
  "/images/main-bg-2.webp",
  "/images/main-bg-3.webp",
];

const afterburnerData = {
  afterburner_title: "🎉 Welcome to Afterburner 🎉",
  afterburner_contents:
    "국비교육 수료생을 위한 커뮤니티 플랫폼입니다. 함께 성장하고 발전하는 공간을 만들어가요.",
};

const contributors = [
  {
    id: 1,
    name: "주순태",
    github: "https://github.com/Stjoo0925",
    image: "https://github.com/Stjoo0925.png",
  },
  {
    id: 2,
    name: "강형석",
    github: "https://github.com/ppudding3861",
    image: "https://github.com/ppudding3861.png",
  },
  {
    id: 3,
    name: "황정한",
    github: "https://github.com/hwangjeonghan",
    image: "https://github.com/hwangjeonghan.png",
  },
  {
    id: 4,
    name: "이서현",
    github: "https://github.com/dansun2",
    image: "https://github.com/dansun2.png",
  },
  {
    id: 5,
    name: "김화연",
    github: "https://github.com/KHY90",
    image: "https://github.com/KHY90.png",
  },
  {
    id: 6,
    name: "우승엽",
    github: "https://github.com/wooseungyeop",
    image: "https://github.com/wooseungyeop.png",
  },
  {
    id: 7,
    name: "서은진",
    github: "https://github.com/jinnyjinny12",
    image: "https://github.com/jinnyjinny12.png",
  },
];

const communities = [
  {
    name: "Discord",
    image: "/images/Discord.png",
    url: "https://discord.gg/SH2p3sfASc",
  },
  {
    name: "Wiki",
    image: "/images/Wiki.png",
    url: "https://github.com/Afterburner2024/.github/wiki",
  },
  {
    name: "Notion",
    image: "/images/Notion.png",
    url: "https://www.notion.so/Afterburner-HQ-11bc18d2895180d3b6dae205c0d0d44f?pvs=4",
  },
  {
    name: "Figma",
    image: "/images/Figma.png",
    url: "https://www.figma.com/design/L3nhz4B7at9VrOLECcdIh9/Afterburner?node-id=0-1&t=pqPGJCoWXPWXHzXe-1",
  },
];

export default function AfterburnerPage() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <AfterburnerCarousel backgrounds={backgrounds} />
        <div className="flex-1 flex flex-col p-6 space-y-8">
          {/* 타이틀 및 내용 */}
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-4">
              {afterburnerData.afterburner_title}
            </h1>
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {afterburnerData.afterburner_contents}
            </p>
          </div>

          {/* 기여자 섹션 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contributor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {contributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className="animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <ProfileCard user={contributor} />
                </div>
              ))}
            </div>
          </div>

          {/* 커뮤니티 섹션 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Join our Community</h2>
            <div className="flex flex-wrap gap-4">
              {communities.map((community) => (
                <a
                  key={community.name}
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-[100px] h-auto rounded-lg shadow-lg"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
