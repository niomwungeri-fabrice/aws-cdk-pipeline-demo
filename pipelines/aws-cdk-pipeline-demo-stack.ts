import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { MyPipelineStage } from '../lib/stages';


export class AwsCdkPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const pipeLine = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub("niomwungeri-fabrice/aws-cdk-pipeline-demo", "main"),
        commands: [
          'npm ci',               // For CDK dependencies
          'npm run build',        // For compiling CDK TypeScript code
          'mvn -f lambda/pom.xml clean package',     // Specify the path to pom.xml
          'npx cdk synth'         // Synthesize the CDK stack
        ]
      })
    })
    const testingStage = pipeLine.addStage(new MyPipelineStage(this, "uat", {

      env: { account: '354918376149', region: 'ca-central-1' },
    }))

    testingStage.addPost(new ManualApprovalStep("Manual approval before production"))

    const productionStage = pipeLine.addStage(new MyPipelineStage(this, "prod", {
      env: { account: '354918376149', region: 'ca-central-1' },
    }))
  }
}
