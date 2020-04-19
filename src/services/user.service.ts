import { LiveData, liveData } from "@devexperts/rx-utils/dist/live-data.utils";
import { context } from "@devexperts/rx-utils/dist/context2.utils";

export interface UserService {
  readonly getAllUserIds: () => LiveData<Error, string[]>;
  readonly getUserName: (id: string) => LiveData<Error, string>;
  readonly updateUserName: (id: string, name: string) => LiveData<Error, void>;
}

export const userService = context.combine(
  context.key<string>()("apiURL"),
  (apiURL) => {
    const getAllUserIds = () => liveData.of<Error, string[]>(["1", "2", "3"]);

    const getUserName = (id: string) =>
      liveData.of<Error, string>(`USER NAME: ${id}`);

    const updateUserName = (id: string, name: string) =>
      liveData.of<Error, void>(console.log("UPDATE USER NAME: ", id, name));

    return {
      getAllUserIds,
      getUserName,
      updateUserName,
    };
  }
);
