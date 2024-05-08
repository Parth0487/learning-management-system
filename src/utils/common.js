export const getLoggedInUserDetails = () => {
  let userDetails = localStorage.getItem('userDetails');

  if (userDetails) {
    return JSON.parse(userDetails);
  } else {
    return {
      userId: null,
      userTypeCode: null,
    };
  }
};
