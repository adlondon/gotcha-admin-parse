/**
 * Checks if given user is a super admin, if user is not a super admin will return given service area or null
 * @param {object} user - user object typically returned from state
 * @return {object} payload - returns a payload with this format { isSuperAdmin: boolean, serviceArea: int }
 */
function verifyLocalAdminStatus(user) {
  let payload = {};
  if (user && user.account && user.account.type === 4) {
    payload = { isSuperAdmin: true, serviceArea: null };
  } else if (user && user.account && user.account.service_area) {
    payload = { isSuperAdmin: false, serviceArea: user.account.service_area };
  } else {
    payload = { isSuperAdmin: false, serviceArea: null };
  }
  return payload;
}

export default verifyLocalAdminStatus;
