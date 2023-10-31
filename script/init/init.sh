#!/bin/bash
# Get the region information
current_region=$(aws configure get region)

# Get the name of cloudFormation stack
stack_name="base-cfn"

# Get the access values from cloudFormation stack
AccessKey=$(aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].Outputs[?OutputKey=='AccessKey'].OutputValue" --output text)
SecretKey=$(aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].Outputs[?OutputKey=='SecretKey'].OutputValue" --output text)

# check the output
echo "AccessKey Value: $AccessKey"
echo "SecretKey Value: $SecretKey"

combined_output="AccessKey: $AccessKey\nSecretKey: $SecretKey"
echo -e $combined_output > amplify_config.txt

# Install libraries
cd ~/environment/build-full-stack-application-with-cloudscape-and-aws-amplify

npm install -g @aws-amplify/cli
sudo yum -y install xdg-utils
npm install reactstrap --force