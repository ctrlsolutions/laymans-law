"use client";
import React, { useState, useEffect } from "react";

export default function LawyerHomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full h-full bg-blue flex flex-col flex-wrap justify-between content-between">
        LAWYER SETTINGS
        {children}
      </div>
    </div>
  )
}