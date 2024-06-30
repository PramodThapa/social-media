import { FollowAction } from '@/interfaces/users/relation';
import { IsNotEmpty } from 'class-validator';

export class FollowDto {
  @IsNotEmpty({ message: 'Follower id is required.' })
  readonly followerId: string;

  @IsNotEmpty({ message: 'Followee id is required.' })
  readonly followeeId: string;

  @IsNotEmpty()
  readonly action: FollowAction;
}
