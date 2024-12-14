import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UserModule } from './controllers/user/user.module'
import { GymModule } from './controllers/gym/gym.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, UserModule, GymModule],
})
export class HttpModule {}
