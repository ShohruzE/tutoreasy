"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TutoringSession } from "@prisma/client";
import { motion } from "framer-motion";

type MostRecentTutoringSessionsProps = {
  tutoringSessions: TutoringSession[];
};

export default function MostRecentTutoringSessions({
  tutoringSessions,
}: MostRecentTutoringSessionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="min-h-[200px] max-h-[700px]">
        <CardHeader>
          <CardTitle>Most Recent Tutoring Sessions</CardTitle>
          <CardDescription>
            View the top 10 most recent tutoring sessions for all of your
            classes.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] overflow-y-auto border-y-[1px] border-gray-300">
          {tutoringSessions.map((session) => (
            <div
              key={session.sessionId}
              className="flex justify-between p-2 border-b border-gray-200"
            >
              <div>
                <p className="font-bold">{session.classTutored}</p>
                <p>{session.classSection}</p>
              </div>
              <div>
                <p>{session.sessionStartTime.toDateString()}</p>
                <p>{session.sessionLocation}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end py-6">
          <Link
            href="/dashboard/tutoring-sessions"
            className="text-sm font-semibold text-secondary-green decoration-solid hover:underline"
          >
            View All Tutoring Sessions
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
