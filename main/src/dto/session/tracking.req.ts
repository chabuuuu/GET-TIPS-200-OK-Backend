import { ActionTypeEnum } from '@/enums/action-type.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TrackingReq {
  @IsNotEmpty()
  type!: ActionTypeEnum;

  @IsNotEmpty()
  post_id!: string;

  @IsOptional()
  scrollDepth?: number;

  @IsOptional()
  viewTime?: number;
}
