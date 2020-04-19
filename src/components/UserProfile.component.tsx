import React, { memo } from "react";
import { pipe } from "fp-ts/lib/pipeable";
import { RemoteData } from "@devexperts/remote-data-ts";
import { renderRemoteData } from "../utils/utils";

interface UserProfileProps {
  readonly name: RemoteData<Error, string>;
  readonly onNameUpdate: (name: string) => void;
}

export const UserProfile = memo((props: UserProfileProps) =>
  pipe(
    props.name,
    renderRemoteData((name) => <div>{name}</div>)
  )
);
