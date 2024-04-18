import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_MISSION } from "../graphql/query";
import TriggerMyMission from "../components/APIs/TriggerMyMission.jsx";
import FunFact from "../components/FunFact.jsx";
import LeaderBoard from "../components/LeaderBoard/LeaderBoard.jsx"

// MissionId is optional
const MissionCard = ({ title, description, categoryColor, missionId=null }) => {
  return (
    <div className="relative p-4 mb-2 border">
      <span
        className={`absolute top-0 left-0 h-1 w-full ${categoryColor}`}
      ></span>{" "}
      {/* Colored bar */}
      <h3 className="font-semibold text-md">{missionId ? <a href={`mission-activities/${missionId}`}>{title}</a> : title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const Home = () => {
  const [missions] = useState({
    dailyMissions: [
      {
        id: 1,
        title: "Astrology Mission",
        description: "Read your daily horoscope.",
        category: "astrology",
      },
      {
        id: 2,
        title: "Fitness Mission",
        description: "Bike for 30 minutes.",
        category: "fitness",
      },
      {
        id: 3,
        title: "Exploration Mission",
        description: "Hike any local trail.",
        category: "exploration",
      },
    ],
    weeklyMission: {
      id: 1,
      title: "Weekly Mission",
      description: "Climb a total of 1000 meters elevation.",
      category: "gold",
    },
  });

  const missionCategoryColors = {
    fitness: "bg-blue-500",
    exploration: "bg-green-500",
    astrology: "bg-purple-500",
    gold: "bg-yellow-400",
  };

  // Get all current missions for the user
  const { loading, error, data } = useQuery(GET_USER_MISSION);
  const currentMissions = data?.getAllCurrentMissions;

  //   TODO: Update with a funFact API or something
  return (
    <div className="flex flex-col h-screen gap-4 p-4 overflow-hidden">
      <FunFact />
      <LeaderBoard />
      <div style={{ height: "15vh" }}>
        <MissionCard
          title={missions.weeklyMission.title}
          description={missions.weeklyMission.description}
          categoryColor={missionCategoryColors[missions.weeklyMission.category]}
        />
      </div>

      <div className="overflow-y-auto" style={{ height: "calc(45vh - 4rem)" }}>
        <h2 className="text-lg font-bold">Daily Missions</h2>
        <div className="space-y-2">
          {missions.dailyMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              title={mission.title}
              description={mission.description}
              categoryColor={missionCategoryColors[mission.category]}
            />
          ))}
        </div>
      </div>

      <div className="overflow-y-auto" style={{ height: "calc(35vh - 4rem)" }}>
        <h2 className="text-lg font-bold">My Triggered Missions</h2>
        <div className="space-y-2">
          {currentMissions &&
            currentMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.name}
                description={mission.points + " points"}
                categoryColor={missionCategoryColors["gold"]}
                missionId={mission.id}
              />              
            ))}
        </div>
      </div>
      <div>
        <TriggerMyMission />
      </div>
    </div>
  );
};

export default Home;
