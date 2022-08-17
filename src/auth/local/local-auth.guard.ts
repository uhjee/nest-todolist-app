import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * local strategy 사용해 로그인 시 사용하는 가드
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = context.switchToHttp().getRequest();
      // local strategy 갔다가 로그인되면 serialize User로 이동
      await super.logIn(request);
    }
    return true;
  }
}
