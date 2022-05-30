export function authLogin() {
  return {
    url: `auth/signin`,
    method: "POST",
  };
}
export function userLogin() {
  return {
    url: `auth/user/signin`,
    method: "POST",
  };
}
export function authChangePassword(token) {
  return {
    url: `auth/updatePassword`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function authAddAdmin(token) {
  return {
    url: `auth/addAdmin`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function authManageProfile(token) {
  return {
    url: `auth/manageprofile`,
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  };
}
export function getLeaves(token) {
  return {
    url: `leaves/getLeaves`,
    method: "GET",
    headers: {
      token: `${token}`,
    },
  };
}
export function getMyLeaves(token) {
  return {
    url: `leaves/getMyLeaves`,
    method: "GET",
    headers: {
      token: `${token}`,
    },
  };
}
export function updateLeave(token, id) {
  return {
    url: `leaves/updateLeave/${id}`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function addLeave(token) {
  return {
    url: `leaves/addLeave`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function addStudents(token, id) {
  return {
    url: `leaves/updateLeave/${id}`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}

export function userSignup() {
  return {
    url: `auth/signup`,
    method: "POST",
  };
}

export function getCourses() {
  return {
    url: `course/getCourses`,
    method: "GET",
  };
}
export function authUpdateCourse(token, id) {
  return {
    url: `/course/auth/updateCourse/${id}`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function addCourse(token) {
  return {
    url: `/course/auth/addCourse`,
    method: "POST",
    headers: {
      token: `${token}`,
    },
  };
}
export function applyCourse() {
  return {
    url: `/course/applyCourse`,
    method: "POST",
  };
}
export function getForms(token) {
  return {
    url: `/course/students`,
    method: "GET",
    headers: {
      token: `${token}`,
    },
  };
}
