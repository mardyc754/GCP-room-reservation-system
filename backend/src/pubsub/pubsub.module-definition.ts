import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PubSubOptions } from './pubsubOptions';

export const PUB_SUB = 'PUB_SUB';

export const {
  ConfigurableModuleClass: ConfigurablePubsubModule,
  MODULE_OPTIONS_TOKEN: PUBSUB_OPTIONS,
} = new ConfigurableModuleBuilder<PubSubOptions>()
  .setClassMethodName('forRoot')
  .build();
