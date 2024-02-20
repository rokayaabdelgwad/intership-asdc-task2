// async updateUser(
//     @Query() userEmail: UserIdentifierObject,
//     @Body() dto: UpdateUserDto,
//     @GetUser() user: User,
//     
// ) {
//     const { ...bodyData } = dto;

//     const theUser = await this.userService.getUserByEmail(userEmail.asdc_client_user_email);

//     if (theUser.id != user.asdc_client_id) {
//         throw new CustomBadRequestException('the user does not exist in this client');
//     }

//     const addedUser = await this.userService.updateUser(theUser, bodyData);

//     return sucessfulResponse(addedUser);
// }