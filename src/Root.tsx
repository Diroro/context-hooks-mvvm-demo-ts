import React, { memo } from "react";
import { useSink } from "./utils/utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { userService } from "./services/user.service";
import { AppContainer } from "./containers/App.container";

const Root = context.combine(
  context.defer(AppContainer, "userService"),
  userService,
  (getAppContainer, userService) =>
    memo(() => {
      const AppContainer = useSink(() => getAppContainer({ userService }), []);
      return <AppContainer />;
    })
);

export { Root };
