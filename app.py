from flask import Flask, render_template
import os
import boto3
from ask import alexa

app = Flask(__name__)

@app.route('/lightOn', method=['GET'])
def light_on_intent():
    client = boto3.client('sqs', region_name='us-east-1')

    response = client.send_message(
            QueueUrl=os.environ['SQS_URL'],
            MessageBody='SwitchYeelight',
            MessageAttributes={
                'switch': {
                    'StringValue': 'On',
                    'DataType': 'String'
                    }
                }
            )

    return nil

@app.route('/lightOff', method=['GET'])
def light_off_intent():
    client = boto3.client('sqs', region_name='us-east-1')

    response = client.send_message(
            QueueUrl=os.environ['SQS_URL'],
            MessageBody='SwitchYeelight',
            MessageAttributes={
                'switch': {
                    'StringValue': 'Off',
                    'DataType': 'String'
                    }
                }
            )

    return nil

@app.route('/')
def index():
    return render_template('index.html')

app.run()
