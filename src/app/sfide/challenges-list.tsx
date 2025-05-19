"use client";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/lib/models/challenge";
import { Building, ClockFading, Swords, Trash, Trophy } from "lucide-react";
import Image from "next/image";
import { deleteChallenge } from "./actions";
import { toast } from "sonner";

export function ChallengesList({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="flex gap-10 flex-wrap">
      {challenges.map((challenge) => (
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}

function ChallengeItem({ challenge }: { challenge: Challenge }) {
  const onDelete = async () => {
    const result = await deleteChallenge(challenge.id);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    }
  };

  return (
    <div className="p-10 rounded-lg flex flex-col gap-5 shadow-lg w-fit relative">
      <Button
        variant="ghost"
        className="absolute top-2 cursor-pointer right-2"
        onClick={onDelete}
      >
        <Trash />
      </Button>
      <div className="flex gap-10 items-center">
        <Challenger challenger={challenge.challenger} />
        <div className="flex flex-col items-center">
          {challenge.status === "pending" ? (
            <ClockFading size={30} />
          ) : challenge.status === "in_progress" ? (
            <Swords size={30} />
          ) : (
            <Trophy size={30} />
          )}
          <p className="text-sm font-bold">{challenge.target}</p>
        </div>
        <Challenger challenger={challenge.opponent} />
      </div>
      <div className="flex items-center">
        <div className="w-[50%] border-2 rounded-l-lg overflow-hidden border-r-0 h-6 border-gray-600">
          <div
            className="h-full bg-blue-400"
            style={{
              width: `${Math.min(
                (challenge.challenger.points / challenge.target) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
        <div className="h-9 max-w-[3px] min-w-[3px] bg-gray-600"></div>
        <div className="w-[50%] border-2 border-l-0 rounded-r-lg overflow-hidden h-6 border-gray-600 flex justify-end">
          <div
            className="h-full bg-blue-400"
            style={{
              width: `${Math.min(
                (challenge.opponent.points / challenge.target) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

function Challenger({ challenger }: { challenger: Challenge["challenger"] }) {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={48}
        height={48}
        alt="avatar"
        className="border-2 border-amber-400 rounded-full p-[2px]"
        src={challenger.avatar}
      />
      <h1 className="text-lg font-bold">
        {challenger.firstName} {challenger.lastName}
      </h1>
      {challenger.office && (
        <div className="flex items-center gap-1">
          <Building size={14} color="#777" />
          <p className="text-sm text-[#555]">{challenger.office.name}</p>
        </div>
      )}
      <p className="font-black text-xl">{challenger.points}</p>
    </div>
  );
}
