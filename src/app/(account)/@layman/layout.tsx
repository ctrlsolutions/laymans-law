"use client";

import React from "react";

export default function ProfileLayout({
    children,
    notifications,
}: {
    children: React.ReactNode;
    notifications: React.ReactNode;
}) {
  return (
    <>
      {children}
      {notifications}
    </>
  );
}
