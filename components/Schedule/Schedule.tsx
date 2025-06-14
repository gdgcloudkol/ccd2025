"use client";

import { SessionRespsonse } from "@/lib/sessions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Schedule.css";

const Sessions = ({ sessions }: { sessions: SessionRespsonse[] }) => {
  const [dataIndex, setDataIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState("auto");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const dataRefs = useRef([]);

  const toggleDescription = (eventId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getTime = (_time: string): string => {
    const d = new Date(_time);
    const hour =
      d.getHours() === 0
        ? 12
        : d.getHours() > 12
        ? d.getHours() - 12
        : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const ampm = d.getHours() < 12 ? "AM" : "PM";
    const time = hour + ":" + min + " " + ampm;
    return time;
  };

  // Function to determine hall type and get appropriate styling
  const getHallInfo = (room: string) => {
    const roomLower = room?.toLowerCase() || "";
    if (roomLower.includes("hall 1") || roomLower.includes("main hall")) {
      return {
        type: "Hall 1",
        color: "bg-google-blue/10 text-foreground dark:text-white",
        borderColor: "border-google-blue",
        textColor: "text-google-blue",
        icon: "🎤",
        description: "Main Conference Hall"
      };
    } else if (roomLower.includes("hall 2") || roomLower.includes("workshop")) {
      return {
        type: "Hall 2",
        color: "bg-google-green/10 text-foreground dark:text-white",
        borderColor: "border-google-green",
        textColor: "text-google-green",

        description: "Workshop & Interactive Sessions"
      };
    } else {
      return {
        type: room || "Main Hall",
        color: "bg-muted text-muted-foreground",
        borderColor: "border-border",
        textColor: "text-muted-foreground",

        description: "General Session"
      };
    }
  };

  // Separate sessions by hall
  const separateSessionsByHall = (sessions: SessionRespsonse[]) => {
    const hall1Sessions: any[] = [];
    const hall2Sessions: any[] = [];


    sessions.forEach(sessionGroup => {
      sessionGroup.sessions.forEach(session => {
        const hallInfo = getHallInfo(session.room);
        if (hallInfo.type === "Hall 1") {
          hall1Sessions.push({ ...session, groupName: sessionGroup.groupName });
        } else if (hallInfo.type === "Hall 2") {
          hall2Sessions.push({ ...session, groupName: sessionGroup.groupName });
        } 
      });
    });

    // Add ending note to Hall 1
    const endingNote = {
      id: "ending-note",
      title: "Closing Note",
      description: "We hope you had an incredible experience at the Cloud Computing Days 2025 conference. Thank you to all our speakers, sponsors, and attendees for making this event truly special. We look forward to seeing you again next year with even more exciting sessions, workshops, and networking opportunities. Stay connected with us for updates on future events and continue the conversation on our community platforms.",
      startsAt: hall1Sessions.length > 0 ? hall1Sessions[hall1Sessions.length - 1].endsAt : "2025-01-15T18:00:00Z",
      endsAt: hall1Sessions.length > 0 ? hall1Sessions[hall1Sessions.length - 1].endsAt : "2025-01-15T18:30:00Z",
      room: "Hall 1",
      speakers: [],


    };

    hall1Sessions.push(endingNote);

    return [
      { name: "Hall 1", sessions: hall1Sessions  },
      { name: "Hall 2", sessions: hall2Sessions },
    
    ];
  };

  const hallTabs = separateSessionsByHall(sessions);

  useEffect(() => {
    const element = dataRefs.current[dataIndex] as any;
    if (element) {
      setContainerHeight(element.clientHeight);
    }
  }, [hallTabs, dataIndex]);

  const getStyle = (index: number): CSSProperties => {
    const isActive = dataIndex === index;
    const isPrev = prevIndex === index;

    let transform = "translateX(100%)";
    let opacity = 0;

    if (isActive) {
      transform = "translateX(0)";
      opacity = 1;
    } else if (isPrev) {
      transform =
        dataIndex > prevIndex ? "translateX(-100%)" : "translateX(100%)";
      opacity = 0;
    }

    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transition:
        "transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)",
      transform,
      opacity,
      pointerEvents: isActive ? "auto" : "none",
    };
  };

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Sessions Available</h3>
          <p className="text-muted-foreground">Please check back later for the updated schedule.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full max-w-7xl items-center justify-center flex flex-col lg:flex-row my-0 mx-auto gap-12'>
        <div className='w-full'>
          <div className='overflow-auto w-full'>
            <div className='h-12 min-w-full w-max border-b border-border flex my-5'>
              {hallTabs.map((hall, index) => (
                <div
                  className={cn(
                    "text-base font-medium px-6 h-full cursor-pointer relative pt-3 transition-all duration-200 hover:bg-muted",
                    dataIndex === index
                      ? "border-b-[3px] border-google-blue bg-muted/50"
                      : "hover:border-b-[2px] hover:border-google-blue/50",
                    index === dataIndex && "border-2 border-l-google-green border-t-google-red border-r-google-yellow border-b-google-blue rounded-t-md"
                  )}
                  onClick={() => {
                    setPrevIndex(dataIndex);
                    setDataIndex(index);
                  }}
                  key={`${hall.name}-${index}`}
                >
                  <span className="flex items-center gap-2">
                    {hall.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className='schedule-container'
            style={{ height: containerHeight }}
          >
            {hallTabs.map((hall, hallIndex) => (
              <div
                ref={(el: any) =>
                  (dataRefs.current[hallIndex] = el as never)
                }
                id={`fade-in-${hallIndex}`}
                style={getStyle(hallIndex)}
                key={hallIndex}
              >
                <div className='w-3/10 lg:w-1/5 lg:border-r-0 border-border flex flex-col items-end px-3 py-3 text-right lg:text-start'>
                  <div className="text-sm font-medium text-muted-foreground">
                    {hall.sessions[0]?.startsAt.split("T")[0]}
                  </div>
                </div>
                {hall.sessions?.map((event: any) => {
                  const startTime = getTime(event.startsAt);
                  const endTime = getTime(event.endsAt);
                  const hallInfo = getHallInfo(event.room);
                  const isEndingNote = event.id === "ending-note";

                  return (
                    <div className={cn(
                      'flex w-full lg:w-auto hover:bg-muted/20 transition-colors group',
                      isEndingNote && 'bg-gradient-to-r from-google-blue/5 to-google-green/5 border-l-4 border-l-google-blue'
                    )} key={event.id}>
                      <div className='w-3/10 lg:w-1/5 border-b lg:border-r-0 border-border flex flex-col items-end px-3 py-3 text-right lg:text-start'>
                        <div className='text-base lg:text-xl font-medium text-foreground'>{startTime}</div>
                        <div className='text-xs lg:text-sm font-light text-muted-foreground'>
                          {endTime}
                        </div>
                        <div className='mt-1 text-[8px] lg:text-xs text-muted-foreground'>
                          GMT (+05:30)
                        </div>
                      </div>
                      <div className='w-7/10 lg:w-4/5 flex flex-col p-3 border-b border-border grow'>
                        <div>
                          <div className={cn('text-xs px-3 py-1 mb-2 w-fit font-medium flex items-center gap-1 border rounded-full', hallInfo.color, hallInfo.borderColor)}>
                            <span>{isEndingNote ? "Closing" : hallInfo.type}</span>
                          </div>
                          <div className={cn(
                            'text-2xl font-medium text-foreground mb-2 group-hover:text-google-green dark:group-hover:text-google-yellow transition-colors',
                            isEndingNote && 'text-google-blue'
                          )}>
                            {event.title}
                          </div>
                          {event.description && (
                            <div className={cn(
                              'text-sm text-muted-foreground mt-2 leading-relaxed',
                              !expandedDescriptions.has(event.id) && 'line-clamp-3'
                            )}>
                              {event.description}
                            </div>
                          )}
                          {event.description && event.description.length > 150 && (
                            <button
                              onClick={() => toggleDescription(event.id)}
                              className="mt-2 text-sm text-google-blue hover:text-google-blue/80 font-medium transition-colors w-full text-left"
                            >
                              {expandedDescriptions.has(event.id) ? 'Read Less' : 'Read More'}
                            </button>
                          )}
                          {event.speakers && event.speakers.length > 0 && (
                            <div className='flex items-center gap-2 mt-3 flex-wrap'>
                              {event.speakers?.map((speaker: any) => {
                                return (
                                  speaker.name && (
                                    <Link href={"/speakers"} key={speaker.id}>
                                      <div className="bg-gradient-to-r from-[#ea4336] via-[#4285f4] to-[#34a853] rounded-full p-[2px]">
                                        <div className="bg-white dark:bg-background rounded-full px-3 py-1">
                                          <span className="text-xs font-medium text-black dark:text-white">
                                            {speaker.name}
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  )
                                );
                              })}
                            </div>
                          )}
                          {event.categories && event.categories.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-2'>
                              {event.categories.map((category: any) => (
                                <span
                                  key={category.id}
                                  className={cn(
                                    'text-xs px-2 py-1 rounded font-medium',
                                    isEndingNote 
                                      ? 'bg-google-blue/20 text-google-blue border border-google-blue/30' 
                                      : 'bg-muted text-muted-foreground'
                                  )}
                                >
                                  {category.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sessions; 