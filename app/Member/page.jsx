import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member"); //if they do login than this callbackurl will autmoatically send them to member page
  }
  return (
    <div>
      {" "}
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
    </div>
  );
};

export default Member;
