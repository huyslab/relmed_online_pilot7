import json
import requests
from os import environ
import io

def upload_file_to_redcap(record, file_content, field):
    token = environ.get('REDCAP_API_TOKEN')
    
    # Create an in-memory file object
    file_obj = io.BytesIO(file_content.encode('utf-8'))
    
    # Prepare the file to be sent
    files = {
        'file': file_obj,
    }
    
    data = {
        'token': token,
        'content': 'file',
        'action': 'import',
        'record': record,
        'field': field
    }
    
    r = requests.post('https://redcap.slms.ucl.ac.uk/api/', data=data, files=files)
    
    return r

def lambda_handler(event, context):
    
    token = environ.get('REDCAP_API_TOKEN')
    
    auto_number = json.loads(event['body'])[0]['auto_number']
    
    data = {
    'token': token,
    'content': 'record',
    'action': 'import',
    'format': 'json',
    'type': 'flat',
    'overwriteBehavior': 'normal',
    'forceAutoNumber': auto_number,
    'data': event['body'],
    'returnContent': 'auto_ids',
    'returnFormat': 'json'
    }
    
    r = requests.post('https://redcap.slms.ucl.ac.uk/api/',data=data)
    
    # Save as file
    body_data = json.loads(event['body'])[0]
    print(body_data)
    
    if auto_number == "false":
        record_id = body_data['record_id']
    else:
        record_id = int(r.json()[0].split(",")[0])
    print(record_id)
    jspsych_data = body_data["jspsych_data"]  
    
    # Upload the long text as a file
    task = json.loads(event['body'])[0]['task']
    file_upload_response = upload_file_to_redcap(record_id, 
        jspsych_data, task.lower() + "_data")
    print(file_upload_response)

    return {
        "isBase64Encoded": False,
        "statusCode": r.status_code,
        "headers": { 
            'Access-Control-Allow-Origin': '*'
        },
        "body": json.dumps({
            'record_import_response': r.json(),
            'file_upload_response': file_upload_response.status_code
        })
    }

