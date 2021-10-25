import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/columns', methods=['GET', 'POST'])
def columns():
    if request.method == 'POST':
        pass
    return {
        "code": 0,
        "data": {
            "count": 1,
            "list": [
                {
                    "createdAt": "2020-08-20 22:21:10",
                    "__v": 0,
                    "avatar": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
                              "?x-oss-process=image/resize,m_pad,h_50,w_50",
                    "featured": True,
                    "author": "5f3e86d62c56ee13bb830961",
                    "description": "酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多",
                    "title": "铺先生",
                    "id": "5f3e86d62c56ee13bb83096c",
                    "key": 0
                }
            ],
            "pageSize": 1,
            "currentPage": 1
        },
        "msg": "请求成功"
    }


@app.route('/columns/<string:cid>', methods=['GET', 'POST'])
def column(cid):
    if request.method == 'POST':
        pass
    return {
        "code": 0,
        "data": {
            "id": "5f3e86d62c56ee13bb83096c",
            "title": "铺先生",
            "description": "酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多",
            "author": "5f3e86d62c56ee13bb830961",
            "featured": True,
            "avatar": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg",
            "__v": 0,
            "createdAt": "2020-08-20T14:21:10.711Z"
        },
        "msg": "请求成功"
    }


@app.route('/posts', methods=['GET', 'POST'])
def posts():
    if request.method == 'POST':
        pass
    return {
        "code": 0,
        "data": {
            "count": 1,
            "list": [
                {
                    "createdAt": "2020-08-21 19:20:00",
                    "image": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png",
                    "column": "5f3e86d62c56ee13bb83096c",
                    "author": "5f3e86d62c56ee13bb830961",
                    "content": "我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型…",
                    "title": "英语语法的第一个坑if从句，你掉进去了吗？（一）",
                    "id": "5f3fade0c9875c2cd848a2cb",
                    "key": 0
                }
            ],
            "pageSize": 1,
            "currentPage": 1
        },
        "msg": "请求成功"
    }


@app.route('/login', methods=['POST'])
def login():
    return {
        "code": 0,
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVmMjkxOGVkNTlkMGIwMzM2NmMwZjBhZCIsImVtYWlsIjoiMTExQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTlBnRnNnTlZ0SXozaEhJNWtkYWxZdW9pWmU3M295VjdiVmNuUDZ2aDJDYUxSOHVBU2phT20iLCJuaWNrTmFtZSI6IkFraXJhIiwicm9sZSI6eyJfaWQiOiI1ZTYwNjk4YmRiNjBmNjRiNTdlMzYxMzMiLCJuYW1lIjoibm9ybWFsVXNlciIsIl9fdiI6MCwiY3JlYXRlZEF0IjoiMjAyMC0wMy0wNVQwMjo1Mjo1OS44MDhaIiwiYWNjZXNzIjoidXNlciJ9LCJfX3YiOjAsImNvbHVtbiI6IjVmNGRiOTJhYmI4MjE3ODlhNTQ5MGVkMyIsImRlc2NyaXB0aW9uIjoi6L-Z5pivQWtpcmHnmoTnroDku4siLCJhdmF0YXIiOiI2MGY4Mzc1OGZjMGY5MzA5OTdiMDFjYmEiLCJjcmVhdGVkQXQiOiIyMDIwLTA4LTA0VDA4OjE0OjM3LjQ3MFoifSwiZXhwIjoxNjM1NzM3MjQ4LCJpYXQiOjE2MzUxMzI0NDh9.5-sUimUQVh3CyL_765KdPm0_VG8m07bQedyAODKbLuo"
        },
        "msg": "请求成功"
    }


# @app.route('/login', methods=['POST'])
# def login_error_test():
#     return {
#         "code": 400,
#         "error": "密码错误",
#         "msg": "请求成功"
#     }, 400


@app.route('/user', methods=['GET'])
def user():
    return {
        "code": 0,
        "data": {
            "id": "5f2918ed59d0b03366c0f0ad",
            "email": "111@test.com",
            "name": "Akira",
            "columnId": "5f4db92abb821789a5490ed3",
            "description": "这是Akira的简介",
            "avatar": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/60f83758fc0f930997b01cba.png"
        },
        "msg": "请求成功"
    }


if __name__ == '__main__':
    app.run()
