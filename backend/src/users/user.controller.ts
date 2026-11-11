import { Controller, Get, Req, Query, Patch, ParseIntPipe, Body, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./user.service.js";
import { FindUserDto } from "./dto/find-user-dto.js";
import { ChangeAvatarDto } from "./dto/change-avatar.dto.js";
import { FilterUserDto } from "./dto/filter-user-dto.js";
import { Status } from "./enum/status.enum.js";
import { Roles } from "../auth/decorator/roles.decorator.js";
import { RoleGuard } from "../auth/guard/auth.guard.js";
import { UpdateUserDto } from "./dto/update-user-dto.js";

@Controller('users')
@UseGuards(RoleGuard)
export class UserControllers {

    constructor(
        private readonly userService : UsersService
    ){}

    @Get()
    getUsers(@Req() req : Request & {user : any}, @Query() query : FilterUserDto) {
        return this.userService.findUsers(req.user.id, query )
    }

    @Roles(['admin'])
    @Patch("/:userId/access")
    changeAccess(@Param("userId", ParseIntPipe) userId : number,@Body() {block} : {block: boolean}) {
        if(block)
            return this.userService.update(userId, {status: Status.BLOCK})

        return this.userService.update(userId, {status: Status.ACTIVE})
    }

    @Patch("/:userId/avatar")
    changeAvatar(@Param("userId", ParseIntPipe) userId : number, @Body() changeAvatarDto : ChangeAvatarDto) {
        return this.userService.changeAvatar(userId, changeAvatarDto.avatar)
    }

    @Patch("/:userId")
    editUser (@Param("userId", ParseIntPipe) userId : number, @Body() updateUserDto : UpdateUserDto){
        return this.userService.update(userId, updateUserDto);
    }
}