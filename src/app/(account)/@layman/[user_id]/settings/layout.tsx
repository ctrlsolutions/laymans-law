"use client";
import React, { useState, useEffect } from "react";

export default function LaymanHomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full h-full bg-blue flex flex-col flex-wrap justify-between content-between">
        LAYMAN SETTINGS
        {children}
      </div>
    </div>
  )
}