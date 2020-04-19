import React, { memo } from "react";
import { pending } from "@devexperts/remote-data-ts";
import { useSink, useObservable } from "../utils/utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { newUserProfileViewModel } from "../view-models/user-profile.view-model";
import { UserProfile } from "../components/UserProfile.component";

interface UserProfileContainerProps {
  readonly id: string;
}

export const UserProfileContainer = context.combine(
  newUserProfileViewModel,
  (newUserProfileViewModel) =>
    memo((props: UserProfileContainerProps) => {
      const vm = useSink(() => newUserProfileViewModel(props.id), [props.id]);
      const name = useObservable(vm.name, pending);

      return <UserProfile name={name} onNameUpdate={vm.updateName} />;
    })
);
