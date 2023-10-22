import boto3

def migrate(source, target):
    dynamo_client = boto3.client('dynamodb', region_name='ap-northeast-2')
    dynamo_target_client = boto3.client('dynamodb', region_name='ap-northeast-2')

    dynamo_paginator = dynamo_client.get_paginator('scan')
    dynamo_response = dynamo_paginator.paginate(
        TableName=source,
        Select='ALL_ATTRIBUTES',
        ReturnConsumedCapacity='NONE',
        ConsistentRead=True
    )
    for page in dynamo_response:
        for item in page['Items']:
            dynamo_target_client.put_item(
                TableName=target,
                Item=item
            )


if __name__ == '__main__':
    migrate('Reward-xxxxxxxxxxxx-staging', 'Reward-yyyyyyyyyyyyy-dev')
