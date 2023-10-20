#!/bin/bash

export AWS_REGION=us-east-1

#Get the list of dynamodb tables from amplify cli
table_name=$(aws dynamodb list-tables --output text --region $AWS_REGION --query 'TableNames[0]')

#Get the index from the dynamodb tables
index_name=$(echo "${table_name}" | awk -F '-' '{print $2}')
environment_name=$(echo "${table_name}" | awk -F '-' '{print $3}' | tr -d '"')
echo "table_name: ${table_name}"
echo "index_name: ${index_name}"
echo "environment_name: ${environment_name}"

#Set the each dynamodb table names
course_name="Course-$index_name-$environment_name"
class_name="Class-$index_name-$environment_name"
echo "course_name: ${course_name}"
echo "class_name: ${class_name}"

#Set the current time
current_time=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

#Replace the table_name
sed -i '' -e "s/Course/$course_name/g" Course.json
sed -i '' -e "s/Class/$class_name/g" Class.json
sed -i '' -e "s/replace_time/$current_time/g" Course.json
sed -i '' -e "s/replace_time/$current_time/g" Class.json

#Insert the data into tables
aws dynamodb batch-write-item --request-items file://Course.json
aws dynamodb batch-write-item --request-items file://Class.json

unset AWS_REGION
