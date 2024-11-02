import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';


export class AwsCdkPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub("niomwungeri-fabrice/aws-cdk-pipeline-demo", "main"),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    })
  }
}
