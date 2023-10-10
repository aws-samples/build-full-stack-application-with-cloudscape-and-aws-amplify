#!/bin/bash

# CloudFormation 스택의 이름 설정
stack_name="base_cfn"

# 스택 출력 값을 가져오기
AccessKey=$(aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].Outputs[?OutputKey=='AccessKey'].OutputValue" --output text)
SecretKey=$(aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].Outputs[?OutputKey=='SecretKey'].OutputValue" --output text)

# 출력 값 확인
echo "AccessKey Value: $AccessKey"
echo "SecretKey Value: $SecretKey"


combined_output="AccessKey: $AccessKey\nSecretKey: $SecretKey"
echo -e $combined_output > amplify_config.txt

npm install -g @aws-amplify/cli
sudo yum -y install xdg-utils

npm install reactstrap --force