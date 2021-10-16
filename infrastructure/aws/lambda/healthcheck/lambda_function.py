#!/usr/bin/env python
# encoding: utf-8
import requests
import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# LINE の設定
LINEPOSTURL = os.environ['LINEPostURL']
LINETOKEN = os.environ['LINEtoken']
headers = {"Authorization" : "Bearer "+ LINETOKEN}

def lambda_handler(event, context):
    message = "ALERT : 愚痴〜ムのディープヘルスチェックに失敗しました。サービスの稼働状況を確認してください。"
    payload = {"message" : message}
    try:
        requests.post(LINEPOSTURL,headers = headers, params=payload)
    except requests.exceptions.RequestException as e:
        logger.error("Request failed: %s", e)
