import React, { memo } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import { RemoteData } from "@devexperts/remote-data-ts";
import { renderRemoteData } from "../utils/utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { UserProfileContainer } from "../containers/UserProfile.container";

interface AppProps {
  readonly userIds: RemoteData<Error, string[]>;
}

export const App = context.combine(
  UserProfileContainer,
  (UserProfileContainer) =>
    memo((props: AppProps) =>
      pipe(
        props.userIds,
        renderRemoteData((ids) => (
          <div>
            {ids.map((id) => (
              <UserProfileContainer key={id} id={id} />
            ))}
          </div>
        ))
      )
    )
);
