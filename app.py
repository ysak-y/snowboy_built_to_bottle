from flask import Flask, render_template
import os
import boto3
import json

app = Flask(__name__)

@app.route('/get_refrige_picture', methods=['GET'])
def get_refrige_picture():
    return json.dumps('https://s3.amazonaws.com/yoshiaki-raspi-camera/picture.jpg')

@app.route('/lightOn', methods=['GET'])
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

@app.route('/lightOff', methods=['GET'])
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
