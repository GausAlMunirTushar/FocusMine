import { AppLayout } from "@/components/app-layout";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return <AppLayout>{children}</AppLayout>;
};

export default DashboardLayout;
