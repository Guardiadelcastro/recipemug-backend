"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toModel(usersDocument) {
    let DTOUsers = [];
    usersDocument.forEach(user => {
        let UserToDTO = Object.assign({}, user.toObject(), { uuid: user._id });
        delete UserToDTO['_id'];
        delete UserToDTO['__v'];
        DTOUsers.push(UserToDTO);
    });
    return DTOUsers;
}
exports.toModel = toModel;
//# sourceMappingURL=DTOUserHelper.js.map