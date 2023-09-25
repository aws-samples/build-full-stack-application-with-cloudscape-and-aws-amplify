import React, { useState } from "react";
import { Auth } from 'aws-amplify';
import TopNavigation from "@cloudscape-design/components/top-navigation";

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
