import * as cdk from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
    super(scope, id, props)
    new Function(this, 'LambdaFunction', {
      runtime: Runtime.JAVA_17,
      handler: 'com.example.cdk_lambda_java_demo.lambda.LambdaHandler::handleRequest',
      code: Code.fromAsset(path.join(__dirname, '..', 'lambda/target/cdk-lambda-java-demo-0.0.1-SNAPSHOT.jar')),
      environment: { "stageName": stageName }
    })
  }
}