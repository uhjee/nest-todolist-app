import { ResponseEntity } from '@entity/common/res/response.entity';
import { ResponseStatus } from '@entity/common/res/response.status.enum';
import { User } from '@entity/domain/user.entity';
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
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@UseGuards(AuthGuard())
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
  async getAllUsers(): Promise<ResponseEntity<GetUserDto[]>> {
    return ResponseEntity.OK_WITH(await this.usersService.getAllUsers());
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
