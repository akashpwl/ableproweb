const BaseURL = 'https://ablepro.herokuapp.com/api/v1';

export const URL = {
  signin: BaseURL + '/auth/login',
  signup: BaseURL + '/auth/signup',
  changePassword: BaseURL + '/user/changePassword',
  forgotPassword: BaseURL + '/auth/forgotPassword',
  resetPassword: BaseURL + '/auth/resetPassword',
  getUserDetails: BaseURL + '/about',
  updateUser: BaseURL + '/about',
  addNewPost: BaseURL + '/post',
  getAllPost: BaseURL + '/post',
  likePost: BaseURL + '/post/like',
  unlikePost: BaseURL + '/post/unlike',
  getFollowingsCount: BaseURL + '/user/followings-count',
  getFollowersCount: BaseURL + '/user/followers-count',
  followingsUsers: BaseURL + '/user/followings',
  notFollowingsUsers: BaseURL + '/user/not-followings',
  followUser: BaseURL + '/user/follow',
  unFollowUser: BaseURL + '/user/unfollow'
};
export const AuthURLs = [
  URL.signin,
  URL.signup,
  URL.forgotPassword,
  URL.resetPassword
];