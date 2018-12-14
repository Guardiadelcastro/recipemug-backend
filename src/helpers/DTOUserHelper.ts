import { ModelIUsers, DTOUser } from "../models/user";

export function toModelArray(usersDocument: ModelIUsers[]) {
  let DTOUsers: DTOUser[] = [];

  usersDocument.forEach(user => {
    let UserToDTO: DTOUser = {
      ...user.toObject(),
      uuid: user._id 
    }
    delete UserToDTO['_id'];
    delete UserToDTO['__v'];
    DTOUsers.push(UserToDTO);
  });

  return DTOUsers;

}