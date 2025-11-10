"""
Business: API для работы с присланными текстами - сохранение и получение списка
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с атрибутами request_id, function_name
Returns: HTTP response dict с statusCode, headers, body
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        author_name = body_data.get('name', '').strip()
        author_email = body_data.get('email', '').strip()
        text_content = body_data.get('text', '').strip()
        
        if not author_name or not author_email or not text_content:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Все поля обязательны для заполнения'}),
                'isBase64Encoded': False
            }
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO submissions (author_name, author_email, text_content) VALUES (%s, %s, %s) RETURNING id",
            (author_name, author_email, text_content)
        )
        
        submission_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'id': submission_id,
                'message': 'Текст успешно отправлен на рассмотрение'
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT id, author_name, author_email, text_content, created_at, status FROM submissions ORDER BY created_at DESC"
        )
        
        submissions = cur.fetchall()
        cur.close()
        conn.close()
        
        submissions_list = []
        for sub in submissions:
            submissions_list.append({
                'id': sub['id'],
                'author_name': sub['author_name'],
                'author_email': sub['author_email'],
                'text_content': sub['text_content'],
                'created_at': sub['created_at'].isoformat() if sub['created_at'] else None,
                'status': sub['status']
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'submissions': submissions_list}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
