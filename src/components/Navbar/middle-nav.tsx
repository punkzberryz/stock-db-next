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

type SubLinks = {
  title: string;
  href: string;
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
      },
      {
        title: "reits",
        href: "/reits",
      },
    ],
  },
  {
    title: "Analysis",
    href: "/analysis",
    sublinks: [
      {
        href: "/reits",
        title: "Reits",
      },
      {
        href: "/reits/compare",
        title: "Reits Compare",
      },
    ],
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
                  <Link href={link.href + l.href}>{l.title}</Link>
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
