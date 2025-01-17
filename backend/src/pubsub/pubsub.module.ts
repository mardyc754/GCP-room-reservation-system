import { Module, Global } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

import { PubSubOptions } from './pubsubOptions';

import { PubSubService } from './pubsub.service';
import {
  ConfigurablePubsubModule,
  PUB_SUB,
  PUBSUB_OPTIONS,
} from './pubsub.module-definition';

@Global()
@Module({
  providers: [
    PubSubService,
    {
      provide: PUB_SUB,
      inject: [PUBSUB_OPTIONS],
      useFactory: (pubsubOptions: PubSubOptions) => {
        return new PubSub({ projectId: pubsubOptions.projectId });
      },
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule extends ConfigurablePubsubModule {}
