import { useState } from "react";
import { X, Eye, EyeOff, Lock } from "lucide-react";
import { useUpdatePassword } from "../../hooks/useAuth";

const UpdatePasswordModal = ({ isOpen, onClose }) => {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return;
    }

    updatePassword(formData, {
      onSuccess: () => {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        onClose();
      },
    });
  };

  const PasswordInput = ({ label, name, placeholder, visible, toggle }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type={visible ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 outline-none focus:border-blue-500 bg-[#f5f7fa]"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close Button */}

        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="mb-1 text-2xl font-bold text-[#222222]">
          Update Password
        </h2>

        <p className="mb-6 text-sm text-slate-200">
          Enter your current password and choose a new one.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            placeholder="Enter current password"
            visible={show.current}
            toggle={() =>
              setShow((p) => ({
                ...p,
                current: !p.current,
              }))
            }
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
            visible={show.new}
            toggle={() =>
              setShow((p) => ({
                ...p,
                new: !p.new,
              }))
            }
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm new password"
            visible={show.confirm}
            toggle={() =>
              setShow((p) => ({
                ...p,
                confirm: !p.confirm,
              }))
            }
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={isPending}
              className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
