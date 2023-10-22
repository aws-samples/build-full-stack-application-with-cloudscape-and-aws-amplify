// ui
import React, { useState } from "react";
import { SideNavigation, TopNavigation } from "@cloudscape-design/components";

// components
import { Auth } from 'aws-amplify';

export function NavigationBar ({activeHref, setActiveHref}) {
  const [email, setEmail] = useState('User');
  getUserInfo().then((user) => setEmail(user.attributes.email));

  const itemClickHandler = (e) => {
    e.preventDefault();
    if (e.detail.id === "signout") {
      signOut();
    }
    else if (e.detail.id === "profile") {
      setActiveHref(e.detail.href);
    }
  };

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
    }
    catch (err) {
      console.log('error signing out: ', err);
    }
  }

  async function getUserInfo() {
    try {
      return Auth.currentUserInfo();
    }
    catch (err) {
      console.log('error when getting user info: ', err);
    }
  }

  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "AWS reInvent Builders",
      }}
      utilities={[
        {
          type: "menu-dropdown",
          text: email,
          description: "",
          iconName: "user-profile",
          onItemClick: itemClickHandler,
          items: [
            {
              id: "menu-group",
              text: "Service",
              items: [
                { id: "profile", text: "Profile", href: "#/profile", },
              ]
            },
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
  );
}

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
