
export async function handler(event:string, context:string) {
  console.log("stage name is " + process.env.stage)
  return {
    body: 'hello lambda form cdk',
    statusCode: 200
  }
}