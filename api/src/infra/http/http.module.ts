import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UserModule } from './controllers/user/user.module'
import { GymModule } from './controllers/gym/gym.module'
import { CheckInModule } from './controllers/check-in/check-in.module'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    UserModule,
    GymModule,
    CheckInModule,
  ],
})
export class HttpModule {}
