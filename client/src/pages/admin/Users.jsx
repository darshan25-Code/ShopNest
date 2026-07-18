import { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaUserShield } from "react-icons/fa";
import {getAllUsers,deleteUser,updateUserRole,} from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Users = () => {

    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const result = users.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredUsers(result);
    }, [search, users]);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data.users);
            setFilteredUsers(res.data.users);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const res = await deleteUser(id);

            toast.success(res.data.message);

            fetchUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    const handleChangeRole = async (user) => {
        const newRole =
            user.role === "admin" ? "user" : "admin";

        try {
            const res = await updateUserRole(
                user._id,
                newRole
            );

            toast.success(res.data.message);

            fetchUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update role."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        👥 Manage Users
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage registered users.
                    </p>
                </div>

                <div className="mt-5 md:mt-0 flex items-center gap-4">

                    <div className="relative">

                        <FaSearch className="absolute left-3 top-3 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow">
                        Total Users : {filteredUsers.length}
                    </div>

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                {loading ? (
                    <h2 className="text-center text-xl py-10">
                        Loading Users...
                    </h2>
                ) : (
                    <table className="min-w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4">
                                    User
                                </th>
                                <th className="text-left px-6 py-4">
                                    Email
                                </th>
                                <th className="text-center px-6 py-4">
                                    Role
                                </th>
                                <th className="text-center px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {/* User */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {user.name}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    ID: {user._id.slice(-6)}
                                                </p>

                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-5 text-gray-700">
                                        {user.email}
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-5 text-center">
                                        {user.role === "admin" ? (
                                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">

                                                Admin
                                            </span>

                                        ) : (
                                            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                                                User
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                disabled={currentUser._id === user._id}
                                                onClick={() => handleChangeRole(user)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${currentUser._id === user._id
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-indigo-600 hover:bg-indigo-700"
                                                    }`}
                                            >
                                                <FaUserShield />
                                                {currentUser._id === user._id
                                                    ? "Current Admin"
                                                    : user.role === "admin"
                                                        ? "Make User"
                                                        : "Make Admin"}
                                            </button>
                                            <button
                                                disabled={currentUser._id === user._id}
                                                onClick={() => handleDelete(user._id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${currentUser._id === user._id
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                <FaTrash />
                                                {currentUser._id === user._id
                                                    ? "Current Admin"
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Users;