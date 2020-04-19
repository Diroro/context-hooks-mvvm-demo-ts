import { distinctUntilChanged, share, switchMap } from "rxjs/operators";
import { pipe } from "fp-ts/lib/pipeable";
import { LiveData } from "@devexperts/rx-utils/dist/live-data.utils";
import { Sink, newSink } from "@devexperts/rx-utils/dist/sink2.utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { UserService } from "../services/user.service";
import { Subject, merge } from "rxjs";

interface UserProfileViewModel {
  readonly name: LiveData<Error, string>;
  readonly updateName: (name: string) => void;
}

export interface NewUserProfileViewModel {
  (id: string): Sink<UserProfileViewModel>;
}

export const newUserProfileViewModel = context.combine(
  context.key<UserService>()("userService"),
  (userService): NewUserProfileViewModel => (id) => {
    const updateNameSubject = new Subject<string>();
    const updateName = (name: string) => updateNameSubject.next(name);

    const updateNameEffect = updateNameSubject.pipe(
      switchMap((name) => userService.updateUserName(id, name))
    );

    const getUserNameOnUpdateEffect = pipe(
      updateNameSubject,
      distinctUntilChanged(),
      switchMap((name) => userService.getUserName(id)),
      share()
    );

    const effects = merge(updateNameEffect, getUserNameOnUpdateEffect);
    return newSink(
      {
        name: userService.getUserName(id),
        updateName,
      },
      effects
    );
  }
);
