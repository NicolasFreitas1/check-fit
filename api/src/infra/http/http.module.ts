import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { UserModule } from './controllers/user/user.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, UserModule],
})
export class HttpModule {}
