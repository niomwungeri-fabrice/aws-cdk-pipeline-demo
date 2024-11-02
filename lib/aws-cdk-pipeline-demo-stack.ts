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
          'ls -R',                                   // List all files and directories recursively
          'mvn -f $CODEBUILD_SRC_DIR/lambda/pom.xml clean package', // Use the absolute path for Maven
          'npx cdk synth'
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
