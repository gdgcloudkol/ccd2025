import React from "react";

const Points = ({ games = [] }) => {

  return <div className="py-4 text-center">
  <h3 className="text-lg sm:text-xl font-medium mb-4">Points</h3>
  <p className="text-sm text-muted-foreground">
    Something cool is coming soon! <br/>
 
  </p>
</div>
  // Default data if no games provided
  // const defaultGames = [
  //   {
  //     id: 1,
  //     name: "Game Name",
  //     position: "29th Position",
  //     points: 404,
  //     rank: 29,
  //   },
  //   {
  //     id: 2,
  //     name: "Game Name",
  //     position: "1st Position",
  //     points: 404,
  //     rank: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "Game Name",
  //     position: "2nd Position",
  //     points: 404,
  //     rank: 2,
  //   },
  //   {
  //     id: 4,
  //     name: "Game Name",
  //     position: "3rd Position",
  //     points: 404,
  //     rank: 3,
  //   },
  // ];

  // const gameData = games.length > 0 ? games : defaultGames;

  // const getMedalImage = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return "/images/profile/Medal1.svg"; // Gold medal
  //     case 2:
  //       return "/images/profile/Medal2.svg"; // Silver medal
  //     case 3:
  //       return "/images/profile/Medal3.svg"; // Bronze medal
  //     default:
  //       return "/images/profile/Medal4.svg"; // Default medal
  //   }
  // };

  // return (
  //   <div className="w-full">
  //     <div className="rounded-lg overflow-hidden border border-border">
  //       {gameData.map((game, index) => (
  //         <div
  //           key={game.id}
  //           className={`flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors ${
  //             index !== gameData.length - 1 ? "border-b border-border" : ""
  //           }`}
  //         >
  //           {/* Left side - Medal icon and game info */}
  //           <div className="flex items-center gap-4">
  //             <div className="w-9 h-9 flex items-center justify-center">
  //               <img
  //                 src={getMedalImage(game.rank)}
  //                 alt={`Rank ${game.rank} medal`}
  //                 className="w-7 h-7"
  //               />
  //             </div>
  //             <div>
  //               <h3 className="font-medium text-foreground">{game.name}</h3>
  //               <p className="text-xs text-muted-foreground">{game.position}</p>
  //             </div>
  //           </div>

  //           {/* Right side - Points with coin icon */}
  //           <div className="flex items-center gap-2 bg-[#FFFBC6] px-3 py-1 rounded-full">
  //             <div className="w-5 h-5 flex items-center justify-center">
  //               <img
  //                 src="/images/profile/prize.svg"
  //                 alt="Prize"
  //                 className="w-4 h-4"
  //               />
  //             </div>
  //             <span className="text-sm font-bold text-[#856600]">
  //               {game.points}
  //             </span>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Points;
