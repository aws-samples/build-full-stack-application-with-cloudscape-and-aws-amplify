// ui
import React, { useRef } from 'react';
import "@cloudscape-design/global-styles/index.css"
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AppLayout, ContentLayout, Header } from "@cloudscape-design/components";

// components
import { Admin } from './component/Admin';
import { Chat } from './component/Chat';
import { Catalog } from './component/Catalog';
import { NavigationBar } from './component/NavigationBar';
import { Navigation } from './component/Navigation';
import { Profile } from './component/Profile';

function App({ signOut, user }) {
  const appLayout = useRef();
  const [activeHref, setActiveHref] = React.useState("#/profile");
  const groups = user.signInUserSession.idToken.payload["cognito:groups"];

  return (
    <>
      <NavigationBar activeHref={activeHref} setActiveHref={setActiveHref} />
      <AppLayout
        ref={appLayout}
        navigation={<Navigation activeHref={activeHref} setActiveHref={setActiveHref} isAdmin={groups !== undefined && groups.includes("admin")} />}
        content={
          <ContentLayout header={<Header variant="h1" />}>
            {
              {
                "#/community" : <Chat />,
                "#/catalog" : <Catalog user={user.username} />,
                "#/profile" : <Profile user={user.username} />,
                "#/admin" : <Admin user={user.username} />,
              }[activeHref]
            }
          </ContentLayout>
        }
      />
    </>
  );
}

export default withAuthenticator(App);
