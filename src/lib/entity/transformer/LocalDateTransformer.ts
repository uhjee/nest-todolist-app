import { LocalDate } from 'js-joda';
import { DateTimeUtil } from 'src/util/DateTimeUtil';
import { ValueTransformer } from 'typeorm';

export class LocalDateTransformer implements ValueTransformer {
  // entity -> db로 넣을때
  to(entityValue: LocalDate): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity로 가져올때
  from(databaseValue: Date): LocalDate {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
