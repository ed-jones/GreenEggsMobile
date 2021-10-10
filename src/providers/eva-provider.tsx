import React, { FC } from 'react';
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import Theme from "../theme/theme.json";
import Mapping from "../theme/mapping.json";

export const EvaProvider: FC = ({ children }) => {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...Theme }}
        customMapping={Mapping}
      >
        {children}
      </ApplicationProvider>
    </>
  );
}
