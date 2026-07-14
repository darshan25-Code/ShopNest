import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Name</span>
            <span>{user?.name}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Email</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Role</span>
            <span className="capitalize">
              {user?.role}
            </span>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            to="/profile/edit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>

          <Link
            to="/profile/change-password"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Change Password
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Profile;