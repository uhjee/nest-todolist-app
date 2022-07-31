import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@utils/DateTimeUtil';
import { ValueTransformer } from 'typeorm';

// queryBuilder 사용 시, transformer 동작하지 않는다. 따라서 Date 변환 후 where절 적용 필요
export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
