"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { LucideIcon, HomeIcon, Building2, Table, Banknote } from "lucide-react";

type SubLinks = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};
type LinkType = {
  title: string;
  href: string;
  sublinks?: SubLinks[];
};
const links: LinkType[] = [
  {
    title: "Fundamental",
    href: "/fundamental",
    sublinks: [
      {
        title: "main",
        href: "/",
        description: "main fundamental page",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Analysis",
    href: "/analysis",
    sublinks: [
      {
        href: "/dcf",
        title: "Discounted Cash Flow",
        description: "Discounted Cash Flow Analysis",
        icon: Banknote,
      },
      {
        href: "/reits",
        title: "Reits",
        description: "reits analysis page",
        icon: Building2,
      },
      {
        href: "/reits/compare",
        title: "Reits Compare",
        description: "reits compare analysis page",
        icon: Table,
      },
    ],
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    title: "Transaction",
    href: "/transaction",
  },
  {
    title: "Me",
    href: "/me",
  },
  {
    title: "cook",
    href: "/cook",
  },
];

const NavigationLink = ({ link }: { link: LinkType }) => {
  if (link.sublinks) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {link.sublinks.map((l, idx) => (
              <li key={idx}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href + l.href}
                    className="flex items-center space-x-4 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <l.icon />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {l.title}
                      </p>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {l.description}
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={link.href}>{link.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MiddleNav = () => {
  return (
    <>
      <NavigationMenu className="flex gap-x-12">
        <NavigationMenuList>
          {links.map((l, index) => (
            <NavigationLink link={l} key={l.title + index} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MiddleNav;
