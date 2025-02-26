"use client";

import { AuthContext } from "@/Provider/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface UserData {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  phone?: string;
  address?: string;
  zipcode?: string;
  country?: string;
  timestamp: number;
}

const ProfilePage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8000/users/${email}`)
        .then((res) => res.json())
        .then((userData: UserData) => {
          setData(userData);
          setFormData(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!data) return;

    fetch(`http://localhost:8000/users/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);
        setEditMode(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const calculateCompletion = () => {
    if (!data) return 0;
    let fieldsFilled = 2; // Email & Name always available
    if (data.phone) fieldsFilled++;
    if (data.address) fieldsFilled++;
    if (data.zipcode) fieldsFilled++;
    if (data.country) fieldsFilled++;
    return (fieldsFilled / 6) * 100;
  };

  const profileCompletion = Math.round(calculateCompletion());

  return (
    <div className="flex overflow-hidden justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      {/* Confetti Effect When 100% */}
      {profileCompletion === 100 && <Confetti width={width} height={height} />}

      <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-lg relative overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditMode(!editMode)}
        >
          <Pencil size={20} />
        </button>
        <CardContent className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={formData.photo || data?.photo || "/placeholder.png"}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-gray-300"
            />
          </div>
          <h2 className="text-xl font-semibold">{data?.name || "Loading..."}</h2>
          <p className="text-gray-500">{data?.email || "Loading..."}</p>
          <p className="text-gray-600">Role: {data?.role || "Loading..."}</p>

          {/* Progress Bar */}
          <div className="mt-4 relative">
            <Progress value={profileCompletion} className="h-2 bg-gray-300" />
            <p className="text-sm text-gray-500 mt-1">
              Profile Completion: {profileCompletion}%
            </p>

            {/* 🔥 Fire Animation When 100% Complete */}
            <AnimatePresence>
              {profileCompletion === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                >


                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 space-y-3">
            <Input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="bg-gray-100"
            />
            <Input
              name="address"
              placeholder="Address"
              value={formData.address || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="bg-gray-100"
            />
            <Input
              name="zipcode"
              placeholder="Zip Code"
              value={formData.zipcode || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="bg-gray-100"
            />
            <Input
              name="country"
              placeholder="Country"
              value={formData.country || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className="bg-gray-100"
            />
          </div>
          {editMode && (
            <Button className="mt-4 w-full bg-blue-500" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
