#!/usr/bin/env python
# encoding: utf-8

import datetime
import requests
import boto3
import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# LINE の設定
LINEPOSTURL = os.environ['LINEPostURL']
LINETOKEN = os.environ['LINEtoken']
headers = {"Authorization" : "Bearer "+ LINETOKEN}

response = boto3.client('cloudwatch', region_name='us-east-1')

get_metric_statistics = response.get_metric_statistics(
    Namespace='AWS/Billing',
    MetricName='EstimatedCharges',
    Dimensions=[
        {
            'Name': 'Currency',
            'Value': 'USD'
        }
    ],
    StartTime=datetime.datetime.today() - datetime.timedelta(days=1),
    EndTime=datetime.datetime.today(),
    Period=86400,
    Statistics=['Maximum'])

cost = get_metric_statistics['Datapoints'][0]['Maximum']
date = get_metric_statistics['Datapoints'][0]['Timestamp'].strftime('%Y年%m月%d日')

def build_message(cost):
    text = "%sまでのAWSの料金は、$%sです。" % (date, cost)
    return text

def lambda_handler(event, context):
    message = build_message(cost)
    payload = {"message" : message}
    try:
        req = requests.post(LINEPOSTURL,headers = headers, params=payload)
    except requests.exceptions.RequestException as e:
        logger.error("Request failed: %s", e)
