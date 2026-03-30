"use client";

import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	ChevronDown,
	Plus,
	Settings,
	Users,
	Building,
} from "lucide-react";

interface Organization {
	id: string;
	name: string;
	type: "personal" | "team" | "company";
	members?: number;
}

interface OrganizationSwitcherProps {
	currentOrgId?: string;
	onSwitch?: (orgId: string) => void;
}

const defaultOrganizations: Organization[] = [
	{
		id: "1",
		name: "Personal Workspace",
		type: "personal",
	},
	{
		id: "2",
		name: "Development Team",
		type: "team",
		members: 5,
	},
	{
		id: "3",
		name: "Design Team",
		type: "team",
		members: 3,
	},
];

export function OrganizationSwitcher({
	currentOrgId = "1",
	onSwitch,
}: OrganizationSwitcherProps) {
	const [organizations, setOrganizations] = useState<Organization[]>(
		defaultOrganizations
	);
	const [open, setOpen] = useState(false);

	const currentOrg =
		organizations.find((org) => org.id === currentOrgId) ||
		organizations[0];

	const handleSwitch = (orgId: string) => {
		onSwitch?.(orgId);
		setOpen(false);
	};

	const getOrgIcon = (type: string) => {
		switch (type) {
			case "personal":
				return <Users className="h-4 w-4" />;
			case "team":
				return <Users className="h-4 w-4" />;
			case "company":
				return <Building className="h-4 w-4" />;
			default:
				return <Users className="h-4 w-4" />;
		}
	};

	const getOrgInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="w-full justify-between h-12 px-3 hover:bg-accent"
				>
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8">
							<AvatarFallback
								className={`text-xs ${
									currentOrg.type === "personal"
										? "bg-primary text-primary-foreground"
										: "bg-secondary text-secondary-foreground"
								}`}
							>
								{getOrgInitials(currentOrg.name)}
							</AvatarFallback>
						</Avatar>
						<div className="text-left">
							<p className="text-sm font-medium">
								{currentOrg.name}
							</p>
							{currentOrg.members && (
								<p className="text-xs text-muted-foreground">
									{currentOrg.members} members
								</p>
							)}
						</div>
					</div>
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" align="start">
				<DropdownMenuLabel>
					Switch Organization
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{organizations.map((org) => (
					<DropdownMenuItem
						key={org.id}
						onClick={() => handleSwitch(org.id)}
						className="flex items-center gap-3 cursor-pointer"
					>
						<Avatar className="h-8 w-8">
							<AvatarFallback
								className={`text-xs ${
									org.type === "personal"
										? "bg-primary text-primary-foreground"
										: "bg-secondary text-secondary-foreground"
								}`}
							>
								{getOrgInitials(org.name)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="text-sm font-medium">{org.name}</p>
							{org.members && (
								<p className="text-xs text-muted-foreground">
									{org.members} members
								</p>
							)}
						</div>
						{org.id === currentOrgId && (
							<Badge variant="secondary" className="text-xs">
								Active
							</Badge>
						)}
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer">
					<Plus className="h-4 w-4 mr-2" />
					Create Organization
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">
					<Settings className="h-4 w-4 mr-2" />
					Manage Organizations
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
