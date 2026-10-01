"use client";

import dynamic from "next/dynamic";

const DeveloperWorld = dynamic(() => import("./DeveloperWorld"), {
  ssr: false,
  loading: () => <div className="w-full h-[430px] sm:h-[500px]" />,
});

export default DeveloperWorld;
