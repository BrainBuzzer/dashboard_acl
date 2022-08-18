const permissionsConst = {
  read: "read",
  write: "write",
  comment: "comment",
};

const accessConst = {
  name_change: "NAME_CHANGE",
  user_management: "USER_MANAGEMENT",
};

const checkValidity = (permissions, access) => {
  // verify permissions
  let validPermissions = true;
  if (permissions && permissions.length > 0) {
    permissions.includes("read") || permissions.push("read");
    permissions.forEach((permission) => {
      if (!permissionsConst.hasOwnProperty(permission)) {
        validPermissions = false;
      }
    });
  } else {
    permissions = ["read"];
  }

  // verify access
  let validAccess = true;
  if (access && access.length > 0) {
    access.forEach((access) => {
      if (!accessConst.hasOwnProperty(access)) {
        validAccess = false;
      }
    });
  } else {
    access = [];
  }

  return validPermissions && validAccess;
};

module.exports = checkValidity;
