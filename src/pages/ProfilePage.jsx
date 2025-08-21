// /src/pages/ProfilePage.jsx

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { getQuota } from "../utils/quota";
import api from "../api/axios"; // for delete

export default function ProfilePage() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const quota = getQuota();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Delete your account and all content?");
    if (!confirm) return;

    try {
      await api.delete("/users/me?purge=1");
      dispatch(logout());
    } catch (e) {
      alert("Delete failed.");
    }
  };

  if (!user) return <p className="text-center mt-4">Not logged in.</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 px-4 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <p className="mb-1">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="mb-4">
        <strong>Email:</strong> {user.email}
      </p>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Today's Quota</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>Posts: {quota.unlimited ? "∞" : quota.posts || 0}/1</li>
          <li>Comments: {quota.unlimited ? "∞" : quota.comments || 0}/3</li>
          <li>DMs: {quota.unlimited ? "∞" : quota.dms || 0}/1</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
