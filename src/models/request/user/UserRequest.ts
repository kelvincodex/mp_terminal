class UserRequest {
  static CreateUpdateUserRequest = {
      userEmail: null,
      userFirstName: null,
      userLastName: null,
      userMiddleName: null,
      userPassword: null,
      userPhone: null,
      userRoleId: 0
    }

    static DeleteUserRequest = {
      userId: 0
    }

  }

  export default UserRequest