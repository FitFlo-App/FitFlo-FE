import { useState } from "react";
import { FaMars, FaVenus, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaRulerVertical, FaWeight, FaNotesMedical } from "react-icons/fa";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Marzuli Suhada M",
    email: "marzuli@example.com",
    phone: "+62 812-3456-7890",
    location: "Bandung, Indonesia",
    gender: "male", 
    birthdate: "2000-05-15",
    height: "175 cm",
    weight: "68 kg",
    medicalHistory: "No known allergies or chronic illnesses",
    avatar: "src/assets/avatar.jpg",
  });

  const [editData, setEditData] = useState<typeof user>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const fields = [
    [{ key: "name", icon: <FaUser className="text-blue-500 text-2xl" />, fullWidth: false },
     { key: "email", icon: <FaEnvelope className="text-green-500 text-2xl" /> },
     { key: "phone", icon: <FaPhone className="text-purple-500 text-2xl" /> }],
    [{ key: "location", icon: <FaMapMarkerAlt className="text-red-500 text-2xl" /> },
     { key: "gender", icon: user.gender === "male" ? <FaMars className="text-blue-500 text-2xl" /> : <FaVenus className="text-pink-500 text-2xl" /> },
     { key: "birthdate", icon: <FaBirthdayCake className="text-orange-500 text-2xl" /> }],
    [{ key: "height", icon: <FaRulerVertical className="text-indigo-500 text-2xl" /> },
     { key: "weight", icon: <FaWeight className="text-teal-500 text-2xl" /> }],
    [{ key: "medicalHistory", icon: <FaNotesMedical className="text-gray-500 text-2xl" />, fullWidth: true }]
  ];

  return (
    <AppLayout>
        <div className="flex-1 flex justify-center items-center p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl rounded-lg p-8 relative"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Edit Profile
            </button>
            <div className="flex flex-col items-center gap-6">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <img
                  src={user.avatar}
                  alt="Profile Picture"
                  className="w-32 h-32 object-cover rounded-full border-4 border-primary shadow-lg"
                />
              </motion.div>
              {!isEditing ? (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full space-y-4">
                  {fields.map((row, rowIndex) => (
                    <div key={rowIndex} className={`grid gap-4 ${row[0].fullWidth ? "grid-cols-1" : "grid-cols-3"}`}>
                      {row.map(({ key, icon, fullWidth }) => (
                        <div key={key} className={`p-4 rounded-lg shadow-md flex items-center bg-gray-50 ${fullWidth ? "col-span-3" : ""}`}>
                          {icon}
                          <div className="ml-4">
                            <span className="text-gray-700 font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                            <p className="text-gray-600 mt-1">{user[key as keyof typeof user]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="w-full space-y-4">
                  {fields.map((row, rowIndex) => (
                    <div key={rowIndex} className={`grid gap-4 ${row[0].fullWidth ? "grid-cols-1" : "grid-cols-3"}`}>
                      {row.map(({ key, fullWidth }) => (
                        <div key={key} className={fullWidth ? "col-span-3" : ""}>
                          <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                          <input
                            type="text"
                            name={key}
                            value={editData[key as keyof typeof editData]} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition-transform hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
    </AppLayout>
  );
};

export default Profile;