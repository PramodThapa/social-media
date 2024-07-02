import { FollowAction } from '@/interfaces/enum';
import { IsNotEmpty } from 'class-validator';

export class FollowDto {
  @IsNotEmpty({ message: 'Follower id is required.' })
  readonly followerId: string;

  @IsNotEmpty({ message: 'Followee id is required.' })
  readonly followeeId: string;

  @IsNotEmpty()
  readonly action: FollowAction;
}
