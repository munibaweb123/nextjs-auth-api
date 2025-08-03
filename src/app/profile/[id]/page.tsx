import React from "react";

interface UserProfilePageProps {
  params: { id: string };
}

const UserProfile = async ({ params }: UserProfilePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
