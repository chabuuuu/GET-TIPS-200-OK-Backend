import { ActionTypeEnum } from '@/enums/action-type.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TrackingDataDto {
  @IsNotEmpty()
  type!: ActionTypeEnum;

  @IsNotEmpty()
  post_id!: string;

  @IsOptional()
  scrollDepth?: string;

  @IsOptional()
  viewTime?: string;

  timestamp?: string;
}
