# Lambda is triggered every day once (by EventBridge) to see if there is any class that contains class_flag equal to current month

import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import datetime
import logging

# Global variables
today = datetime.date.today()
ddb = boto3.resource('dynamodb')
table = ddb.Table('Class-cabdsxff6rcp3i2oszoemnnaqa-rel')
m = today.month
y = today.year
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


#  helper functions
def scan_class_table_and_find_key(current_month):
    """
    Scans for class_flag in Class table and find out if there is the value of class_flag is equal to current_month.
    Uses a projection expression to return a subset of data for class id that contains flag in current month.

    :param current_month: current_month to cross check with class_flag.
    :return: The list of class id that contains current month in class_flag column from Class table.
    """
    classes = []
    scan_kwargs = {
        'FilterExpression': Attr('class_flag').eq(current_month)}
    try:
        done = False
        start_key = None
        while not done:
            if start_key:
                scan_kwargs['ExclusiveStartKey'] = start_key
            response = table.scan(**scan_kwargs)
            classes.extend(response.get('Items', []))
            start_key = response.get('LastEvaluatedKey', None)
            done = start_key is None
    except ClientError as err:
        logger.error(
            "Couldn't scan for classes. Here's why: %s: %s",
            err.response['Error']['Code'], err.response['Error']['Message'])
        raise

    return classes

def update_class_flag(classes):
    """
    Updates class_flag data for a class in the table.

    :param classes: The all data from classes
    :return: The fields that were updated, with their new values.
    """
    try:
        # data processing
        for class_item in classes:
            class_id = class_item['id']
    				
            # Item update
            
            res = table.update_item(
                Key={
                    'id': class_id
                },
                UpdateExpression="set class_flag=:c",
                ExpressionAttributeValues={
                    ':c': int(0)},
                ReturnValues="UPDATED_NEW")
        
    except ClientError as err:
        logger.error(
            "Couldn't update movie %s in table %s. Here's why: %s: %s",
            title, self.table.name,
            err.res['Error']['Code'], err.res['Error']['Message'])
        raise
    # else:
    #     return res['Attributes']


# Lambda handler where code begins :)
def lambda_handler(event, context):
    
    # scan class table to find out current month in class_flag
    items = scan_class_table_and_find_key(m)
    # update class_flag to 0 for the row that contains current month
    update_class_flag(items)
    
    return {
        'statusCode': 200,
        'body': list(items)
        # 'body': json.dumps('Hello' + table)
    }
