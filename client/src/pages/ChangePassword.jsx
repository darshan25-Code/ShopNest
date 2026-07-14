import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/userApi";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert(res.data.message);

      navigate("/profile");

    } catch (error) {
      alert(
        error.response?.data?.message || "Password change failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <label className="block mb-2 font-medium">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm New Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {loading ? "Changing Password..." : "Change Password"}
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;