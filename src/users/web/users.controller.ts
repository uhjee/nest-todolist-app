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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from '../application/dto/get-user.dto';
import { UpdateUserRequestDto } from './request/update-user-request.dto';
import { UsersService } from '../application/users.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseEntity } from '@common/entity/res/response.entity';
import { ResponseStatus } from '@common/entity/res/response.status.enum';

@ApiTags('User')
@UseGuards(AuthGuard())
@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseEntity<User | string>> {
    try {
      const user = await this.usersService.getUserById(id);
      return ResponseEntity.OK_WITH(user);
    } catch (error) {
      this.logger.debug(error);

      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllUsers(): Promise<ResponseEntity<GetUserDto[]>> {
    return ResponseEntity.OK_WITH(await this.usersService.getAllUsers());
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.updateUser(id, updateUserRequestDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.deleteUserById(id);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }
}
