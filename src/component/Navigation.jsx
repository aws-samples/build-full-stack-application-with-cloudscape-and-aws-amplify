// ui
import React from "react";
import { SideNavigation } from "@cloudscape-design/components";

export function Navigation ({activeHref, setActiveHref, isAdmin}) {
  const menu = isAdmin ? [
    { type: "link", text: "Community", href: "#/community" },
    { type: "link", text: "Contents", href: "#/catalog" },
    { type: "link", text: "Profile", href: "#/profile" },
    { type: "link", text: "Admin", href: "#/admin" },
  ] : [
    { type: "link", text: "Community", href: "#/community" },
    { type: "link", text: "Contents", href: "#/catalog" },
    { type: "link", text: "Profile", href: "#/profile" },
  ];

  return (
    <SideNavigation
      activeHref={activeHref}
      onFollow={e => {
        e.preventDefault();
        setActiveHref(e.detail.href);
      }}
      items={menu}
    />
  );
}
