export enum RESPONSE_MSG {
  OK= 'Login Successful',
  NOTEMAIL= 'There is not exist this email',
  NOTCIPNUMBER= 'There is not exist this cip number',
  NOTUSERWITHCIPNUMBER= 'There is no user associated with this cip ',
  WRONGCREDENTIALS= 'Wrong credentials provided',
  NOTEMAILTORECOVER = 'User with this email does not exist',
  INCORRECTCODE = 'The code is not correct',
  CORRECTCODE = 'The code is correct',
  CHANGEPASSWORDWRONGEMAIL = 'No exist user with this email'
}
