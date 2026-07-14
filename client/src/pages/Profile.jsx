import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../api/userApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="space-y-5">

        <div>
          <p className="text-gray-500">Name</p>
          <h2 className="text-xl font-semibold">
            {user.name}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h2 className="text-xl font-semibold">
            {user.email}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Role</p>
          <h2 className="text-xl font-semibold capitalize">
            {user.role}
          </h2>
        </div>

      </div>

      <div className="flex gap-4 mt-10">

        <Link
          to="/edit-profile"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Edit Profile
        </Link>

        <Link
          to="/change-password"
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Change Password
        </Link>

      </div>

    </div>
  );
};

export default Profile;