import React, { memo, useMemo } from "react";
import { pending } from "@devexperts/remote-data-ts";
import { useObservable } from "../utils/utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { newAppViewModel } from "../view-models/app.veiw-model";
import { App } from "../components/App.component";

export const AppContainer = context.combine(
  App,
  newAppViewModel,
  (App, newAppViewModel) =>
    memo(() => {
      const vm = useMemo(() => newAppViewModel(), []);
      const userIds = useObservable(vm.userIds, pending);

      return <App userIds={userIds} />;
    })
);
