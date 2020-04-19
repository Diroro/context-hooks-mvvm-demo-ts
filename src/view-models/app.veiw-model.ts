import { LiveData } from "@devexperts/rx-utils/dist/live-data.utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";
import { UserService } from "../services/user.service";

export interface AppViewModel {
  readonly userIds: LiveData<Error, string[]>;
}

export interface NewAppViewModel {
  (): AppViewModel;
}

export const newAppViewModel = context.combine(
  context.key<UserService>()("userService"),
  (userService): NewAppViewModel => () => ({
    userIds: userService.getAllUserIds(),
  })
);
