import { ResponseEntity } from '@common/res/response.entity';
import { ResponseStatus } from '@common/res/response.status.enum';
import { User } from '@entity/domain/todo/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    type: ResponseEntity<GetUserDto | string>,
  })
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
  async getAllUsers(): Promise<ResponseEntity<User[]>> {
    return ResponseEntity.OK_WITH(await this.usersService.getAllUsers());
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.createUser(createUserDto);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.debug(error);
      return ResponseEntity.ERROR_WITH(
        error.message,
        ResponseStatus.SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.usersService.updateUser(id, updateUserDto);
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
