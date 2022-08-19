import { User } from '../application/entity/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserWithoutPasswordDto } from '../application/dto/user-without-password.dto';
import { UpdateUserRequestDto } from './request/update-user-request.dto';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@UseGuards(AuthGuard())
@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'userId로 유저를 조회한다.',
  })
  @ApiParam({ name: 'id', description: 'User의 Id', required: true })
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: '모든 유저의 정보를 조회한다.' })
  @Get()
  async getAllUsers(): Promise<UserWithoutPasswordDto[]> {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: '유저의 정보를 수정한다.' })
  @ApiParam({ name: 'id', description: 'User의 Id', required: true })
  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserWithoutPasswordDto> {
    return await this.usersService.updateUser(id, updateUserRequestDto);
  }

  @ApiOperation({ summary: 'user Id로 유저를 삭제한다.' })
  @ApiParam({ name: 'id', description: 'User의 Id', required: true })
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.usersService.deleteUserById(id);
  }
}
