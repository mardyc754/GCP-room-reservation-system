import { Global, Module } from '@nestjs/common';
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './drizzle.module-definition';
import { DatabaseOptions } from './databaseOptions';
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: async (databaseOptions: DatabaseOptions) => {
        const connector = new Connector();

        const clientOpts = await connector.getOptions({
          instanceConnectionName:
            'gcp-room-reservation-system:europe-west1:room-reservation-db',
          ipType: IpAddressTypes.PUBLIC,
        });

        return new Pool({
          ...clientOpts,
          // connectionString: databaseOptions.connectionString,
          host: databaseOptions.host,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
          port: databaseOptions.port,
          // user: 'db_user',
          // password: 'db_password',
          // database: 'room-reservation-db',
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
