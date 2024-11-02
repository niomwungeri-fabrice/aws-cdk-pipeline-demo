import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyLambdaStack } from './lambda-stack';

export class MyPipelineStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
    super(scope, stageName, props)
    const lambdaStack = new MyLambdaStack(this, 'MyLambdaStack', stageName)
  }
}